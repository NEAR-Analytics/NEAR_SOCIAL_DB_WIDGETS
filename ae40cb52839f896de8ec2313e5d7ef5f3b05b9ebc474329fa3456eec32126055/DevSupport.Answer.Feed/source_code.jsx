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
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
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
