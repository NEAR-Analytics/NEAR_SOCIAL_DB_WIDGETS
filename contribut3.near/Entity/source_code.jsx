const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return <div>Cannot show entity without account ID!</div>;
}

const entity = isPreview
  ? props.entity
  : Near.view(ownerId, "get_entity", { account_id: accountId }, "final");

if (!entity) {
  if (isPreview) {
    return <div>You must provide an entity object in preview mode</div>;
  }
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
      <div>
        Founded at: {new Date(Number(entity.start_date)).toLocaleDateString()}
      </div>
    </div>
  </div>
);
