const items = props.items;
const renderItem = props.renderItem;
const perPage = props.perPage || 10;

State.init({
  items,
  widgets: [],
});

if (state.items.length != items.length) {
  if (items.length > state.items.length) {
    const newItems = items
      .slice(0, items.length - state.items.length)
      .map(renderItem);
    const widgets = [...newItems, ...state.widgets];
    State.update({
      widgets,
      items,
    });
  } else {
    State.update({
      widgets: [],
      items,
    });
  }
}

const makeMoreItems = () => {
  const newItems = items
    .slice(state.widgets.length, state.widgets.length + perPage)
    .map(renderItem);
  state.widgets.push(...newItems);
  State.update();
};

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={state.widgets.length < items.length}
    loader={<div className="loader">Loading ...</div>}
  >
    {state.widgets}
  </InfiniteScroll>
);
