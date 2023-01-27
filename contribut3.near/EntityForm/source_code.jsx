const ownerId = "contribut3.near";
const accountId = props.accountId ?? "";
const kind = props.kind ? [{ name: props.kind }] : [];
const startDate = props.startDate ?? "";
const forbiddenIds = new Set(
  (Near.view(ownerId, "get_entities", {}, "final", true) ?? []).map(
    ([accountId]) => accountId
  )
);

initState({
  accountId,
  accountIdValid: true,
  kind,
  startDate,
});

const allKinds = ["Project", "Organization", "DAO"].map((name) => ({ name }));

const accountIdInput = (
  <div className="col-lg-12  mb-2">
    <Widget
      src={`${ownerId}/widget/ValidatedAccountIdInput`}
      props={{
        label: "Account ID of entity:",
        value: state.accountId,
        update: (accountId, accountIdValid) =>
          State.update({ accountId, accountIdValid }),
        forbiddenIds,
      }}
    />
  </div>
);

const kindInput = (
  <div className="col-lg-6  mb-2">
    Type of entity:
    <Typeahead
      labelKey="name"
      onChange={(kind) => State.update({ kind })}
      options={allKinds}
      placeholder="Project, Organization or DAO"
      selected={state.kind}
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
  if (!state.accountIdValid) {
    return;
  }

  const args = {
    account_id: state.accountId,
    kind: state.kind[0].name,
    start_date: `${new Date(state.startDate).getTime()}`,
  };

  Near.call(ownerId, "add_entity", args);
};

const header = <div className="card-header">Create an entity</div>;

const body = (
  <div className="card-body">
    <div className="row">
      {accountIdInput}
      {kindInput}
      {startDateInput}
    </div>

    <a
      className={`btn ${
        !state.accountIdValid ? "btn-secondary" : "btn-primary"
      } mb-2`}
      onClick={onSubmit}
    >
      Submit
    </a>
  </div>
);

const footer = state.accountIdValid ? (
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
          kind: state.kind[0].name,
          start_date: `${new Date(state.startDate).getTime()}`,
        },
      }}
    />
  </div>
) : null;

return (
  <div className="card">
    {header}
    {body}
    {footer}
  </div>
);
