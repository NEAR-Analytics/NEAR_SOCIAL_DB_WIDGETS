const index = {
  action: "answer",
  key: props.item,
  options: {
    limit: props.limit ?? 3,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      <Widget
        src="mob.near/widget/MainPage.Comment"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight:
            a.accountId === props.highlightComment?.accountId &&
            a.blockHeight === props.highlightComment?.blockHeight,
        }}
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
        loadMoreText: "See more answers",
      }}
    />
  </div>
);
