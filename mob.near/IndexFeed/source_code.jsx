const index = props.index;
if (!index) {
  return "props.index is not defined";
}

const renderItem = props.renderItem ?? ((i) => JSON.stringify(i));
index.options = index.options || {};
index.options.limit = Math.min(index.options.limit, 100);

const initialItems = Social.index(index.action, index.key, index.options);
if (initialItems === null) {
  return "";
}

const computeFetchFrom = (items) => {
  if (!items || items.length === 0) {
    return false;
  }
  const blockHeight = items[items.length - 1].blockHeight;
  return index.options.order === "desc" ? blockHeight - 1 : blockHeight + 1;
};

const jInitialItems = JSON.stringify(initialItems);
if (state.jInitialItems !== jInitialItems) {
  const jIndex = JSON.stringify(index);
  if (jIndex !== state.jIndex) {
    State.update({
      jIndex,
      jInitialItems,
      initialItems,
      items: [],
      fetchFrom: false,
      nextFetchFrom: computeFetchFrom(initialItems),
    });
  } else {
    State.update({
      initialItems,
      jInitialItems,
    });
  }
}

if (state.fetchFrom) {
  const newItems = Social.index(
    index.action,
    index.key,
    Object.assign({}, index.options, {
      from: state.fetchFrom,
      subscribe: undefined,
    })
  );
  if (newItems !== null) {
    state.items.push(...newItems);
    State.update({
      fetchFrom: false,
      nextFetchFrom: computeFetchFrom(newItems),
    });
  }
}

const makeMoreItems = () => {
  if (state.nextFetchFrom && state.nextFetchFrom !== state.fetchFrom) {
    State.update({
      fetchFrom: state.nextFetchFrom,
    });
  }
};

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={!!state.nextFetchFrom}
    loader={<div className="loader">Loading ...</div>}
  >
    {state.initialItems &&
      [...state.initialItems, ...state.items].map(renderItem)}
  </InfiniteScroll>
);
