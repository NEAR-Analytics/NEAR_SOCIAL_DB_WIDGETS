const story = Social.get(`urbanite.near/experimental/stories`);

if (story === null) {
  return "Loading";
}

State.init({ story: story || "" });

return (
  <div>
    <div className="mb-2">
      <h4>User Stories</h4>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.story}
        onChange={(e) => State.update({ note: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { story: state.story } }}>
      Save story
    </CommitButton>
  </div>
);
