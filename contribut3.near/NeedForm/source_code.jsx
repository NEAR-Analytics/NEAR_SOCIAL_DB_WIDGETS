const ownerId = "contribut3.near";
const accountId = props.accountId;
const contributionType = props.contributionType
  ? [{ name: props.contributionType }]
  : [];
const allContributionTypes = (
  Near.view(ownerId, "get_contribution_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const convertType = (contributionType) => {
  if (allContributionTypes.some(({ name }) => name === contributionType.name)) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

State.init({
  contributionType: [],
  entityId: accountId ? [{ name: accountId }] : [],
  description: "",
});

const entityIdInput = (
  <Widget
    src={`${ownerId}/widget/AdminEntityAccountIdInput`}
    props={{
      update: (entityId) => {
        State.update({ entityId });
        Near.asyncView(
          ownerId,
          "get_entity_invites",
          { account_id: entityId[0].name },
          "final"
        ).then((invites) =>
          State.update({
            forbiddenIds: new Set(Object.keys(invites)),
          })
        );
      },
      accountId: context.accountId,
      selected: state.entityId,
    }}
  />
);

const contributionTypeInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/ContributionTypeInput`}
      props={{
        contributionType: state.contributionType,
        update: (contributionType) => State.update({ contributionType }),
        allContributionTypes,
      }}
    />
  </div>
);

const descriptionInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/DescriptionInput`}
      props={{
        description: state.description,
        text: "Details:",
        update: (description) => State.update({ description }),
      }}
    />
  </div>
);

const onSubmit = () => {
  if (state.contributionType.length !== 1 || state.description.length === 0) {
    return;
  }

  const args = {
    entity_id: accountId,
    description: state.description,
    contribution_type: convertType(state.contributionType[0]),
  };

  Near.call(ownerId, "post_contribution_need", args);
};

const header = <div className="card-header">Post need</div>;

const body = (
  <div className="card-body">
    <div className="row">
      {entityIdInput}
      {contributionTypeInput}
      {descriptionInput}
    </div>

    <a
      className={`btn ${state.contributionType.length !== 1 || state.description.length === 0
          ? "btn-secondary"
          : "btn-primary"
        } mb-2`}
      onClick={onSubmit}
    >
      Post
    </a>
  </div>
);

const footer = (
  <div className="card-footer">
    Preview:
    {state.accountIdValid ? (
      <Widget
        src={`${ownerId}/widget/Need`}
        props={{
          isPreview: true,
          accountId: state.accountId,
          contributionNeed: {
            description: state.description,
            contribution_type: convertType(state.contributionType[0]),
            active: true,
          },
        }}
      />
    ) : null}
  </div>
);

return (
  <div className="card">
    {header}
    {body}
    {footer}
  </div>
);
