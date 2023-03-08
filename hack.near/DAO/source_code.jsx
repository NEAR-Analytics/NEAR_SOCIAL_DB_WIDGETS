const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const groupId = props.groupId ?? "council";
const policy = Near.view(daoId, "get_policy");

return (
  <div className="mb-3">
    <h2 className="mt-3">{daoId}</h2>
    <div className="mt-3">
      <Widget
        src="hack.near/widget/Groups"
        props={{ accountId, daoId, groupId }}
      />
    </div>
    <div>
      <Widget
        src="hack.near/widget/GroupMembers"
        props={{ accountId, daoId, groupId }}
      />
    </div>
  </div>
);
