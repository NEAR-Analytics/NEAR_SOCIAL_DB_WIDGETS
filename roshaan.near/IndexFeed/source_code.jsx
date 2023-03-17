const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};
if (!index) {
  return "props.index is not defined";
}

const filter = props.filter;

const postsQuery = `
  query IndexerQuery {
    indexer_storage(
      where: {function_name: {_eq: "roshaan.near/near-social-posts"}}
      order_by: {key_name: desc}
      limit: 10
    ) {
      key_name
      value
    }
  }
`;

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(
    "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );
}
fetchGraphQL(postsQuery, "IndexerQuery").then((result) => {
  console.log("got result");
  if (result.status === 200) {
    console.log(result, "storage");
    if (result.body.data) {
      const initial_items = [];
      result.body.data.indexer_storage.forEach((posts) => {
        if (posts.value !== `\"[]\"`) {
          const parsedOuterString = JSON.parse(posts.value);
          const parsedInnerString = JSON.parse(parsedOuterString);
          const post_parsed = JSON.parse(parsedInnerString[0].post);
          parsedInnerString[0].post = post_parsed;
          parsedInnerString[0].blockHeight = parsedInnerString[0].block_height;
          delete parsedInnerString[0].block_height;
          if (parsedInnerString[0].post !== null) {
            initial_items.push(parsedInnerString[0]);
          }
        }
      });
      State.update({ initialItems: initial_items });
    }

    // State.update({
    //   state: result.body.data.indexer_state,
    //   stateCount: result.body.data.indexer_state_aggregate.aggregate.count,
    // });
  }
});
const renderItem =
  props.renderItem ??
  ((item, i) => (
    <div key={JSON.stringify(item)}>
      #{item.block_height}: {JSON.stringify(item)}
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

index.options = index.options || {};
const initialRenderLimit =
  props.initialRenderLimit ?? index.options.limit ?? 10;
const addDisplayCount = props.nextLimit ?? initialRenderLimit;

index.options.limit = Math.min(
  Math.max(initialRenderLimit + addDisplayCount * 2, index.options.limit),
  100
);
const reverse = !!props.reverse;

// const initialItems = Social.index(index.action, index.key, index.options);
if (state.initialItems === null) {
  return "";
}

const computeFetchFrom = (items, limit) => {
  if (!items || items.length < limit) {
    return false;
  }
  const blockHeight = items[items.length - 1].blockHeight;
  return index.options.order === "desc" ? blockHeight - 1 : blockHeight + 1;
};

const mergeItems = (newItems) => {
  const items = [
    ...new Set([...newItems, ...state.items].map((i) => JSON.stringify(i))),
  ].map((i) => JSON.parse(i));
  items.sort((a, b) => a.blockHeight - b.blockHeight);
  if (index.options.order === "desc") {
    items.reverse();
  }
  return items;
};

const jInitialItems = JSON.stringify(state.initialItems);
if (state.jInitialItems !== jInitialItems) {
  const jIndex = JSON.stringify(index);
  if (jIndex !== state.jIndex) {
    State.update({
      jIndex,
      jInitialItems,
      items: state.initialItems,
      fetchFrom: false,
      nextFetchFrom: computeFetchFrom(state.initialItems, index.options.limit),
      displayCount: initialRenderLimit,
      cachedItems: {},
    });
  } else {
    State.update({
      jInitialItems,
      items: mergeItems(state.initialItems),
    });
  }
}

// if (state.fetchFrom) {
//   const limit = addDisplayCount;
//   const newItems = [];
//   if (newItems !== null) {
//     State.update({
//       items: mergeItems(newItems),
//       fetchFrom: false,
//       nextFetchFrom: computeFetchFrom(newItems, limit),
//     });
//   }
// }

const filteredItems = state.items;
if (filter) {
  if (filter.ignore) {
    filteredItems = filteredItems.filter(
      (item) => !(item.accountId in filter.ignore)
    );
  }
}

const maybeFetchMore = () => {
  if (
    filteredItems.length - state.displayCount < addDisplayCount * 2 &&
    !state.fetchFrom &&
    state.nextFetchFrom &&
    state.nextFetchFrom !== state.fetchFrom
  ) {
    State.update({
      fetchFrom: state.nextFetchFrom,
    });
  }
};

maybeFetchMore();

const makeMoreItems = () => {
  State.update({
    displayCount: state.displayCount + addDisplayCount,
  });
  maybeFetchMore();
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
  !props.hideFetchMore &&
  (state.fetchFrom && filteredItems.length < state.displayCount
    ? loader
    : state.displayCount < filteredItems.length && (
        <div key={"loader more"}>
          <a href="javascript:void" onClick={(e) => makeMoreItems()}>
            {props.loadMoreText ?? "Load more..."}
          </a>
        </div>
      ));

const items = filteredItems ? filteredItems.slice(0, state.displayCount) : [];
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
    hasMore={state.displayCount < filteredItems.length}
    loader={
      <div className="loader">
        <span
          className="spinner-grow spinner-grow-sm me-1"
          role="status"
          aria-hidden="true"
        />
        Loading ...
      </div>
    }
  >
    {props.headerElement}
    {renderedItems}
    {props.footerElement}
  </InfiniteScroll>
);
