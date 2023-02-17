const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

const conrtibutor = isPreview
  ? props.contributor
  : Near.view(ownerId, "get_contributor", { account_id: accountId }, "final");

if (!entity) {
  return isPreview
    ? "You must provide a contributor object in preview mode"
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

const contributorType = (
  <div>
    <i className="bi-person" />
    <span>Individual contributor</span>
  </div>
);

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "10em" }}
  >
    <div className="flex-grow-1 py-3">
      <div className="d-flex flex-row justify-content-start">
        <div className="m-2">{circle}</div>
        <div className="d-flex flex-column justify-content-between align-items-start w-100">
          <div className="w-100 d-flex flex-row justify-content-between align-items-start">
            <div>
              <b>{name}</b>
              <span className="text-muted">@{accountId}</span>
            </div>
            <div className="text-success">
              <i className="bi-play" />
              <span className="ms-1">{entity.status}</span>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-start align-items-center my-1">
            {founderCircle}
            <span className="mx-1">{founderProfile.name}</span>
            <span className="text-muted">@{founder}</span>
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
          <div className="text-truncate my-2">{profile.description}</div>
        </div>
      </div>
    </div>
    <div className="vr mx-3" />
    <div className="d-flex flex-row justify-content-end align-items-start py-3">
      <a
        className="btn btn-outline-secondary me-2"
        href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
      >
        View details
      </a>
      <a className="btn btn-outline-secondary">
        <i className="bi-box-arrow-up-right" />
      </a>
    </div>
  </div>
);

return (
  <div className="card">
    <div className="card-body px-3 py-0">
      {body}
      {details}
      {needForm}
      {contributionsList}
      {requestsList}
      {inviteList}
    </div>
  </div>
);
