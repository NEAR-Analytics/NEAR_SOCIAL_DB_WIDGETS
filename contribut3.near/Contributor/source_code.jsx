const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

const contributor = isPreview
  ? props.contributor
  : Near.view(
    ownerId,
    "get_contributor",
    { account_id: accountId },
    "final",
    true
  );

if (!contributor) {
  return isPreview
    ? "You must provide a contributor object in preview mode"
    : "Loading...";
}

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final",
  true
);

const isEntity = !!entity;
const active = contributor.looking_for_work;

const profile = Social.getr(`${accountId}/profile`);

const mapType = (contributionType) => {
  if (typeof contributionType === "object") {
    return contributionType.Other;
  }

  return contributionType;
};

const contributionTypes = contributor.contribution_types;

if ("Other" in contributionTypes) {
  contributionTypes[contributionTypes.Other] = "";
  delete contributionTypes.Other;
}

const tags = { ...contributor.skills, ...contributionTypes } || profile.tags;

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
              className={`text-${active ? "success" : "muted"
                } me-3 d-flex flex-row`}
            >
              <i className={active ? "bi-circle-fill" : ""} />
              <span className="ms-1">
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
                className={`d-block ${isEntity ? "bi-diagram-2" : "bi-person"}`}
              />
              <span className="ms-2">
                {isEntity ? "Organization" : "Individual contributor"}
              </span>
            </div>
            <Widget
              src={`${ownerId}/widget/Tags`}
              props={{
                tags,
              }}
            />
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
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
  </div>
);
