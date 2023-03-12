const accountId = props.accountId || context.accountId;

const index = {
  action: "thing",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: accountId,
  },
};

const renderItem = (a) => {
  return (
    a.value.type === "thing" && (
      <div key={JSON.stringify(a)} className="mb-3">
        <Widget
          src="efiz.near/widget/Thing"
          props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
        />
      </div>
    )
  );
};

return (
  <div>
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
