const accountId = props.accountId;

if (!accountId) {
  return "";
}

let following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (following === null) {
  return "Loading";
}

following = Object.entries(following[accountId].graph.follow || {});
following.sort((a, b) => b[1] - a[1]);

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
    {following.map(([accountId], i) => (
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
