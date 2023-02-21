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

const [[founder]] = (contributions ?? []).filter((contribution) => {
  const [_, details] = contribution;
  const all = [...details.history, details.current];
  return all.some((detail) => detail.description === "");
});

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em" }}
  >
    <div className="flex-grow-1 py-3">
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
                <i className={entity.status ? "bi-play" : "bi-x"} />
                <span className="ms-1">{entity.status}</span>
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
              <Widget
                src={`${ownerId}/widget/ProfileLine`}
                props={{ accountId: founder }}
              />
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
  </div>
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
  </div>
);
