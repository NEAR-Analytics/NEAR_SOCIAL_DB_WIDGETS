const accountId = props.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;

return (
  <div className="d-inline-flex flex-row">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
        className: "me-2",
      }}
    />
    <div className="text-truncate lh-sm">
      <div className="text-truncate">
        <span className="fw-bold">{name}</span>
      </div>
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">@{accountId}</span>
        </small>
      </div>
    </div>
  </div>
);
