const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

const contributor = isPreview
  ? props.contributor
  : Near.view(ownerId, "get_contributor", { account_id: accountId }, "final");

if (!contributor) {
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
  <div className="d-flex flex-row justify-content-start align-items-center my-1 text-body">
    <i className="bi-person" />
    <span>Individual contributor</span>
  </div>
);

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em" }}
  >
    <Widget
      src={`${ownerId}/widget/ProfileLine`}
      props={{
        accountId,
        isEntity: true,
        imageSize: "3em",
        additionalColumn: inboxView ? (
          <></>
        ) : (
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div
              className={`text-${entity.status ? "success" : "muted"
                } me-3 d-flex flex-row`}
            >
              <i className={entity.status ? "bi-circle-fill" : ""} />
              <span className="ms-1">
                {entity.status ? "Available" : "Not available"}
              </span>
            </div>
            <Widget
              src={`${ownerId}/widget/CardMenu`}
              props={{
                items: [
                  {
                    text: "Propose contribution",
                    icon: "bi-person-up",
                    id: "contribute",
                  },
                  {
                    text: "Invite to contribute",
                    icon: "bi-person-plus",
                    id: "invite",
                  },
                  {
                    text: "View details",
                    icon: "bi-info-circle",
                    id: "info",
                  },
                  {
                    text: "Share",
                    icon: "bi-arrow-up-right",
                    id: "share",
                  },
                ],
              }}
            />
          </div>
        ),
        additionalRow: (
          <>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <i className={`${isEntity ? "bi-diagram-2" : "bi-person"}`} />
              <span className="ms-2">
                {isEntity ? "Organization" : "Individual contributor"}
              </span>
            </div>
            <Widget
              src={`${ownerId}/widget/Tags`}
              props={{ tags: profile.tags }}
            />
            <Widget
              src={`${ownerId}/widget/DescriptionArea`}
              props={{
                description: entity.description || profile.description,
              }}
            />
          </>
        ),
      }}
    />
  </div>
);

return (
  <div className="card">
    <div className="card-body px-3 py-0">{body}</div>
  </div>
);
