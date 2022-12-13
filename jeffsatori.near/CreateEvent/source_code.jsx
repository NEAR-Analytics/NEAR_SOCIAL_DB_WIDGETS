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
      <h4>What is your event?</h4>
    </div>
    <div className="mb-2">
      Title <span className="text-secondary"></span>
      <input
        type="text"
        value={state.event.title}
        onChange={(e) => {
          State.update({ Event });
        }}
      />
    </div>
    <div className="mb-2">
      Description <span className="text-secondary"></span>
      <input
        type="text"
        value={state.event.description}
        onChange={(e) => {
          State.update({ Event });
        }}
      />
    </div>
    <div className="mb-2">
      Date and time of event <span className="text-secondary"></span>
      <input
        type="text"
        value={state.event.description}
        onChange={(e) => {
          State.update({ Event });
        }}
      />
    </div>
    <div className="mb-2">
      <CommitButton
        data={{ post: { event } }}
        onCommit={() => {
          State.update({
            Event: { title: "", description: "" },
            img: {},
            done: true,
          });
        }}
      >
        Save
      </CommitButton>
    </div>
    <hr />
    {state.done && !hasEvent && (
      <div className="alert alert-success">Success!</div>
    )}
  </div>
);
