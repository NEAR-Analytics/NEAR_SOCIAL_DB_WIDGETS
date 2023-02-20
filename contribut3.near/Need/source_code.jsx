const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;
const cid = props.cid;
const inboxView = props.inboxView;

if (!accountId || !cid) {
  return "Cannot render contribution need widget without account ID or CID!";
}

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  true
);

const currentContributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: accountId, contributor_id: context.accountId },
  "final"
);

const isAuthorized =
  !!currentContributor && currentContributor.permissions.includes("Admin");

const contributionNeed = props.isPreview
  ? props.contributionNeed
  : Near.view(
    ownerId,
    "get_contribution_need",
    {
      account_id: accountId,
      cid,
    },
    "final",
    true
  );

const entity = isPreview
  ? props.entity
  : Near.view(ownerId, "get_entity", { account_id: accountId }, "final");

if (!entity) {
  return isPreview
    ? "You must provide a entity object in preview mode"
    : "Loading...";
}

const profile = Social.getr(`${accountId}/profile`);

const tags = Object.keys(profile.tags ?? {});
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const circle = (
  <div
    className="profile-circle d-inline-block"
    title={`${profile.name} @${accountId}`}
    style={{ width: "1.5em", height: "1.5em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${url}`}
      alt="profile image"
    />
  </div>
);

const ctas = inboxView ? (
  <></>
) : (
  <>
    <div className="vr mx-3" />
    <div className="d-flex flex-row justify-content-end align-items-start py-3">
      <a
        className="btn btn-outline-secondary me-2 fw-semibold"
        href={`https://near.social/#/${ownerId}/widget/Contributor?accountId=${accountId}`}
        style={{
          backgroundColor: "#F9F5FF",
          borderColor: "#F9F5FF",
          color: "#6941C6",
        }}
      >
        <i className="bi-person-plus" />
        Propose
      </a>
      <a className="btn btn-outline-secondary">
        <i className="bi-box-arrow-up-right" />
      </a>
    </div>
  </>
);

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "10em" }}
  >
    <div className="flex-grow-1 py-3">
      <div className="d-flex flex-column justify-content-between align-items-start w-100">
        <div className="w-100 d-flex flex-row justify-content-between align-items-start">
          <div className="fs-4 fw-semibold">
            {contributionNeed.contribution_type}
          </div>
          <div
            className={contributionNeed.active ? "text-success" : "text-muted"}
          >
            {contributionNeed.active ? <i className="bi-circle-fill" /> : <></>}
            <span className="ms-1">
              {contributionNeed.active ? "Open to proposals" : "Closed"}
            </span>
          </div>
        </div>
        <div className="my-2">
          {circle}
          <b>{entity.name || profile.name}</b>
          <span className="text-muted">@{accountId}</span>
        </div>
        <div className="text-truncate text-muted">
          {tags.length > 0 ? (
            <>
              {tags.map((tag) => (
                <span
                  className="d-inline-block mx-1 py-1 px-2 badge border border-secondary text-secondary text-muted text-center"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="text-truncate my-2">{contributionNeed.description}</div>
      </div>
    </div>
    {ctas}
  </div>
);

return (
  <div className="card">
    <div className="card-body px-3 py-0">{body}</div>
    {isAuthorized && !notStandalone ? (
      <div className="card-footer">
        <Widget
          src={`${ownerId}/widget/ContributionRequestList`}
          props={{ accountId }}
        />
      </div>
    ) : (
      <></>
    )}
  </div>
);
