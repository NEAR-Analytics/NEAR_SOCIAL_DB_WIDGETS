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

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

const EntityInput = styled.div`
  margin-bottom: 0.5em;
`;

const SelectedEntity = styled.div`
  border-radius: 4px;
  background-color: #f2f4f7;
  height: 5em;
`;

const entityEditor = (
  <EntityInput>
    <Label htmlFor="enity-id">Contribute to:</Label>
    {props.entity ? (
      <SelectedEntity id="entity-id">
        <Widget
          src={`${ownerId}/widget/ProfileLine`}
          props={{
            accountId: props.entity,
            imageSize: "4em",
            isEntity: true,
          }}
        />
      </SelectedEntity>
    ) : (
      <Typeahead
        id="entity-id"
        labelKey="name"
        onChange={(entity) => State.update({ entity })}
        options={state.existingEntities}
        placeholder="social.near, contribut3.near"
        selected={state.entity}
        positionFixed
      />
    )}
  </EntityInput>
);

const InputWrapper = styled.div`
  margin-bottom: 0.5em;
`;

const descriptionDiv = (
  <InputWrapper>
    <Label htmlFor="description">Details:</Label>
    <textarea
      id="description"
      value={state.description}
      type="text"
      rows={6}
      // className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
    {/* <Widget */}
    {/*   src={`${ownerId}/widget/DescriptionInput`} */}
    {/*   props={{ */}
    {/*     description: state.description, */}
    {/*     text: "Details:", */}
    {/*     update: (description) => State.update({ description }), */}
    {/*   }} */}
    {/* /> */}
  </InputWrapper>
);

const contributionTypeInput = (
  <InputWrapper>
    <Label htmlFor="contribution-type">Contribution type:</Label>
    <Typeahead
      id="contribution-type"
      labelKey="name"
      onChange={(contributionType) => State.update({ contributionType })}
      options={state.types}
      placeholder="Development, Investment, Legal..."
      selected={state.contributionType}
      positionFixed
      multiple={false}
      allowNew
    />
    {/* <Widget */}
    {/*   src={`${ownerId}/widget/ContributionTypeInput`} */}
    {/*   props={{ */}
    {/*     contributionType: state.contributionType, */}
    {/*     update: (contributionType) => State.update({ contributionType }), */}
    {/*     allContributionTypes: state.types, */}
    {/*   }} */}
    {/* /> */}
  </InputWrapper>
);

return (
  <Widget
    src={`${ownerId}/widget/Modal`}
    props={{
      title: "Propose contribution",
      confirmText: (
        <>
          <i>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_778_24981)">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M8.74952 11.25L17.4995 2.50002M8.85584 11.5234L11.0459 17.1551C11.2389 17.6512 11.3353 17.8993 11.4743 17.9717C11.5948 18.0345 11.7384 18.0345 11.859 17.9719C11.998 17.8997 12.0948 17.6517 12.2883 17.1558L17.7803 3.08269C17.955 2.63504 18.0423 2.41121 17.9945 2.26819C17.953 2.14398 17.8556 2.04651 17.7314 2.00501C17.5883 1.95723 17.3645 2.04458 16.9169 2.21927L2.84373 7.71122C2.34784 7.90474 2.09989 8.0015 2.02763 8.14059C1.96499 8.26116 1.96508 8.4047 2.02786 8.5252C2.10028 8.66421 2.34834 8.76067 2.84446 8.95361L8.47613 11.1437C8.57684 11.1829 8.62719 11.2024 8.66959 11.2327C8.70717 11.2595 8.74004 11.2924 8.76685 11.3299C8.79709 11.3723 8.81667 11.4227 8.85584 11.5234Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_778_24981">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </i>
          <span>Send proposal</span>
        </>
      ),
      onConfirm: onSubmit,
      hidden: props.hidden,
      onClose: props.onClose,
      body: (
        <>
          {entityEditor}
          {contributionTypeInput}
          {descriptionDiv}
        </>
      ),
      id,
    }}
  />
);
