const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet to create an event";
}

State.init({
  Event: { title: "", description: "" },
  img: {},
  done: false,
});

const Event = {
  title: state.event.title,
  description: state.event.description,
  image: {},
};

return (
  <div className="row mb-3">
    <div>
      <h4>Create an Event</h4>
    </div>
    <div className="mb-2">
      Title <span className="text-secondary"></span>
      <input
        type="text"
        value={state.title}
        onChange={(e) => {
          State.update({ title: e.target.value });
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
      Date <span className="text-secondary"></span>
      <input
        type="text"
        value={state.date}
        onChange={(e) => {
          State.update({ date: e.target.value });
        }}
      />
    </div>
    <div className="mb-2">
      Time <span className="text-secondary"></span>
      <input
        type="text"
        value={state.time}
        onChange={(e) => {
          State.update({ time: e.target.value });
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
    {state.done && !hasEvent && (
      <div className="alert alert-success">Success!</div>
    )}
  </div>
);
