const accountId = props.accountId ?? context.accountId;

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const groupId = props.groupId ?? "voter";
const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "Loading...";
}

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 39px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

return (
  <>
    <Container>
      <Widget src="hack.near/widget/communities" />
      <Widget src="hack.near/widget/progress.members" />
    </Container>
    <br />
    <hr />
    <div>
      <h3>Voter Profiles</h3>
      <h5>{group[0].length} Total Members</h5>
      <div>
        {group.map((members, i) => (
          <div key={i}>
            {members.map((member, j) => (
              <Widget
                key={j}
                src="near/widget/AccountProfileCard"
                props={{ accountId: member }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </>
);
