const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

if (profile === undefined) {
  return "Profile not found";
}

const tagsPattern = `*/nametag/${accountId}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");

const showEditButton =
  !props.profile && accountId && accountId === context.accountId;

const name = profile.name;
const description = profile.description;
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

const linktree = Object.entries(profile.linktree ?? {});
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

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="px-4 pt-0 pb-5 bg-dark position-relative">
          {backgroundImage && (
            <Widget
              src="mob.near/widget/Image"
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
              href="#/mob.near/widget/ProfileEditor"
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
              src="mob.near/widget/ProfileImage"
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
          {Object.keys(tagsObject || {}).length > 0 && (
            <div>
              <div className="public-tags collapse show">
                <button
                  className="btn btn-sm btn-outline-secondary border-0"
                  data-bs-toggle="collapse"
                  data-bs-target={`.public-tags`}
                  aria-expanded="false"
                  aria-controls={"public-tags"}
                >
                  <i className="bi bi-arrows-angle-expand me-1"></i>Show public
                  tags
                </button>
              </div>
              <div className="collapse public-tags">
                <Widget
                  src="mob.near/widget/PublicTags"
                  props={{ accountId }}
                />
              </div>
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
