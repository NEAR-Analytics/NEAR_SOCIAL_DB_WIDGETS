const ownerId = "contribut3.near";
const accountId = context.accountId;
const entityId = props.entityId;
const contributorId = props.contributorId;

initState({
  description: "",
  startDate: "",
});

if (!entityId || !contributorId) {
  return "Cannot show contribution request without entityId or contributorId!";
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
  return props.isPreview
    ? "You must provide contribution request object in preview mode!"
    : "Loading...";
}

const description = isPreview
  ? props.contributionRequest.description
  : contributionRequest.description;

const descriptionArea = <Markdown text={description} />;

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

const body = (
  <div className="card-body">
    {postTitle}
    {descriptionArea}
  </div>
);

const footer =
  !isAuthorized || isPreview ? null : (
    <div className="card-footer">
      <div>
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
  );

return (
  <div className={`card my-2`}>
    {header}
    {body}
    {footer}
  </div>
);
