const index = {
  action: "comment",
  key: props.item,
  options: {
    limit: 3,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      <Widget
        src="mob.near/widget/MainPage.Comment"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </div>
  );

return (
  <div>
    <Widget
      src="mob.near/widget/ManualIndexFeed"
      props={{
        index,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show more comments",
      }}
    />
  </div>
);
