const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;

if (!entityId || !contributorId) {
  return "Cannot show contribution without entity and contributor ID!";
}

State.init({
  finishFormHidden: true,
});

const contribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: contributorId },
  "final",
  true
);

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: entityId },
  "final"
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { entity_id: entityId, account_id: context.accountId },
  "final"
);

const contributions = Near.view(
  ownerId,
  "get_entity_contributions",
  { account_id: entityId },
  "final"
);

const [founder] = Object.keys(contributions ?? {}).filter((contribution) => {
  const details = contributions[contribution];
  const all = [...details.history, details.current];
  return all.some((detail) => detail.description === "");
});

const profile = Social.getr(`${entityId}/profile`);

const controls = isAuthorized ? (
  <div className="d-flex flex-column justify-content-start align-items-stretch">
    <a
      className="btn btn-danger me-2 text-light"
      style={{ width: "13em" }}
      onClick={() => State.update({ finishFormHidden: false })}
    >
      <i className="bi-slash-circle" />
      <span className="text-nowrap">Stop contribution</span>
    </a>
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
) : (
  <></>
);

const body = (
  <div className="px-3">
    <div className="d-flex flex-row justify-content-start" id={entityId}>
      <div className="flex-grow-1 py-3">
        <Widget
          src={`${ownerId}/widget/ProfileLine`}
          props={{
            accountId: contributorId,
            isEntity: false,
            imageSize: "4em",
            update: props.update,
            additionalColumn: controls,
            additionalRow: (
              <>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <span className="text-muted me-2">
                    From{" "}
                    {new Date(
                      Number(contribution.current.start_date)
                    ).toLocaleDateString()}
                  </span>
                  {!!contribution.curre.end_date ? (
                    <span>
                      To{" "}
                      {new Date(
                        Number(contribution.current.end_date)
                      ).toLocaleDateString()}
                    </span>
                  ) : (
                    <></>
                  )}
                  <Widget
                    src={`${ownerId}/widget/ActiveIndicator`}
                    props={{ active: !contribution.current.end_date }}
                  />
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <span className="me-2">
                    contributed{" "}
                    {typeof contribution.current.contribution_type === "string"
                      ? contribution.current.contribution_type
                      : contribution.current.contribution_type.Other}{" "}
                    to
                  </span>
                  <Widget
                    src={`${ownerId}/widget/ProfileLine`}
                    props={{
                      accountId: entityId,
                      isEntity: true,
                      imageSize: "2em",
                      update: props.update,
                    }}
                  />
                </div>
              </>
            ),
          }}
        />
      </div>
    </div>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: contribution.current.description }}
    />
  </div>
);

const content = contribution.history.map(
  ({ description, contribution_type, need, start_date, end_date }, index) => (
    <Widget
      src={`${ownerId}/widget/ContributionDetail`}
      props={{
        need,
        entityId,
        description,
        contributionType:
          typeof contribution_type === "string"
            ? contribution_type
            : contribution_type.Other,
        startDate: start_date,
        endDate: end_date,
      }}
      key={index}
    />
  )
);

return (
  <div>
    <div className="mb-5">{body}</div>
    <div className="d-flex flex-row justify-content-between ps-3">
      {contentSelector}
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
