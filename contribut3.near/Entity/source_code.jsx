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

const shareButton = props.isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share"></div>
  </a>
);

const currentContributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: accountId, contributor_id: context.accountId },
  "final"
);

const isAuthorized =
  !!currentContributor && currentContributor.permissions.includes("Admin");

const contributions = Near.view(
  ownerId,
  "get_entity_contributions",
  {
    entity_id: accountId,
  },
  "final"
);

const contributionRequests = Near.view(
  ownerId,
  "get_entity_contribution_requests",
  {
    entity_id: accountId,
  },
  "final"
);

const contributionsList = !notStandalone ? (
  <div className="mb-2">
    Contributions:
    <br />
    {!contributions ? (
      <div>Loading...</div>
    ) : (
      contributions.map(([contributorId]) => (
        <Widget
          src={`${ownerId}/widget/Contribution`}
          props={{ entityId: accountId, contributorId, id: contributorId }}
        />
      ))
    )}
  </div>
) : null;

const requestsList =
  isAuthorized && !notStandalone ? (
    <div>
      Contribution requests:
      <br />
      {!contributionRequests ? (
        <div>Loading...</div>
      ) : (
        contributionRequests.map(([contributorId]) => (
          <Widget
            src={`${ownerId}/widget/ContributionRequest`}
            props={{ entityId: accountId, contributorId, id: contributorId }}
          />
        ))
      )}
    </div>
  ) : null;

return (
  <div className="card">
    <div className="card-header">
      <div className="row justify-content-between">
        <div className="col-4">
          <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </div>
    <div className="card-body">
      <div>Type: {entity.kind}</div>
      <div>Status: {entity.status}</div>
      <div>
        Founded at: {new Date(Number(entity.start_date)).toLocaleDateString()}
      </div>
      {contributionsList}
      {requestsList}
    </div>
  </div>
);
