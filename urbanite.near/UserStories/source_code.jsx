const note = Social.get(`urbanite.near/experimental/stories`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

return (
  <div>
    <div className="mb-2">
      <h4>User Stories</h4>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { note: state.note } }}>
      Save story
    </CommitButton>
  </div>
);
