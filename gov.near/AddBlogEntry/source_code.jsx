const accountId = context.accountId;

if (!accountId) {
  return "Please log in with NEAR to create a blog post";
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
      <h4>Create a Blog Post</h4>
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
    <CommitButton data={{ post: { entry } }}>Publish</CommitButton>
  </div>
);
