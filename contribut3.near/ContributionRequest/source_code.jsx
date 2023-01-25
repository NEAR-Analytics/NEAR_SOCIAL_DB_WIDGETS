const ownerId = "contribut3.near";
const accountId = context.accountId;
const entityId = props.entityId;
const contributorId = props.contributorId;

initState({
  description: "",
  startDate: "",
});

if (!entityId || !contributorId) {
  return (
    <div>
      Cannot show contribution request without entityId or contributorId!
    </div>
  );
}

const contributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: accountId },
  "final"
);

const isAuthorized = !!contributor && contributor.permissions.includes("Admin");

const contributionRequest = props.isPreview
  ? props.contributionRequest
  : Near.view(ownerId, "get_contribution_request", {
      entity_id: entityId,
      contributor_id: contributorId,
    });

if (!contributionRequest) {
  if (props.isPreview) {
    return (
      <div>You must provide contribution request object in preview mode.</div>
    );
  }
  return <div>Loading...</div>;
}

// If this post is displayed under another post. Used to limit the size.
const isUnderPost = props.isUnderPost ? true : false;

const shareButton = props.isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/ContributionRequest?entityId=${entityId}&contributorId=${contributorId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share"></div>
  </a>
);

const header = (
  <div className="card-header">
    <small className="text-muted">
      <div className="row justify-content-between">
        <div className="col-4">
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: contributorId }}
          />
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const entityLink = (
  <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId: entityId }} />
);

const postTitle = (
  <h5 className="card-title">
    <div className="row justify-content-between">
      <div className="col-9">Contribution Request for {entityLink}</div>
    </div>
  </h5>
);

const description = isPreview
  ? props.contributionRequest.description
  : contributionRequest.description;

// Should make sure the posts under the currently top viewed post are limited in size.
const descriptionArea = isUnderPost ? (
  <limitedMarkdown className="overflow-auto">
    <Markdown className="card-text" text={description}></Markdown>
  </limitedMarkdown>
) : (
  <Markdown className="card-text" text={description}></Markdown>
);

const startDateInput = (
  <div className="col-lg-6 mb-2">
    Start date of contribution (optional):
    <input
      type="date"
      value={state.startDate}
      onChange={(e) => State.update({ startDate: e.target.value })}
    />
  </div>
);

const descriptionDiv = (
  <div className="col-lg-12  mb-2">
    Updated description (optional):
    <br />
    <textarea
      value={state.description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
  </div>
);

const approveButton =
  isAuthorized && !isPreview ? (
    <div className="card-footer">
      <div className="">
        {startDateInput}
        {descriptionDiv}
        <a
          className="btn btn-outline-primary mb-2"
          onClick={() => {
            const args = {
              entity_id: entityId,
              contributor_id: contributorId,
            };

            if (state.description) {
              args.description = state.description;
            }

            if (state.startDate) {
              args.start_date = state.startDate;
            }

            Near.call(ownerId, "approve_contribution", args);
          }}
        >
          Approve
        </a>
      </div>
    </div>
  ) : null;

return (
  <div className={`card my-2`}>
    {header}
    <div className="card-body">
      {postTitle}
      {descriptionArea}
    </div>
    {approveButton}
  </div>
);
