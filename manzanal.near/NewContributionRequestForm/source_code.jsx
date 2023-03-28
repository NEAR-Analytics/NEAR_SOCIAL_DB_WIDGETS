const ownerId = "contribut3.near";

State.init({
  // The entity to which to request a contribution.
  entity: props.entity ? [{ name: props.entity }] : [],
  title: "",
  description: "",
  files: [],
  tags: [],
  contributionType: props.contributionType
    ? [{ name: props.contributionType }]
    : [],
  paymentSource: "",
  budget: undefined,
  specifyBudget: false,
  deadline: undefined,
  specifyDeadline: false,
});
const getEntities = () => {
  const result = Near.view(ownerId, "get_entities", {}, "final");
  console.log("entities", result);
  return result;
};
const existingEntities = Object.values(getEntities() ?? {}).map((name) => ({
  name,
}));
const tagsMetadata = Social.getr(
  `${accountId}/${appName}/${state.contractId}`,
  "final"
);

const renderEntity = (
  <div className="col-lg-12  mb-2">
    <label htmlFor="enity-id">Request as *</label>
    <Typeahead
      id="entity-id"
      labelKey="name"
      onChange={(entity) => State.update({ entity })}
      options={existingEntities}
      placeholder="social.near, contribut3.near"
      selected={state.entity}
      positionFixed
      renderMenuItemChildren={(option, { text }) => (
        <Widget
          src={`manzanal.near/widget/EntityOneLineProfile`}
          props={{
            accountId: option.name,
          }}
        />
      )}
    />
  </div>
);

const descriptionDiv = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/DescriptionInput`}
      props={{
        description: state.description,
        text: "Description",
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
        allContributionTypes,
      }}
    />
  </div>
);
const renderTitle = (
  <div>
    <label htmlFor="title">Title *</label>
    <input
      type="text"
      id="title"
      placeholder="Looking for a Rust developer to create a smart contract"
      value={state.title}
      onChange={({ target }) => State.update({ title: target.value })}
    />
  </div>
);
const renderTagSelection = (
  <div className="mb-2" style={{ minHeight: "62px" }}>
    {metadata !== null ? (
      <Widget
        src={"mob.near/widget/MetadataEditor"}
        key={`public-tags-metadata-${state.contractId}`}
        props={{
          initialMetadata: metadata,
          onChange: (metadata) => {
            State.update({ metadata });
          },
          options: {
            tags: {
              label: "Tags",
              pattern,
              placeholder: "defi, staking",
            },
          },
        }}
      />
    ) : (
      "Loading"
    )}
  </div>
);
const Heading3 = styled.div`
    font-family: 'Space Grotesk';
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;
`;
return (
  <div className="row">
    <Heading3>Request details</Heading3>
    <div>
      {renderEntity}
      {renderTitle}
      {descriptionDiv}
      {renderTagSelection}
    </div>
  </div>
);
