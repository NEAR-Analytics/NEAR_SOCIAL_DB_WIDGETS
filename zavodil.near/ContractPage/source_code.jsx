// ContractPage
const ownerId = "zavodil.near";
const appName = "nametag";
const profileWidgetOwner = "mob.near";
const accountId = props.contractId ?? context.accountId;
const shortMode = props.shortMode ?? false;

const basicProfile = props.profile ?? Social.getr(`${accountId}/profile`);

const tagsPattern = props.tagsPattern ?? `*/${appName}/${accountId}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");

const tagClass = "bg-success";
const addPublicTagHtml = (
  <div class={`me-1 badge ${tagClass}`}>
    <a
      href={`#/${ownerId}/widget/LabelEditor?contractId=${accountId}`}
      class="text-white"
    >
      + Add Name Tag
    </a>
  </div>
);

if (tagsObject === null) {
  return "Loading";
}

const tagsCount = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      title: t[1] + (t[1] > 1 ? " votes" : " vote"),
    };
  });
};

let hideBasicProfile = basicProfile === null || basicProfile === undefined;

const profile = {
  name: basicProfile.name,
  description: basicProfile.description,
  image: basicProfile.image,
  backgroundImage: basicProfile.backgroundImage,
  linktree: basicProfile.linktree,
  tags: basicProfile.tags,
  publicTags: getTags(),
};

const showEditButton =
  !props.profile && accountId && accountId === context.accountId;

const tags = profile.tags ?? {};
const publicTags = profile.publicTags ?? {};

const name = props.profile.name ?? profile.name;
const image = props.profile.image ?? profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const linktree = props.profile.linktree ?? profile.linktree;

if (hideBasicProfile || shortMode) {
  return (
    <div className="py-1 px-1">
      <div className="mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="bg-light px-4 pb-4 ">
            <div
              className="d-md-flex justify-content-between"
              style={{ paddingTop: "1rem" }}
            >
              <div className="small">
                <i className="bi bi-person-fill text-secondary me-1"></i>
                {accountId}
              </div>
            </div>
            {tags.length > 0 && (
              <div>
                {tags.map((tag) => (
                  <span className="me-1 badge bg-secondary">#{tag}</span>
                ))}
              </div>
            )}
            {publicTags.length > 0 && (
              <div>
                {publicTags.map((tag) => (
                  <span className={`me-1 badge ${tagClass}`} title={tag.title}>
                    #{tag.name}
                  </span>
                ))}
                {addPublicTagHtml}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="profile-links">
        <span className="profile-name">{name || "No-name profile"}</span>
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

      {publicTags.length > 0 && (
        <span>
          {publicTags.map((tag) => (
            <span className={`me-1 badge ${tagClass}`} title={tag.title}>
              #{tag.name}
            </span>
          ))}
          {addPublicTagHtml}
        </span>
      )}
    </div>
    {showEditButton && (
      <a
        href={`#/${profileWidgetOwner}/widget/ProfileEditor`}
        className="profile-edit btn btn-sm btn-outline-secondary border-0 align-top"
      >
        Edit
      </a>
    )}
  </div>
);
