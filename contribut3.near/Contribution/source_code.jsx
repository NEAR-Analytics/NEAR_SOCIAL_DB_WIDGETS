const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;

if (!entityId || !contributorId) {
  return (
    <div>Cannot show contribution without entity ID or contributor ID!</div>
  );
}

const contribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: contributorId },
  "final"
);

if (!contribution) {
  return <div>Loading...</div>;
}

const shareButton = props.isPreview ? null : (
  <a
    class="card-link"
    href={`https://near.social/#/${ownerId}/widget/Contribution?entityId=${entityId}&contributorId=${contributorId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div class="bi bi-share"></div>
  </a>
);

const header = (
  <div className="card-header">
    <small class="text-muted">
      <div class="row justify-content-between">
        <div class="col-4">
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: contributorId }}
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const detail = ({ description, start_date, end_date }) => (
  <div className="card">
    Description:
    <br />
    <p>{description || "Founded entity"}</p>
    Start date:
    <br />
    <p>{new Date(Number(start_date)).toLocaleDateString()}</p>
    {end_date ? (
      <>
        End date: <br /> <p>{end_date}</p>
      </>
    ) : null}
  </div>
);

const pastWork =
  contribution.history && contribution.history.length ? (
    <>
      Past work:
      {contribution.history.map(detail)}
    </>
  ) : null;

return (
  <div className="card">
    {header}
    <div className="card-body">
      <div>
        Contribution to:
        <Widget
          src={`mob.near/widget/ProfileLine`}
          props={{ accountId: entityId }}
        />
      </div>
      Current work:
      {detail(contribution.current)}
      {pastWork}
    </div>
  </div>
);
