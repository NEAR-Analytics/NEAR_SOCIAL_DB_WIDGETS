const stories = Social.get(`urbanite.near/experimental/stories`);

if (stories === null) {
  return "Loading";
}

State.init({ stories: stories || "" });

return (
  <div>
    <div className="mb-2">
      <h4>User Stories</h4>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.stories}
        onChange={(e) => State.update({ stories: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { stories: state.stories } }}>
      Save stories
    </CommitButton>
  </div>
);
