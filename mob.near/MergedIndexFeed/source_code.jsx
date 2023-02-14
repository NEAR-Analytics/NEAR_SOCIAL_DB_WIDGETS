if (!props.index) {
  return "props.index is not defined";
}
const indices = Array.isArray(props.index) ? props.index : [props.index];

const renderItem =
  props.renderItem ??
  ((item, i) => (
    <div key={i}>
      #{item.blockHeight}: {JSON.stringify(item)}
    </div>
  ));

const cachedRenderItem = (item, i) => {
  const key = JSON.stringify(item);

  if (!(key in state.cachedItems)) {
    state.cachedItems[key] = renderItem(item, i);
    State.update();
  }
  return state.cachedItems[key];
};

const initialRenderLimit = props.initialRenderLimit ?? 10;
const addDisplayCount = props.nextLimit ?? initialRenderLimit;
const reverse = !!props.reverse;

const computeFetchFrom = (items, limit, desc) => {
  if (!items || items.length < limit) {
    return false;
  }
  const blockHeight = items[items.length - 1].blockHeight;
  return desc ? blockHeight - 1 : blockHeight + 1;
};

const mergeItems = (iIndex, newItems, desc) => {
  const index = indices[iIndex];
  const items = [
    ...new Set(
      [
        ...newItems.map((item) => ({
          ...item,
          action: index.action,
          key: index.key,
          index: iIndex,
        })),
        ...state.items,
      ].map((i) => JSON.stringify(i))
    ),
  ].map((i) => JSON.parse(i));
  items.sort((a, b) => a.blockHeight - b.blockHeight);
  if (desc) {
    items.reverse();
  }
  return items;
};

const jIndices = JSON.stringify(indices);
if (jIndices !== state.jIndices) {
  State.update({
    jIndices,
    feeds: indices.map(() => ({})),
    items: [],
    displayCount: initialRenderLimit,
    cachedItems: {},
  });
}

let stateChanged = false;
for (let iIndex = 0; iIndex < indices.length; ++iIndex) {
  const index = indices[iIndex];
  const feed = state.feeds[iIndex];
  let feedChanged = false;
  index.options = index.options || {};
  index.options.limit = Math.min(
    Math.max(initialRenderLimit + addDisplayCount * 2, index.options.limit),
    100
  );
  const desc = index.options.order === "desc";

  const initialItems = Social.index(index.action, index.key, index.options);
  if (initialItems === null) {
    continue;
  }

  const jInitialItems = JSON.stringify(initialItems);
  if (feed.jInitialItems !== jInitialItems) {
    feed.jInitialItems = jInitialItems;
    state.items = mergeItems(iIndex, initialItems, desc);
    if (feed.nextFetchFrom === undefined) {
      feed.nextFetchFrom = computeFetchFrom(
        initialItems,
        index.options.limit,
        desc
      );
    }
    feedChanged = true;
  }

  if (feed.fetchFrom) {
    const limit = addDisplayCount;
    const newItems = Social.index(
      index.action,
      index.key,
      Object.assign({}, index.options, {
        from: feed.fetchFrom,
        subscribe: undefined,
        limit,
      })
    );
    if (newItems !== null) {
      state.items = mergeItems(iIndex, newItems, desc);
      feed.fetchFrom = false;
      feed.nextFetchFrom = computeFetchFrom(newItems, limit, desc);
      feedChanged = true;
    }
  }

  if (
    state.items.length - state.displayCount < addDisplayCount * 2 &&
    !feed.fetchFrom &&
    feed.nextFetchFrom &&
    feed.nextFetchFrom !== feed.fetchFrom
  ) {
    feed.fetchFrom = feed.nextFetchFrom;
    feedChanged = true;
  }

  if (feedChanged) {
    state.feeds[iIndex] = feed;
    stateChanged = true;
  }
}

if (stateChanged) {
  State.update();
}

const makeMoreItems = () => {
  State.update({
    displayCount: state.displayCount + addDisplayCount,
  });
};

const loader = (
  <div className="loader" key={"loader"}>
    <span
      className="spinner-grow spinner-grow-sm me-1"
      role="status"
      aria-hidden="true"
    />
    Loading ...
  </div>
);

const fetchMore =
  props.manual &&
  (state.feeds.some((f) => !!f.fetchFrom) &&
  state.items.length < state.displayCount
    ? loader
    : state.displayCount < state.items.length && (
        <div key={"loader more"}>
          <a href="javascript:void" onClick={(e) => makeMoreItems()}>
            {props.loadMoreText ?? "Load more..."}
          </a>
        </div>
      ));

const items = state.items ? state.items.slice(0, state.displayCount) : [];
if (reverse) {
  items.reverse();
}

const renderedItems = items.map(cachedRenderItem);

return props.manual ? (
  <>
    {reverse && fetchMore}
    {renderedItems}
    {!reverse && fetchMore}
  </>
) : (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={state.displayCount < state.items.length}
    loader={loader}
  >
    {renderedItems}
  </InfiniteScroll>
);
