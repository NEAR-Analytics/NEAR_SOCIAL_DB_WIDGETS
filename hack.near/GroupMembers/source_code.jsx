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

return (
  <>
    <div>
      <h3>Group Members:</h3>
      <div>
        {members.map((memberId, i) => (
          <h4>{memberId}</h4>
        ))}
      </div>
      <div>{allMembers}</div>
    </div>
  </>
);
