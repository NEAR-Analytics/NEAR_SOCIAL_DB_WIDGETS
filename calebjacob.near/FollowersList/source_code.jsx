const accountId = props.accountId;

if (!accountId) {
  return "";
}

let followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (followers === null) {
  return "Loading";
}

followers = Object.entries(followers || {});
followers.sort(
  (a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]
);

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

return (
  <Wrapper>
    {followers.map(([accountId], i) => (
      <Item key={i}>
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{ accountId }}
        />
        <Widget
          src="calebjacob.near/widget/FollowButton"
          props={{ accountId }}
        />
      </Item>
    ))}
  </Wrapper>
);
