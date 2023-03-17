// SingleGroupMembers.js
function SingleGroupMembers(props) {
  const { accountId, daoId, groupId } = props;

  return (
    <div>
      <h3>{groupId}</h3>
      <Widget
        src="hack.near/widget/GroupMembers"
        props={{ accountId, daoId, groupId }}
        displayGroupName={false}
      />
    </div>
  );
}
