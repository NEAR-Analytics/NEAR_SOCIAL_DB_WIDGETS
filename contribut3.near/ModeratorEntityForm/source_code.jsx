const ownerId = "contribut3.near";
const accountId = { name: props.accountId ?? "" };

const kind = { name: props.kind ?? "" };
const entityStatus = {
  name: props.status ?? "",
};
const startDate = props.startDate ?? "";
const endDate = props.endDate ?? "";
const existing = accountId.name
  ? Near.view(ownerId, "get_entity", { account_id: accountId.name }, "final")
  : null;

initState({
  fixed: !!props.accountId,
  accountId,
  kind,
  entityStatus,
  startDate,
  endDate,
  existing,
  updated: false,
});

const allKinds = ["Project", "Organization", "DAO"].map((name) => ({ name }));
const allStatuses = ["Active", "Flagged"].map((name) => ({ name }));
const allAccountIds = (
  Near.view(ownerId, "get_entities", {}, "final", true) ?? []
).map(([name]) => ({ name }));

const accountIdInput = (
  <div className="col-lg-12 mb-2">
    Account ID of entity:
    <Typeahead
      labelKey="name"
      onChange={([accountId]) => State.update({ accountId, updated: true })}
      options={allAccountIds}
      placeholder="contribut3.near, social.near..."
      selected={[state.accountId]}
      positionFixed
      disabled={state.fixed}
    />
  </div>
);

const kindInput = (
  <div className="col-lg-6  mb-2">
    Type of entity:
    <Typeahead
      labelKey="name"
      onChange={([kind]) => State.update({ kind, updated: true })}
      options={allKinds}
      placeholder="Project, Organization or DAO"
      selected={[state.kind]}
      positionFixed
    />
  </div>
);

const statusInput = (
  <div className="col-lg-6  mb-2">
    Status of entity:
    <Typeahead
      labelKey="name"
      onChange={([entityStatus]) =>
        State.update({ entityStatus, updated: true })
      }
      options={allStatuses}
      placeholder="Active or Flagged"
      selected={[state.entityStatus]}
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
      onChange={(e) =>
        State.update({ startDate: e.target.value, updated: true })
      }
    />
  </div>
);

const endDateInput = (
  <div className="col-lg-6 mb-2">
    End date of entity
    <input
      type="date"
      value={state.endDate}
      onChange={(e) => State.update({ endDate: e.target.value, updated: true })}
    />
  </div>
);

const onSubmit = () => {
  const args = {
    account_id: state.accountId,
    entity: {
      status: state.entityStatus.name,
      kind: state.kind.name,
      start_date: `${new Date(state.startDate).getTime()}`,
      end_date: `${new Date(state.endDate).getTime()}`,
    },
  };

  Near.call(ownerId, "set_entity", args);
};

const header = (
  <div className="card-header">
    {state.fixed ? "Update" : "Edit/Create"} an entity
  </div>
);

const body = (
  <div className="card-body">
    <div className="row">
      {accountIdInput}
      {kindInput}
      {statusInput}
      {startDateInput}
      {endDateInput}
    </div>

    <a className="btn btn-outline-primary mb-2" onClick={onSubmit}>
      Submit
    </a>
  </div>
);

const footer = (
  <div className="card-footer">
    Preview:
    <Widget
      src={`${ownerId}/widget/Entity`}
      props={{
        isPreview: true,
        id: 0, // irrelevant
        accountId: state.accountId.name,
        notStandalone: true,
        entity: state.updated
          ? {
              kind: state.kind.name,
              status: state.entityStatus.name,
              start_date: `${new Date(state.startDate).getTime()}`,
              end_date: `${new Date(state.endDate).getTime()}`,
            }
          : state.existing,
      }}
    />
  </div>
);

return (
  <div className="card">
    {header}
    {body}
    {footer}
  </div>
);
