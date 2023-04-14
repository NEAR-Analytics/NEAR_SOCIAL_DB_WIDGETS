const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = context.accountId;

if (!entityId) {
  return "Cannot show invite without entityId or contributorId!";
}

const invite = Near.view(
  ownerId,
  "get_invite",
  { entity_id: entityId, contributor_id: contributorId },
  "final"
);

const descriptionArea = <Markdown text={invite.description} />;

const controls = (
  <div className="d-flex flex-column justify-content-start align-items-stretch">
    <a
      className="btn btn-success"
      onClick={() =>
        Near.call(ownerId, "accept_invite", {
          account_id: entityId,
        })
      }
    >
      <i className="bi-check" />
      <span>Accept</span>
    </a>
    <a
      className="btn btn-outline-danger mt-2 d-flex flex-row justify-content-center"
      style={{ minWidth: "7em" }}
      onClick={() =>
        Near.call(ownerId, "reject_contribution", {
          entity_id: entityId,
          contributor_id: contributorId,
        })
      }
    >
      <i className="bi-x" />
      <span>Reject</span>
    </a>
  </div>
);

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
          additionalText: (
            <b>
              {contributionRequest.need
                ? "sent a proposal to your request"
                : "wants to contribute to your project"}
            </b>
          ),
          additionalColumn: controls,
          additionalRow: (
            <>
              <Widget
                src={`${ownerId}/widget/ProfileLine`}
                props={{
                  accountId: founder,
                  update: props.update,
                  imageSize: contributionRequest.need ? "1.5em" : "2em",
                }}
              />
              {contributionRequest.need ? (
                <b>
                  Looking for {need.contribution_type}: {need.description}
                </b>
              ) : (
                <></>
              )}
              <div className="mt-2 ps-2 border-start border-3 border-info">
                <Widget
                  src={`${ownerId}/widget/DescriptionArea`}
                  props={{
                    description: contributionRequest.description,
                  }}
                />
              </div>
            </>
          ),
        }}
      />
    </div>
  </div>
);

return (
  <div className="card border-0" style={{ backgroundColor: "#f0f9ff" }}>
    <div className="px-3 py-0">{body}</div>
  </div>
);
