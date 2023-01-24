const ownerId = "contribut3.near";

initState({
  // The entity to which to request a contribution.
  entity: props.entity ?? { name: "" },
  // The description of the contribution request.
  description: props.description ?? "",
});

const onClick = () => {
  const args = {
    entity_id: state.entity.name,
    description: state.description,
  };

  Near.call(ownerId, "request_contribution", args);
};

const setEntity = ([entity]) => {
  State.update({ entity });
};

const existingEntities = (
  Near.view(ownerId, "get_entities", {}, "final") ?? []
).map(([accountId]) => ({ name: accountId }));

const entityEditor = (
  <div className="col-lg-12  mb-2">
    Entity:
    <Typeahead
      labelKey="name"
      onChange={setEntity}
      options={existingEntities}
      placeholder="social.near, contribut3.near"
      selected={[state.entity]}
      positionFixed
    />
  </div>
);

const descriptionDiv = (
  <div className="col-lg-12  mb-2">
    Description:
    <br />
    <textarea
      value={state.description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
  </div>
);

return (
  <div className="card">
    <div className="card-header">Request contribution</div>

    <div className="card-body">
      <div className="row">
        {entityEditor}
        {descriptionDiv}
      </div>

      <a className="btn btn-outline-primary mb-2" onClick={onClick}>
        Submit
      </a>
    </div>
    <div className="card-footer">
      Preview:
      <Widget
        src={`${ownerId}/widget/ContributionRequest`}
        props={{
          isPreview: true,
          id: 0, // irrelevant
          contributorId: context.accountId,
          entityId: state.entity.name,
          contributionRequest: {
            entity: state.entity,
            description: state.description,
          },
        }}
      />
    </div>
  </div>
);
