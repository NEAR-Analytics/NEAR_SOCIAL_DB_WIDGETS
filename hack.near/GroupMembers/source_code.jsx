const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

const group = props.groupId ?? "council";
const policy = Near.view(daoId, "get_policy");

const members = policy.roles
  .filter((role) => role.name === group)
  .map((role) => {
    const members = role.kind.Group;

    return members;
  });

return (
  <div className="m-2">
    <h3>Groups:</h3>
    <h4>{group}</h4>
    <Widget
      src="mob.near/widget/Profile"
      props={{
        tooltip: true,
        accountId: members,
      }}
    />
  </div>
);
