const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

const tokens = Near.view("v1.pembrock.near", get_tokens, {
  from_index: 0,
  limit: 100,
});

State.init({ note: note || "" });

return (
  <div>
    <div className="mb-2">
      <h3>{tokens}</h3>
      <h2>fff</h2>
      <h4>Notepad</h4>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
      <Markdown text={state.note} />
    </div>
    <CommitButton data={{ experimental: { note: state.note } }}>
      Save note
    </CommitButton>
  </div>
);
