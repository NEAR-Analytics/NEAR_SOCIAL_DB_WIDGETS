const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;
const accountId = context.accountId;

State.init({
  endDate: new Date().toLocaleDateString(),
});

if (!entityId || !contributorId) {
  return "Cannot show contribution without entity ID or contributor ID!";
}

const contribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: contributorId },
  "final",
  true
);

if (!contribution) {
  return "Loading...";
}

const isAuthorized =
  Near.view(
    ownerId,
    "check_is_manager_or_higher",
    { account_id: accountId, entity_id: entityId },
    "final",
    true
  ) ||
  Near.view(
    ownerId,
    "check_is_manager_or_higher",
    { account_id: accountId, entity_id: contributorId },
    "final",
    true
  ) ||
  accountId === contributorId;

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
          update: props.update,
          additionalColumn: inboxView ? (
            <></>
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{ active: !!contribution.end_date }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Stop contribution",
                      icon: "bi-person-up",
                      id: "stop",
                      onClick: () => State.update({ finishFormHidden: false }),
                    },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `https://near.social/#/${ownerId}/widget/Index?tab=contribution&entityId=${entityId}&contributorId=${contributorId}`,
                      onClick: () => props.update && props.update("entity"),
                    },
                    {
                      text: "Share",
                      icon: "bi-arrow-up-right",
                      id: "share",
                    },
                  ],
                }}
              />
              <Widget
                src={`${ownerId}/widget/ContributionForm`}
                props={{
                  id: `${entityId}${contributorId}ContributionForm`,
                  entityId: entityId,
                  contributorId: contributorId,
                  hidden: state.finishFormHidden,
                  onClose: () => State.update({ finishFormHidden: true }),
                }}
              />
            </div>
          ),
          additionalRow: (
            <>
              <Widget
                src={`${ownerId}/widget/ProfileLine`}
                props={{ accountId: founder, update: props.update }}
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
