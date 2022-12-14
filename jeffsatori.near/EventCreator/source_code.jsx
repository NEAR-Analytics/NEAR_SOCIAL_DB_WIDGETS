const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet to create an event";
}

State.init({
  Event: { title: "", description: "", date: "", time: "" },
  img: {},
  done: false,
});

const Event = {
  title: state.Event.title,
  description: state.Event.description,
  image: {},
};

return (
  <div className="row mb-3">
    <div>
      <h4>Create an Event</h4>
    </div>
    <div className="mb-2">
      Title <span className="text-secondary"></span>
      <input type="text" value={state.Event.title} />
    </div>
    <div className="mb-2">
      Description <span className="text-secondary"></span>
      <input type="text" value={state.Event.description} />
    </div>
    <div className="mb-2">
      Date <span className="text-secondary"></span>
      <input type="text" value={state.Event.Date} />
    </div>
    <div className="mb-2">
      Time <span className="text-secondary"></span>
      <input type="text" value={state.Event.Time} />
    </div>
    <div className="mb-2">
      <CommitButton
        data={{ post: { Event } }}
        onCommit={() => {
          State.update({
            Event: { title: "", description: "", Date: "" },
            img: {},
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
    {(hasEvent || !props.noPrevEvent) && (
      <Widget
        src="jeffsatori.near/widget/EventCreator"
        props={{ Event: hasEvent ? event : undefined }}
      />
    )}
  </div>
);
