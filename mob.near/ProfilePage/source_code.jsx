const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const showEditButton =
  profile !== undefined &&
  !props.profile &&
  accountId &&
  accountId === context.accountId;

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

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
                  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
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
        <div className="bg-light px-4 pb-4">
          <div className="d-md-flex justify-content-between pt-3 mb-2">
            <div style={{ paddingTop: "3rem" }}>
              <div className="me-2 d-sm-flex gap-1 flex-row align-items-center">
                <div className="me-2">
                  <h4 className="mt-0 mb-0">{name}</h4>
                  <div className="small text-trancate">
                    <i className="bi bi-person-fill text-secondary me-1"></i>
                    {accountId}
                    <Widget
                      src="mob.near/widget/FollowsYouBadge"
                      props={{ accountId }}
                    />
                  </div>
                </div>

                <div>
                  <Widget
                    src="mob.near/widget/FollowButton"
                    props={{ accountId }}
                  />
                </div>
              </div>
              <div>
                <Widget
                  src="mob.near/widget/FollowStats"
                  props={{ accountId }}
                />
              </div>
            </div>
            <div style={{ minWidth: "12rem" }}>
              <Widget
                src="mob.near/widget/LinkTree"
                props={{ linktree: profile.linktree }}
              />
            </div>
          </div>

          {tags.length > 0 && (
            <div>
              {tags.map((tag) => (
                <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
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
                <i className="bi bi-arrows-angle-expand me-1"></i>Show public
                tags
              </button>
            </div>
            <div className="collapse public-tags">
              <Widget
                src="zavodil.near/widget/PublicTags"
                props={{ accountId }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Widget
          src="mob.near/widget/ProfileTabs"
          props={{ accountId, profile }}
        />
      </div>
    </div>
  </div>
);
