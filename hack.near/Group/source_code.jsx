const accountId = props.accountId ?? context.accountId;
const daoId = props.accountId ?? "multi.sputnik-dao.near";

return (
  <div className="group d-inline-block">
    <a
      href={`#/mob.near/widget/Group?daoId=${daoId}`}
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
      <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="profile-name text-truncate">{groupId}</div>
        <div className="profile-links d-flex">
          <div className="d-inline-block profile-account text-secondary text-truncate">
            @{groupId}
          </div>
        </div>
      </div>
    </a>
  </div>
);
