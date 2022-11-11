const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new blog entry";
}

initState({
  title: "",
  content: "",
});

const entry = {
  title: state.title,
  content: state.content,
};

const handleChange = (event) => {
  State.update({ content: event.target.value });
};

return (
  <div className="row mb-3">
    <div>
      <h4>Post a blog entry</h4>
    </div>
    <div className="mb-2">
      Title
      <input type="text" value={state.title} />
    </div>
    <div className="mb-2">
      <textarea
        cols="70"
        rows="25"
        value={state.content}
        onChange={handleChange}
      />
    </div>
    <CommitButton data={{ post: { entry } }}>Post blog entry</CommitButton>
  </div>
);
