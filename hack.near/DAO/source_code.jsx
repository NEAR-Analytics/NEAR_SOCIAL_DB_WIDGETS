const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const groupId = props.groupId ?? "council";
const policy = Near.view(daoId, "get_policy");

State.init({
  dao_id: daoId,
  group_id: groupId,
});

const onChangeDAO = (daoId) => {
  State.update({
    daoId,
  });
};

const onChangeGroup = (groupId) => {
  State.update({
    groupId,
  });
};

return (
  <div className="mb-3">
    <div className="mb-3">
      DAO:
      <input type="text" onChange={(e) => onChangeDAO(e.target.value)} />
    </div>
    <div className="mb-3">
      Group:
      <input type="text" onChange={(e) => onChangeGroup(e.target.value)} />
    </div>
    <h2 className="mt-3">{daoId}</h2>
    <div className="mt-3">
      <Widget src="hack.near/widget/Groups" props={{ accountId }} />
    </div>
    <div>
      <Widget src="hack.near/widget/GroupMembers" props={{ accountId }} />
    </div>
  </div>
);
