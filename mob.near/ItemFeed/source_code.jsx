const allItems = props.allItems;
const renderItem = props.renderItem;

State.init({
  widgets: [],
});

const makeMoreItems = () => {
  const newItems = allItems
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(renderItem);
  newItems.forEach((widget) => state.widgets.push(widget));
  State.update();
};

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={state.widgets.length < allItems.length}
    loader={<div className="loader">Loading ...</div>}
  >
    {state.widgets}
  </InfiniteScroll>
);
