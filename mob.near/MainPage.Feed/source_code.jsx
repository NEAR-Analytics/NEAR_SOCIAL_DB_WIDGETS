const index = {
  action: "post",
  key: "main",
  options: {
    subscribe: true,
    limit: 10,
    order: "desc",
    accountId: props.accountIds,
  },
};

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)} className="mb-3">
      <Widget
        src="mob.near/widget/MainPage.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </div>
  );

return (
  <div>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
