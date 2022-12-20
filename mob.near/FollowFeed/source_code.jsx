const index = {
  action: "graph",
  key: "follow",
  options: {
    subscribe: true,
    limit: 50,
    order: "desc",
  },
};

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
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
