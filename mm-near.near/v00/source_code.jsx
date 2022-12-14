const accountId = context.accountId;

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const items = following
  ? Object.keys(following[accountId].graph.follow || {})
  : null;

const renderItem = (a) => (
  <div key={JSON.stringify(a)} className="mb-2">
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{ accountId: a, hideAccountId: true, tooltip: true }}
    />
    <span className="text-muted">challenge:</span>
  </div>
);

return (
  <div>
    <Widget src="mob.near/widget/ItemFeed" props={{ items, renderItem }} />
  </div>
);
