const index = {
  action: "c_discussionTT",
  key: props.componentSrc,
  options: {
    limit: 10,
    order: "desc",
  },
};

const Post = styled.div`
  border-bottom: 1px solid #ECEEF0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/ComponentDetailsPage.Discussion"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <Widget
    src="adminalpha.near/widget/IndexFeed"
    props={{ index, renderItem, moderatorAccount: "adminalpha.near" }}
  />
);
