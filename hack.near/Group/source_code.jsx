const accountId = props.accountId ?? context.accountId;
const daoId = props.accountId ?? "multi.sputnik-dao.near";
const groupId = props.groupId ?? "council";

return (
  <div className="group d-inline-block">
    <a
      href={`#/hack.near/widget/Group?groupId=${groupId}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="hack.near/widget/GroupImage"
        props={{
          daoId,
          accountId,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="group-info d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="group-name text-truncate">DAO Group: {groupId}</div>
        <div className="group-links d-flex">
          <div className="d-inline-block text-secondary text-truncate">
            {daoId}
          </div>
        </div>
      </div>
    </a>
  </div>
);
