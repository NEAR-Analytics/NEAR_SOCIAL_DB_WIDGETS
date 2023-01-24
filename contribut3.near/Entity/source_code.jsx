const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;

if (!accountId) {
  return <div>Cannot show entity without account ID!</div>;
}

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final"
);

if (!entity) {
  return <div>Loading...</div>;
}

return (
  <div className="card">
    <div className="card-header">
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId,
        }}
      />
    </div>
    <div className="card-body">
      <div>Type: {entity.kind}</div>
      <div>Status: {entity.status}</div>
    </div>
  </div>
);
