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
  const blockHeight = parseInt(a.blockHeight);
  const content = JSON.parse(
    Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
  );

  return (
    // We can check the commit to make sure this is what we want
    a.value.type === "thing" && (
      <div key={JSON.stringify(a)} className="mb-3">
        {content.color}
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
