const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const token = Near.view("v1.pembrock.near", "get_tokens", {
  from_index: 0,
  limit: 100,
});

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

return (
  <div className="d-flex ">
    <div className="ml-2">
      <div className="mb-2">
        <h4>Notepad</h4>
        <textarea
          type="text"
          rows={10}
          className="form-control"
          value={state.note}
          onChange={(e) => State.update({ note: e.target.value })}
        />
      </div>

      <CommitButton data={{ experimental: { note: state.note } }}>
        Save note
      </CommitButton>
    </div>

    <div>
      <Markdown text={state.note} />
    </div>
  </div>
);
