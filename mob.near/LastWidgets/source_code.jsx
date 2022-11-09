const accountId = props.accountId ?? "*";
const keys = props.keys ?? `${accountId}/widget/*`;

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading";
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

const accountIdArgument = props.accountId ? `accountId=${accountId}&` : "";
const tagLinkPrefix = `#/mob.near/widget/LastWidgetsByTag?${accountIdArgument}tag=`;

const renderTag = (tag, tagBadge) => (
  <a className="text-decoration-none" href={`${tagLinkPrefix}${tag}`}>
    {tagBadge}
  </a>
);

const renderItem = (a) => (
  <div className="mb-3" key={JSON.stringify(a)} style={{ minHeight: "10em" }}>
    <Widget
      src="mob.near/widget/WidgetMetadata"
      props={{
        accountId: a.accountId,
        widgetName: a.widgetName,
        blockHeight: a.blockHeight,
        renderTag,
      }}
    />
  </div>
);

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <>
    {props.accountId && (
      <div className="mb-2">
        Filtered by account
        <a
          href="#/mob.near/widget/LastWidgets"
          className="btn btn-outline-primary"
        >
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId, link: false }}
          />
          <i class="bi bi-x-square"></i>
        </a>
      </div>
    )}

    <div className="px-2 mx-auto" style={{ maxWidth: "42em" }}>
      <Widget
        src="mob.near/widget/ItemFeed"
        props={{ items: state.allItems, renderItem }}
      />
    </div>
  </>
);
