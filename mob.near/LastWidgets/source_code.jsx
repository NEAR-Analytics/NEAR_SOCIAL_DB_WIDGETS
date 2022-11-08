const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
});

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      const widgets = account[1].widget;
      return Object.entries(widgets).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const itemToWidget = (a) => (
  <div className="mb-3" key={JSON.stringify(a)} style={{ minHeight: "10em" }}>
    <Widget src="mob.near/widget/WidgetMetadata" props={a} />
  </div>
);

State.init({
  allItems: processData(data),
  widgets: [],
});

const makeMoreItems = () => {
  const newItems = state.allItems
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(itemToWidget);
  newItems.forEach((widget) => state.widgets.push(widget));
  State.update();
};

return (
  <div className="px-2 mx-auto" style={{ maxWidth: "42em" }}>
    <InfiniteScroll
      pageStart={0}
      loadMore={makeMoreItems}
      hasMore={state.widgets.length < state.allItems.length}
      loader={<div className="loader">Loading ...</div>}
    >
      {state.widgets}
    </InfiniteScroll>
  </div>
);
