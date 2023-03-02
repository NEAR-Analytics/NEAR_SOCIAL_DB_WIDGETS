const accountId = props.accountId || context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const groupId = props.groupId ?? "council";
const policy = Near.view(daoId, "get_policy");

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

const groups = policy.roles
  .filter((role) => role.name !== "all")
  .map((role) => {
    const groups = role.name;

    return groups;
  });

return (
  <>
    <div>
      <h3>Groups:</h3>
      <div>
        {groups.map((group, i) => (
          <a
            key={i}
            className="text-decoration-none"
            href={`#hack.near/widget/GroupMembers?groupId=${groupId}&daoId=${daoId}`}
          >
            <h4>{group}</h4>
          </a>
        ))}
      </div>
    </div>
  </>
);
