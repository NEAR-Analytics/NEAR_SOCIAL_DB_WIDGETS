const ownerId = "contribut3.near";
const id = props.id;
const need = props.need ?? null;

const convertType = (contributionType) => {
  if (
    state.allContributionTypes.some(
      ({ name }) => name === contributionType.name
    )
  ) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

State.init({
  // The entity to which to request a contribution.
  entity: props.entity ? [{ name: props.entity }] : [],
  // The description of the contribution request.
  description: props.description ?? "",
  contributionType: props.contributionType
    ? [{ name: props.contributionType }]
    : [],
  existingEntities: [],
  types: [],
});

const onSubmit = () => {
  const args = {
    entity_id: state.entity[0].name,
    description: state.description,
    contribution_type: convertType(state.contributionType[0]),
    need,
  };

  Near.call(ownerId, "request_contribution", args);
};

if (state.existingEntities.length === 0) {
  Near.asyncView(ownerId, "get_entities", {}, "final", false).then((entities) =>
    State.update({ existingEntities: entities.map((name) => ({ name })) })
  );
}

if (state.types.length === 0) {
  Near.asyncView(ownerId, "get_contribution_types", {}, "final", false).then(
    (types) => State.update({ types: types.map((name) => ({ name })) })
  );
}

const entityEditor = props.entity ? (
  <div>
    <label htmlFor="account-id" className="text-muted fw-semibold">
      Contribute to:
    </label>
    <div
      className="rounded-3 bg-light"
      style={{ height: "5em" }}
      id="account-id"
    >
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{ accountId: props.entity, imageSize: "4em", isEntity: true }}
      />
    </div>
  </div>
) : (
  <div className="col-lg-12  mb-2">
    <label htmlFor="enity-id">Contribute to:</label>
    <Typeahead
      id="entity-id"
      labelKey="name"
      onChange={(entity) => State.update({ entity })}
      options={state.existingEntities}
      placeholder="social.near, contribut3.near"
      selected={state.entity}
      positionFixed
    />
  </div>
);

const descriptionDiv = (
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

const contributionTypeInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/ContributionTypeInput`}
      props={{
        contributionType: state.contributionType,
        update: (contributionType) => State.update({ contributionType }),
        allContributionTypes: state.types,
      }}
    />
  </div>
);

const body = (
  <div className="row">
    {entityEditor}
    {contributionTypeInput}
    {descriptionDiv}
  </div>
);

return (
  <Widget
    src={`${ownerId}/widget/Modal`}
    props={{
      title: "Propose contribution",
      confirmText: (
        <>
          <i className="bi-send" />
          <span>Send proposal</span>
        </>
      ),
      onConfirm: onSubmit,
      hidden: props.hidden,
      onClose: props.onClose,
      body,
      id,
    }}
  />
);
