const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;
const cid = props.cid;
const inboxView = props.inboxView;

if (!accountId || !cid) {
  return "Cannot render contribution need widget without account ID or CID!";
}

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  true
);

const currentContributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: accountId, contributor_id: context.accountId },
  "final"
);

const isAuthorized =
  !!currentContributor && currentContributor.permissions.includes("Admin");

const contributionNeed = props.isPreview
  ? props.contributionNeed
  : Near.view(
    ownerId,
    "get_contribution_need",
    {
      account_id: accountId,
      cid,
    },
    "final",
    true
  );

const entity = isPreview
  ? props.entity
  : Near.view(ownerId, "get_entity", { account_id: accountId }, "final");

if (!entity) {
  return isPreview
    ? "You must provide a entity object in preview mode"
    : "Loading...";
}

const profile = Social.getr(`${accountId}/profile`);

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em" }}
  >
    <div className="flex-grow-1 py-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <h4>Looking for {contributionNeed.contribution_type}</h4>
        <div className="d-flex flex-row justify-content-end align-items-start">
          <div
            className={`text-${contributionNeed.active ? "success" : "muted"
              } me-3 d-flex flex-row justify-content-start align-items-center`}
          >
            {contributionNeed.active ? (
              <i
                className="d-block bg-success rounded-circle"
                style={{ width: ".6em", height: ".6em" }}
              />
            ) : (
              <></>
            )}
            <span
              className="d-block ms-1 text-nowrap"
              style={{ fontSize: "small" }}
            >
              {contributionNeed.active ? "Open to proposals" : "Closed"}
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
      </div>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity,
          imageSize: "3em",
          additionalColumn: inboxView ? (
            <></>
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div
                className={`text-${active ? "success" : "muted"
                  } me-3 d-flex flex-row justify-content-start align-items-center`}
              >
                {active ? (
                  <i
                    className="d-block bg-success rounded-circle"
                    style={{ width: ".6em", height: ".6em" }}
                  />
                ) : (
                  <></>
                )}
                <span
                  className="d-block ms-1 text-nowrap"
                  style={{ fontSize: "small" }}
                >
                  {active ? "Available" : "Not available"}
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
                <i
                  className={`d-block ${isEntity ? "bi-diagram-2" : "bi-person"
                    }`}
                />
                <span className="ms-2">
                  {isEntity ? "Organization" : "Individual contributor"}
                </span>
              </div>
              <Widget src={`${ownerId}/widget/Tags`} props={{ tags }} />
              <Widget
                src={`${ownerId}/widget/DescriptionArea`}
                props={{
                  description:
                    contributor.resume ||
                    entity?.description ||
                    profile.description,
                }}
              />
            </>
          ),
        }}
      />
    </div>
  </div>
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
  </div>
);
