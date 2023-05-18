let index = [];
const typeWhitelist = ["md", "efiz.near/type/Image"];

index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: ["efiz.near"],
  },
};

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) => {
  if (typeWhitelist.includes(a.value.type)) {
    return (
      <Post className="post" key={JSON.stringify(a)}>
        <Widget
          src="efiz.near/widget/Every.Post.View"
          props={{
            accountId: a.accountId,
            blockHeight: a.blockHeight,
            type: a.value.type,
          }}
        />
      </Post>
    );
  }
};

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
