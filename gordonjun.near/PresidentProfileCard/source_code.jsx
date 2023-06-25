const accountId = props.accountId ?? "gordonjun.near";
const tag = props.tag;
const daoId = props.daoId ?? "bbclan.near";

let daoFollowers = Social.keys(`*/graph/follow/${daoId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
daoFollowers = Object.entries(daoFollowers || {}).map(
  ([accountId]) => accountId
);

let keys = [];

if (tag) {
  let taggedWidgetsDict = {};
  for (let i = 0; i < daoFollowers.length; i++) {
    let taggedWidgets = Social.keys(
      `${daoFollowers[i]}/widget/*/metadata/tags/${tag}`,
      "final"
    );
    taggedWidgetsDict = Object.assign(taggedWidgetsDict, taggedWidgets);
  }

  if (taggedWidgetsDict === null) {
    return "Loading tags";
  }

  keys = Object.entries(taggedWidgetsDict)
    .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
    .flat();

  if (!keys.length) {
    return `No widgets found by tag #${tag}`;
  }
} else {
  for (let i = 0; i < daoFollowers.length; i++) {
    let userWidgetkeys = Social.keys(`${daoFollowers[i]}/widget/*`, "final", {
      values_only: true,
    });
    let userWidget = Object.entries(userWidgetkeys)
      .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
      .flat();

    keys.push(...userWidget);
  }
}

const data = Social.keys(keys, "final", {
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

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div className="d-flex flex-wrap gap-1 my-3">
    {state.allItems
      .slice(0, props.limit ? parseInt(props.limit) : 999)
      .map(renderItem)}
  </div>
);
