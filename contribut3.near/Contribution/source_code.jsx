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
  "final"
);

const currentAccountContribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: accountId },
  "final"
);

if (!contribution) {
  return "Loading...";
}

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { account_id: accountId, entity_id: entityId },
  "final",
  true
);

const finishButton =
  isAuthorized && !contribution.current.end_date ? (
    <div className="card-footer">
      {endDateInput}
      <a
        className="btn btn-outline-primary mb-2"
        onClick={() => {
          const args = {
            entity_id: entityId,
            contributor_id: contributorId,
            end_date: `${new Date(state.endDate).getTime()}`,
          };
          Near.call(ownerId, "finish_contribution", args);
        }}
      >
        Finish
      </a>
    </div>
  ) : null;

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
                props={{ active: entity.status }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Stop contributing",
                      icon: "bi-person-up",
                      id: "stop",
                      onClick: () =>
                        State.update({ contributionFormHidden: false }),
                    },
                    // {
                    //   text: "Invite to contribute",
                    //   icon: "bi-person-plus",
                    // },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `https://near.social/#/${ownerId}/widget/Index?tab=contribution&entityId=${accountId}&contributorId=${contributorId}`,
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
                src={`${ownerId}/widget/ContributionRequestForm`}
                props={{
                  id: `${accountId}ContributionRequestForm`,
                  entity: accountId,
                  hidden: state.contributionFormHidden,
                  onClose: () => State.update({ contributionFormHidden: true }),
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
