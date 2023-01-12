const index = {
  action: "graph",
  key: "poke",
  options: {
    limit: 10,
    order: "desc",
  },
};

const renderItem = (a) => (
  <div key={JSON.stringify(a)} className="mb-2">
    <span className="fs-4">
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: a.value.accountId,
          hideName: true,
          hideAccountId: true,
          tooltip: true,
        }}
      />
      <span role="img" aria-label="poked" title="poked">
        👈
      </span>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: a.accountId,
          hideName: true,
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
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
    <Widget
      src="mob.near/widget/ManualIndexFeed"
      props={{ index, renderItem, nextLimit: 25, loadMoreText: "Show more" }}
    />
  </div>
);
