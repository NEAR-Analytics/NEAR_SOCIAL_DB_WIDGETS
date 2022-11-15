const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new blog entry";
}

initState({
  question: "",
});

const entry = {
  question: state.question,
};

const handleChange = (event) => {
  State.update({ content: event.target.value });
};

let qId = Date.now() + accountId;

return (
  <div className="row mb-3">
    <div>
      <h4>Make question</h4>
    </div>
    <input className="mb-2" value={state.question} />

    <CommitButton
      data={{
        post: {
          poll_question: {
            question: entry.question,
          },
        },
      }}
    >
      Submit
    </CommitButton>
  </div>
);
