const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please log in with your NEAR wallet :)";
}

const link =
  props.link &&
  (props.link === true
    ? `#/gov.near/widget/ProjectPage?accountId=${accountId}`
    : props.link);

const project = props.project ?? Social.getr(`${accountId}/project`);

if (project === null) {
  return { showEditButton };
}

const showEditButton =
  project !== undefined &&
  (!props.project || props.showEditButton) &&
  accountId &&
  accountId === context.accountId;

const name = project.name || "Anonymous Project";
const image = project.image;
const backgroundImage = project.backgroundImage;
const tags = Object.keys(project.tags ?? {});

const nameHeader = <h4 className="mt-0 mb-0 text-truncate">{name}</h4>;

return (
  <div className="bg-white shadow rounded overflow-hidden">
    <div className="px-4 pt-0 pb-5 bg-dark position-relative">
      {backgroundImage && (
        <Widget
          src="gov.near/widget/Image"
          props={{
            image: backgroundImage,
            alt: "project background",
            className: "position-absolute w-100 h-100",
            style: { objectFit: "cover", left: 0, top: 0 },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
      {showEditButton && (
        <a
          href="#/gov.near/widget/ProjectEditor"
          className="btn mt-4 btn-outline-light float-end position-relative"
          style={{ zIndex: 1 }}
        >
          Edit project
        </a>
      )}
      <div
        className="project-picture d-inline-block"
        style={{ transform: "translateY(7rem)" }}
      >
        <Widget
          src="gov.near/widget/ProjectImage"
          props={{
            project,
            accountId,
            style: { width: "10rem", height: "10rem" },
            className: "mb-2",
            imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
            thumbnail: false,
          }}
        />
      </div>
    </div>
    <div className="bg-light px-4 pb-4">
      <div className="d-md-flex justify-content-between pt-3 mb-2">
        <div style={{ paddingTop: "3rem" }}>
          <div className="me-2 d-sm-flex gap-1 flex-row align-items-center">
            <div className="me-2 position-relative">
              {link ? (
                <a
                  className="text-truncate text-dark stretched-link"
                  href={link}
                >
                  {nameHeader}
                </a>
              ) : (
                nameHeader
              )}
              <div className="small text-truncate">
                <i className="bi bi-wallet-fill text-secondary me-1"></i>
                {accountId}
                <Widget
                  src="gov.near/widget/FollowsYouBadge"
                  props={{ accountId }}
                />
              </div>
            </div>

            <div>
              <Widget
                src="gov.near/widget/FollowButton"
                props={{ accountId }}
              />
            </div>
          </div>
          <div>
            <Widget src="gov.near/widget/FollowStats" props={{ accountId }} />
          </div>
        </div>
        <div style={{ minWidth: "12rem" }}>
          <Widget
            src="gov.near/widget/LinkTree"
            props={{ linktree: project.linktree }}
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div>
          {tags.map((tag, i) => (
            <span key={i} className="me-1 mb-1 badge bg-secondary">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="public-tags collapse show">
          <button
            className="btn btn-sm btn-outline-secondary border-0"
            data-bs-toggle="collapse"
            data-bs-target={`.public-tags`}
            aria-expanded="false"
            aria-controls={"public-tags"}
          >
            <i className="bi bi-arrows-angle-expand me-1"></i>Show public tags
          </button>
        </div>
        <div className="collapse public-tags">
          <Widget src="gov.near/widget/PublicTags" props={{ accountId }} />
        </div>
      </div>
    </div>
  </div>
);
