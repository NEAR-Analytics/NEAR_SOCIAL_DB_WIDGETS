// ContractPage
const ownerId = "zavodil.near";
const appName = "nametag";
const profileWidgetOwner = "mob.near";
const accountId = props.contractId ?? context.accountId;
const shortMode = props.shortMode ?? false;

const basicProfile = props.profile ?? Social.getr(`${accountId}/profile`);

console.log(basicProfile);

const tagsPattern = props.tagsPattern ?? `*/${appName}/${accountId}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");

const tagClass = "bg-success";
const addPublicTagHtml = (
  <div class={`me-1 badge ${tagClass}`}>
    <a
      href={`#/${ownerId}/widget/LabelEditor?contractId=${accountId}`}
      class="text-white"
    >
      + Add Public Tag
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

//const name = profile.name;
const description = profile.description;
//const image = profile.image;
const backgroundImage = profile.backgroundImage;
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

/*const linktree = Object.entries(profile.linktree ?? {});
const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
  github: {
    prefix: "https://github.com/",
    icon: "bi-github",
  },
  twitter: {
    prefix: "https://twitter.com/",
    icon: "bi-twitter",
  },
  telegram: {
    prefix: "https://t.me/",
    icon: "bi-telegram",
  },
};

const linktreeObjects = linktree.map((o) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <div>
      <a href={`${e.prefix}${value}`}>
        {icon}
        {value}
      </a>
    </div>
  ) : (
    <div>
      {key}: {icon}
      {value}
    </div>
  );
});
*/

/*return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="px-4 pt-0 pb-5 bg-dark position-relative">
          {backgroundImage && (
            <Widget
              src={`${profileWidgetOwner}/widget/Image`}
              props={{
                image: backgroundImage,
                alt: "profile background",
                className: "position-absolute w-100 h-100",
                style: { objectFit: "cover", left: 0, top: 0 },
                fallbackUrl:
                  "https://thewiki.io/static/media/sasha_anon.6ba19561.png",
              }}
            />
          )}
          {showEditButton && (
            <a
              href={`#/${profileWidgetOwner}/widget/ProfileEditor`}
              className="btn mt-4 btn-outline-light float-end position-relative"
              style={{ zIndex: 1 }}
            >
              Edit profile
            </a>
          )}
          <div
            className="profile-picture d-inline-block"
            style={{ transform: "translateY(7rem)" }}
          >
            <Widget
              src={`${profileWidgetOwner}/widget/ProfileImage`}
              props={{
                profile,
                accountId,
                style: { width: "10rem", height: "10rem" },
                className: "mb-2",
                imageClassName:
                  "rounded-circle w-100 h-100 img-thumbnail d-block",
                thumbnail: false,
              }}
            />
          </div>
        </div>

        <div className="bg-light px-4 pb-4 ">
          <div
            className="d-md-flex justify-content-between"
            style={{ paddingTop: "1rem" }}
          >
            <div style={{ paddingTop: "3rem" }}>
              <h4 className="mt-0 mb-0">{name}</h4>
              <p className="small">
                <i className="bi bi-person-fill text-secondary me-1"></i>
                {accountId}
              </p>
            </div>
            <div style={{ minWidth: "12rem" }}>{linktreeObjects}</div>
          </div>
          {tags.length > 0 && (
            <div>
              {tags.map((tag) => (
                <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
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
          {description && (
            <>
              <hr />
              <div>
                <Markdown text={description} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);
*/

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
