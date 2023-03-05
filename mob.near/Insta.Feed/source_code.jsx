const index = {
  action: "post",
  key: "insta",
  options: {
    limit: 30,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderItem = (a) =>
  a.value.type === "insta" && (
    <Widget
      key={JSON.stringify(a)}
      src="mob.near/widget/Insta.Post"
      props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
    />
  );

return (
  <Widget
    src="mob.near/widget/FilteredIndexFeed"
    props={{ index, renderItem, manual: true }}
  />
);
