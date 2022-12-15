const accountId = context.accountId;
const CONTRACT = "event_org.near";
if (!accountId) {
  return "Please connect your NEAR wallet to create an activity";
}

function callContract(data) {
  Near.call(CONTRACT, "start_event", {
    account_id: accountId,
    event_spec: {
      max_num: Number(data.participants_hi),
      min_num: Number(data.participants_lo),
      price: Number(data.cost) * 1000,
      deadline: Date.parse(data.deadline) * 1000000,
      beneficiary: accountId,
    },
  });
}

return (
  <div className="row mb-3">
    <div>
      <h4>Plan a group activity on Near Social!</h4>
    </div>
    <div className="mb-2">
      Event Name <span className="text-secondary"></span>
      <input
        type="text"
        value={state.name}
        onChange={(e) => {
          State.update({ name: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      Description <span className="text-secondary"></span>
      <input
        type="text"
        value={state.description}
        onChange={(e) => {
          State.update({ description: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      Cost per participant <span className="text-secondary"></span>
      <input
        type="number"
        value={state.cost}
        onChange={(e) => {
          State.update({ cost: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      Min participants <span className="text-secondary"></span>
      <input
        type="number"
        value={state.participants_lo}
        onChange={(e) => {
          State.update({ participants_lo: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      Max participants <span className="text-secondary"></span>
      <input
        type="number"
        value={state.participants_hi}
        onChange={(e) => {
          State.update({ participants_hi: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      Joinable until <span className="text-secondary"></span>
      <input
        type="date"
        value={state.deadline}
        onChange={(e) => {
          State.update({ deadline: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      <CommitButton
        data={
          {
            // event: {
            //   name: state.name,
            //   description: state.description,
            //   cost: state.cost,
            //   participants_lo: state.participants_lo,
            //   participants_hi: state.participants_hi,
            //   deadline: state.deadline,
            // },
          }
        }
        onCommit={() => {
          callContract(state);
        }}
      >
        Create
      </CommitButton>
    </div>
    <hr />
  </div>
);
