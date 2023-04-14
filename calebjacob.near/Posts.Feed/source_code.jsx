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
  border-bottom: 2px solid #ECEEF0;
  padding: 24px 24px 12px;

  @media (max-width: 1200px) {
    padding: 12px 12px 0px;
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post key={JSON.stringify(a)}>
      <Widget
        src="calebjacob.near/widget/Posts.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <div>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
