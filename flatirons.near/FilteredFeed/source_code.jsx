// todo add filtering

const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

const Post = styled.div`
  border-bottom: 1px solid #ECEEF0;
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post key={JSON.stringify(a)}>
      <Widget
        src="flatirons.near/widget/Feed.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <div>
    <Widget
      src="flatirons.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
