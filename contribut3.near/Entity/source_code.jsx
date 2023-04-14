const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;
const inboxView = props.inboxView;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final"
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
    title={`${entity.name || profile.name} @${accountId}`}
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

const [[founder]] = (contributions ?? []).filter((contribution) => {
  const [_, details] = contribution;
  const all = [...details.history, details.current];
  return all.some((detail) => detail.description === "");
});

const founderProfile = Social.getr(`${founder}/profile`);
const founderImage = profile.image;
const founderImageUrl =
  (founderImage.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${founderImage.ipfs_cid}`
    : founderImage.url) ||
  "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const founderCircle = (
  <div
    className="profile-circle d-inline-block"
    title={`${founderProfile.name} @${founder}`}
    style={{ width: "1.5em", height: "1.5em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${founderImageUrl}`}
      alt="profile image"
    />
  </div>
);

const ctas = inboxView ? (
  <></>
) : (
  <>
    <div className="vr mx-3" />
    <div className="d-flex flex-row justify-content-end align-items-start py-3">
      <a
        className="btn btn-outline-secondary me-2"
        href={`https://near.social/#/${ownerId}/widget/Index?tab=entity&accountId=${accountId}`}
        onClick={() => props.update("entity")}
      >
        View details
      </a>
      <a className="btn btn-outline-secondary">
        <i className="bi-box-arrow-up-right" />
      </a>
    </div>
  </>
);

const buttonAction = ({ text, icon, id }) => (
  <li>
    <a className="dropdown-item" id={id}>
      <i className={icon} />
      <span>{text}</span>
    </a>
  </li>
);

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "10em" }}
  >
    <div className="flex-grow-1 py-3">
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity: true,
          imageSize: "3em",
          additionalText: inboxView ? (
            <></>
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="text-success me-3">
                <i className="bi-play" />
                <span className="ms-1">{entity.status}</span>
              </div>
              <div className="btn-group dropstart">
                <a
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi-three-dots-vertical" />
                </a>

                <ul className="dropdown-menu">
                  {buttonAction({
                    text: "Propose contribution",
                    icon: "bi-person-up",
                    id: "contribute",
                  })}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {buttonAction({
                    text: "Invite to contribute",
                    icon: "bi-person-plus",
                    id: "invite",
                  })}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {buttonAction({
                    text: "View details",
                    icon: "bi-info-circle",
                    id: "info",
                  })}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {buttonAction({
                    text: "Share",
                    icon: "bi-arrow-up-right",
                    id: "share",
                  })}
                </ul>
              </div>
            </div>
          ),
          additionalRow: (
            <Widget
              src={`${ownerId}/widget/ProfileLine`}
              props={{ accountId: founder }}
            />
          ),
        }}
      />
      <div className="d-flex flex-row justify-content-start">
        <div className="m-2">{circle}</div>
        <div className="d-flex flex-column justify-content-between align-items-start w-100">
          <div className="w-100 d-flex flex-row justify-content-between align-items-start">
            <div>
              <b>{profile.name}</b>
              <span className="text-muted">@{accountId}</span>
            </div>
            {}
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
  </div>
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
    {isAuthorized && !notStandalone ? (
      <div className="card-footer">
        <Widget
          src={`${ownerId}/widget/ContributionRequestList`}
          props={{ accountId }}
        />
      </div>
    ) : (
      <></>
    )}
  </div>
);
