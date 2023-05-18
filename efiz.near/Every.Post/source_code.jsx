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
    if (a.value.type === "md") {
      return (
        <Post className="post" key={JSON.stringify(a)}>
          <Widget
            src="near/widget/Posts.Post"
            props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
          />
        </Post>
      );
    } else {
      const value = Social.get(`${a.accountId}/post/main`, "final");
      value = JSON.parse(value);
      return (
        <Widget
          src="efiz.near/widget/Thing"
          props={{ path: value.path, blockHeight: value.blockHeight }}
        />
      );
    }
  }
};

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
