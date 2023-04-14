const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet to create an activity";
}

State.init({
  name: "",
  description: "",
  cost: null,
  participants_lo: null,
  participants_hi: null,
  deadline: null,
});

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
      Available until <span className="text-secondary"></span>
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
        data={{
          post: {
            title: state.title,
            description: state.description,
            date: state.date,
            time: state.time,
          },
        }}
        onCommit={() => {
          State.update({
            title: "",
            description: "",
            date: "",
            time: "",
            done: true,
          });
        }}
      >
        Create
      </CommitButton>
    </div>
    <hr />
  </div>
);
