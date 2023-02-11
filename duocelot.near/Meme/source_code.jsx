const accountId = props.accountId ?? context.accountId;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
const profile = Social.getr(`${accountId}/profile`);
const meme = props.meme ?? Social.getr(`${accountId}/post/meme`, blockHeight);

if (!meme) {
  return "Loading";
}

if (!props.meme && !blockHeight) {
  blockHeight = Social.keys(`${accountId}/post/meme`, undefined, {
    return_type: "BlockHeight",
  })[accountId].post.meme;
  if (!blockHeight) {
    return "Loading";
  }
}

const memeTimeMs = props.meme
  ? Date.now()
  : parseFloat(Near.block(blockHeight).header.timestamp_nanosec) / 1e6;

const url = meme.image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${meme.image.ipfs_cid}`
  : null;

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/duocelot.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

return (
  <div style={{ maxWidth: "40em" }}>
    <div
      className="d-flex align-items-start"
      style={{
        padding: "1.5rem 0",
        borderBottom: "1px solid #e9e9e9",
      }}
    >
      <div>{profileLink()}</div>
      <div className="ms-2 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-start">
          <div className="flex-grow-1 me-1 text-truncate">
            {profileLink(
              <>
                <span className="fw-bold">{profile.name}</span>
                <span className="text-secondary">@{accountId}</span>
              </>
            )}
          </div>
          <div>
            <small className="ps-1 text-nowrap text-muted ms-auto">
              <i className="bi bi-clock me-1"></i>
              {timeAgo(Date.now() - memeTimeMs)}
            </small>
          </div>
        </div>
        <img src={url} className="rounded mw-100" alt={meme.title} />
        <div>
          {meme.title && <b>{meme.title}</b>}
          {meme.description && <p>{meme.description}</p>}
        </div>
        <p className="small text-muted mt-2 mb-0">
          <span>
            <i className="bi bi-star me-1"></i>4
          </span>
          <span className="ms-2">
            <i className="bi bi-chat-square-fill me-1"></i>20
          </span>
          <span className="ms-2">
            <i className="bi bi-reply"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
);
