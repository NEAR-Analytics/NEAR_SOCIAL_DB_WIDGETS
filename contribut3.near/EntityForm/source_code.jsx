const ownerId = "contribut3.near";
const accountId = props.accountId ?? "";
const kind = { name: props.kind ?? "" };
const startDate = props.startDate ?? "";

initState({
  accountId,
  kind,
  startDate,
});

const allKinds = ["Project", "Organization", "DAO"].map((name) => ({ name }));

const accountIdInput = (
  <div className="col-lg-12  mb-2">
    Account ID of entity:
    <input
      type="text"
      value={state.accountId}
      onChange={(event) => State.update({ accountId: event.target.value })}
    />
  </div>
);

const kindInput = (
  <div className="col-lg-6  mb-2">
    Type of entity:
    <Typeahead
      labelKey="name"
      onChange={([kind]) => State.update({ kind })}
      options={allKinds}
      placeholder="Project, Organization or DAO"
      selected={[state.kind]}
      positionFixed
    />
  </div>
);

const startDateInput = (
  <div className="col-lg-6 mb-2">
    Start date of entity
    <input
      type="date"
      value={state.startDate}
      onChange={(e) => State.update({ startDate: e.target.value })}
    />
  </div>
);

const onSubmit = () => {
  const args = {
    account_id: state.accountId,
    kind: state.kind.name,
    start_date: `${new Date(state.startDate).getTime()}`,
  };

  Near.call(ownerId, "add_entity", args);
};

return (
  <div className="card">
    <div className="card-header">Create an entity</div>

    <div className="card-body">
      <div className="row">
        {accountIdInput}
        {kindInput}
        {startDateInput}
      </div>

      <a className="btn btn-outline-primary mb-2" onClick={onSubmit}>
        Submit
      </a>
    </div>
    <div className="card-footer">
      Preview:
      <Widget
        src={`${ownerId}/widget/Entity`}
        props={{
          isPreview: true,
          id: 0, // irrelevant
          accountId: state.accountId,
          notStandalone: true,
          entity: {
            entity: state.entity,
            kind: state.kind.name,
            start_date: `${new Date(state.startDate).getTime()}`,
          },
        }}
      />
    </div>
  </div>
);
