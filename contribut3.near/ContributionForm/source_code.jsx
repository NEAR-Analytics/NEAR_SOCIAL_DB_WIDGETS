const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;
const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

State.init({
  endDate: props.endDate ?? createDate(),
});

const onSubmit = () => {
  const args = {
    entity_id: entityId,
    contributor_id: contributorId,
    end_date: `${new Date(state.endDate).getTime()}`,
  };

  Near.call(ownerId, "finish_contribution", args);
};

const existingEntities = (
  Near.view(ownerId, "get_entities", {}, "final") ?? []
).map(([accountId]) => ({ name: accountId }));

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
      options={existingEntities}
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
        allContributionTypes,
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
