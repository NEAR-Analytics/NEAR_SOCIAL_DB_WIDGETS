const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const eventId = props.eventId ?? "workshop";

if (!eventId) {
  return "No event ID...";
}

const link =
  props.link &&
  (props.link === true
    ? `https://social.near.page/u/${accountId}`
    : props.link);

const event = Social.get(`${accountId}/event/${eventId}/**`);

if (event === null) {
  return "Loading...";
}

const showEditButton =
  event !== undefined &&
  (!props.event || props.showEditButton) &&
  accountId &&
  accountId === context.accountId;

const name = event.name || "TBA";
const date = event.date;
const time = event.time;

const image = event.image;
const backgroundImage = event.backgroundImage;
const tags = Object.keys(event.tags ?? {});

const nameHeader = <h4 className="mt-0 mb-0 text-truncate">{name}</h4>;

return (
  <div className="bg-white shadow rounded overflow-hidden">
    <div className="px-4 pt-0 pb-5 bg-dark position-relative">
      {backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: backgroundImage,
            alt: "event background",
            className: "position-absolute w-100 h-100",
            style: { objectFit: "cover", left: 0, top: 0 },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
      {showEditButton && (
        <a
          href={`#/hack.near/widget/event.create?eventId=${eventId}`}
          className="btn mt-4 btn-outline-light float-end position-relative"
          style={{ zIndex: 1 }}
        >
          Edit event
        </a>
      )}
      <div
        className="event-picture d-inline-block"
        style={{ transform: "translateY(7rem)" }}
      >
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: event.image,
            style: { width: "10rem", height: "10rem" },
            className: "rounded-circle img-thumbnail d-block mb-2",
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
                <a className="text-truncate text-dark" href={link}>
                  {nameHeader}
                </a>
              ) : (
                nameHeader
              )}
              <div className="small text-truncate">
                <i className="bi bi-person-fill text-secondary"></i>
                {accountId}
                <Widget
                  src="mob.near/widget/CopyButton"
                  props={{
                    text: accountId,
                    className: "btn btn-sm btn-outline-dark border-0",
                  }}
                />
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
              <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />
            </div>
          </div>
          <div>
            <b>Date:</b> {date}
          </div>
          <div>
            <b>Time:</b> {time}
          </div>
        </div>
        <div style={{ minWidth: "12rem" }}>
          <Widget
            src="mob.near/widget/LinkTree"
            props={{ linktree: event.linktree }}
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="me-1 mb-1 fw-light badge border border-secondary text-bg-light"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="float-end">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{
              text: link,
              label: "Share",
              clipboardIcon: <i className="bi bi-share" />,
            }}
          />
        </div>
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
          <Widget src="mob.near/widget/PublicTags" props={{ accountId }} />
        </div>
      </div>
    </div>
  </div>
);
