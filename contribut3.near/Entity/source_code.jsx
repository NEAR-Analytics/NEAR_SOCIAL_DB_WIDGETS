const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

const entity = isPreview
  ? props.entity
  : Near.view(ownerId, "get_entity", { account_id: accountId }, "final");

if (!entity) {
  return isPreview
    ? "You must provide an entity object in preview mode"
    : "Loading...";
}

const shareButton = isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share" />
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
  { entity_id: accountId },
  "final"
);

const contributionRequests = Near.view(
  ownerId,
  "get_entity_contribution_requests",
  { entity_id: accountId },
  "final"
);

const invites = Near.view(
  ownerId,
  "get_entity_invites",
  { account_id: accountId },
  "final",
  true
);

const contributionsList = notStandalone ? null : (
  <div className="mb-2">
    Contributions:
    <br />
    {!contributions
      ? "Loading..."
      : contributions.map(([contributorId]) => (
        <Widget
          src={`${ownerId}/widget/Contribution`}
          props={{ entityId: accountId, contributorId, id: contributorId }}
        />
      ))}
  </div>
);

const requestsList =
  !isAuthorized || notStandalone ? null : (
    <div>
      Contribution requests:
      <br />
      {!contributionRequests
        ? "Loading..."
        : contributionRequests.map(([contributorId]) => (
          <Widget
            src={`${ownerId}/widget/ContributionRequest`}
            props={{ entityId: accountId, contributorId, id: contributorId }}
          />
        ))}
    </div>
  );

const inviteList =
  !isAuthorized || notStandalone ? null : (
    <div>
      Sent invites:
      <br />
      {!invites
        ? "Loading..."
        : Object.keys(invites).map((contributorId) => (
          <Widget
            src={`${ownerId}/widget/Invite`}
            props={{ entityId: accountId, contributorId }}
          />
        ))}
    </div>
  );

const needForm =
  !isAuthorized || notStandalone ? null : (
    <Widget src={`${ownerId}/widget/NeedForm`} props={{ accountId }} />
  );

const header = (
  <div className="card-header">
    <div className="row justify-content-between align-items-start">
      <div className="col-4">
        <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
      </div>
      <div className="col-5">
        <div className="d-flex justify-content-end">{shareButton}</div>
      </div>
    </div>
  </div>
);

const profile = Social.getr(`${accountId}/profile`);

const name = entity.name || profile.name;
const image = profile.image;
const tags = Object.keys(profile.tags ?? {});
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const circle = (
  <div
    className="profile-circle d-inline-block"
    title={`${name} @${accountId}`}
    style={{ width: "4em", height: "4em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${url}`}
      alt="profile image"
    />
  </div>
);

const body = (
  <div className="d-flex flex-row justify-content-between align-items-start">
    <div className="d-flex flex-row justify-content-start">
      <div className="m-2">{circle}</div>
      <div className="m-2 d-flex flex-column justify-content-between align-items-start">
        <div>
          <b>{name}</b>
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
      </div>
    </div>
    <div>Name: {entity.name}</div>
    <div>Type: {entity.kind}</div>
    <div>Status: {entity.status}</div>
    <div>
      Founded at: {new Date(Number(entity.start_date)).toLocaleDateString()}
    </div>
    {needForm}
    {contributionsList}
    {requestsList}
    {inviteList}
  </div>
);

return (
  <div className="card">
    <div className="card-body p-3">
      {/* {header} */}
      {body}
    </div>
  </div>
);
