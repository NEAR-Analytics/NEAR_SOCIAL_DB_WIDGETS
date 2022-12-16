const accountId = props.accountId ?? "*";

const items = Social.index("graph", "follow", {
  subscribe: true,
  limit: 250,
  order: "desc",
});

if (!items) {
  return "Loading";
}

const renderItem = (a) => (
  <div key={JSON.stringify(a)} className="mb-2">
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{ accountId: a.accountId, hideAccountId: true, tooltip: true }}
    />
    <span className="text-muted">
      {a.value.type === "follow" ? "followed" : "unfollowed"}
    </span>
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{
        accountId: a.value.accountId,
        hideAccountId: true,
        tooltip: true,
      }}
    />
    <span className="text-muted">
      <Widget
        src="mob.near/widget/TimeAgo"
        props={{ blockHeight: a.blockHeight }}
      />
    </span>
  </div>
);

return (
  <div>
    <Widget src="mob.near/widget/ItemFeed" props={{ items, renderItem }} />
  </div>
);
