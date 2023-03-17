const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "marmaj.sputnik-dao.near";
const policy = Near.view(daoId, "get_policy");

const groups = policy.roles
  .filter((role) => role.name !== "all")
  .map((role) => role.name);

return (
  <div>
    <h2 className="mt-3">{daoId}</h2>
    {groups.map((groupId) => (
      <div className="mb-3" key={groupId}>
        <h3>{groupId}</h3>
        <Widget
          src="hack.near/widget/GroupMembers"
          props={{ accountId, daoId, groupId }}
        />
      </div>
    ))}
  </div>
);
