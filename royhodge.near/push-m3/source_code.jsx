let accountId = props.accountId ?? context.accountId;

const profile = Social.getr(`${accountId}/profile`);

const showEditButton =
  !props.profile && accountId && accountId === context.accountId;

const name = props.profile.name ?? profile.name;
const image = props.profile.image ?? profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const linktree = props.profile.linktree ?? profile.linktree;

return (
  <div className="profile">
    <div
      className="profile-image float-start me-2"
      style={{ width: "3em", height: "3em" }}
    >
      <img
        className="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={url}
        alt="profile image"
      />
    </div>
    <div className="profile-info d-inline-block">
      <div className="profile-name">{name || "No-name profile"}</div>
      <div className="profile-links">
        <div className="d-inline-block profile-account text-secondary">
          @{accountId}
        </div>
        {linktree.website && (
          <div className="ms-1 d-inline-block">
            <a href={`https://${linktree.website}`}>
              <i className="bi bi-globe2 text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.github && (
          <div className="ms-1 d-inline-block">
            <a href={`https://github.com/${linktree.github}`}>
              <i className="bi bi-github text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.twitter && (
          <div className="ms-1 d-inline-block">
            <a href={`https://twitter.com/${linktree.twitter}`}>
              <i className="bi bi-twitter text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.telegram && (
          <div className="ms-1 d-inline-block">
            <a href={`https://t.me/${linktree.telegram}`}>
              <i className="bi bi-telegram text-secondary"></i>
            </a>
          </div>
        )}
      </div>
    </div>
    {showEditButton && (
      <a
        href="#/eugenethedream/widget/ProfileEditor"
        className="profile-edit btn btn-sm btn-outline-secondary border-0 align-top"
      >
        Edit
      </a>
    )}
  </div>
);
