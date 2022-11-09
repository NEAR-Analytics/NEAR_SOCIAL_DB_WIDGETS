const accountId = props.accountId ?? "*";
const tag = props.tag;

const taggedWidgets = Social.keys(
  `${accountId}/widget/*/metadata/tags/${tag}`,
  "final"
);

if (taggedWidgets === null) {
  return "Loading tags";
}

const allWidgets = Object.entries(taggedWidgets)
  .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
  .flat();

if (!allWidgets.length) {
  return `No widgets found by tag #${tag}`;
}

const data = Social.keys(allWidgets, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading widgets";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderItem = (a) => (
  <div className="mb-3" key={JSON.stringify(a)} style={{ minHeight: "10em" }}>
    <Widget src="mob.near/widget/WidgetMetadata" props={a} />
  </div>
);

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div className="px-2 mx-auto" style={{ maxWidth: "42em" }}>
    <Widget
      src="mob.near/widget/ItemFeed"
      props={{ items: state.allItems, renderItem }}
    />
  </div>
);
