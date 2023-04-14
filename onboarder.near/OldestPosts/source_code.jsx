const index = {
  action: "post",
  key: "main",
  options: {
    limit: 5,
    order: "asc",
    accountId: props.accounts,
  },
};

const likes = Social.index("like", item);

const Post = styled.div`
  border-bottom: 1px solid #ECEEF0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

// a.value.type === "md" ;
const renderItem = (a) =>
  a.value.type === "md" &&
  (a.accountId.includes("root.near") || a.accountId.includes("mob.near")) && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="calebjacob.near/widget/Posts.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <Widget
    src="adminalpha.near/widget/IndexFeed"
    props={{ index, renderItem, moderatorAccount: "onboarder.near" }}
  />
);
