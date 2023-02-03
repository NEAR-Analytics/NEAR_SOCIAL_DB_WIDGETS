const ownerId = "contribut3.near";
const entityId = props.entityId;

if (!entityId || !context.accountId) {
  return "Cannot show contribution invite without entityId or contributorId!";
}

const invite = props.isPrevew
  ? props.invite
  : Near.view(
      ownerId,
      "get_invite",
      { entity_id: entityId, contributor_id: context.accountId },
      "final",
      true
    );

if (!invite) {
  return props.isPreview
    ? "You must provide a invite object in preview mode!"
    : "Loading...";
}

const shareButton = props.isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Invite?entityId=${entityId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share" />
  </a>
);

const header = (
  <div className="card-header">
    <small className="text-muted">
      <div className="row justify-content-between">
        <div className="col-4">
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: entityId }}
          />
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const postTitle = (
  <h5 className="card-title">
    <div className="row justify-content-between">
      <div className="col-9">Invite for {invite.contribution_type}</div>
    </div>
  </h5>
);

const descriptionArea = (
  <Markdown className="card-text" text={invite.description} />
);

const startDateDiv = (
  <div>
    Start date:
    <br />
    <p>{new Date(Number(invite.start_date)).toLocaleDateString()}</p>
  </div>
);

const body = (
  <div className="card-body">
    {postTitle}
    {startDateDiv}
    {descriptionArea}
  </div>
);

const footer = (
  <div className="card-footer">
    <div>
      <a
        className="btn btn-outline-primary mb-2"
        onClick={() => {
          const args = {
            account_id: entityId,
          };

          Near.call(ownerId, "accept_invite", args);
        }}
      >
        Accept
      </a>
    </div>
  </div>
);

return (
  <div className={`card my-2`}>
    {header}
    {body}
    {footer}
  </div>
);
