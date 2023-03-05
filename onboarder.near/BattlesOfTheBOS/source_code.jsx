const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
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
  (a.accountId.includes("root.near") ||
    a.accountId.includes("mob.near") ||
    a.accountId.includes("nearmax.near") ||
    a.accountId.includes("marieke.near")) && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="calebjacob.near/widget/Posts.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <div>
    <h1>See the History of the BOSS on BOS 👀</h1>
    <h4>Who will be the BOS? You decide</h4>
    <Widget
      src="adminalpha.near/widget/IndexFeed"
      props={{ index, renderItem, moderatorAccount: "onboarder.near" }}
    />
  </div>
);
