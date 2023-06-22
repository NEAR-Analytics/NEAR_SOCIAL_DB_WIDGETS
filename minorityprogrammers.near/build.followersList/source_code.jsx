const accountId = props.accountId;

if (!accountId) {
  return "No Account ID passed into props";
  // accountId = "build.sputnik-dao.near";
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

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

if (followers !== null && followers.length === 0) {
  return <Text>No one has recieved any of this badge yet.</Text>;
}

return (
  <Wrapper>
    {followers.map(([accountId], i) => (
      <Item key={i}>
        <Widget
          src="minorityprogrammers.near/widget/build.profilePreview"
          props={{ accountId }}
        />
        <Widget src="near/widget/FollowButton" props={{ accountId }} />
      </Item>
    ))}
  </Wrapper>
);
