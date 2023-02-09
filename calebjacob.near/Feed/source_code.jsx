const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      <Widget
        src="calebjacob.near/widget/Feed.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </div>
  );

return (
  <div>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
