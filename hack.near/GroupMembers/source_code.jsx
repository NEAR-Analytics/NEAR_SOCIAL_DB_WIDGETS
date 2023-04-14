const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "global.sputnik-dao.near";

const groupId = props.groupId ?? "community";
const policy = Near.view(daoId, "get_policy");

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

const accounts = Object.entries(data);
const allMembers = [];
const allGroups = [];

for (let i = 0; i < accounts.length; ++i) {
  const memberId = accounts[i][0];

  allMembers.push(
    <div className="mb-2">
      <Widget src="mob.near/widget/Profile" props={{ memberId }} />
    </div>
  );
}

const members = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const members = role.kind.Group;

    return members;
  });

const groups = policy.roles.map((role) => {
  const groups = role.name;

  return groups;
});

return (
  <div>
    <h3>Groups:</h3>
    <h4>{groupId}</h4>
    <Widget
      src="mob.near/widget/Profile"
      props={{
        tooltip: true,
        accountId: members,
      }}
    />
    <div className="mb-2">{members}</div>
    <div className="mb-2">{groups}</div>
  </div>
);
