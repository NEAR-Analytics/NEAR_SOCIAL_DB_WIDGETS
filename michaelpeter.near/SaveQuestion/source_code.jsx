State.init({ questionContent: "" });

if (!context.accountId) {
  return <p>Loading...</p>;
}

const timestamp = Date.now();

// const votes = Social.index('genie', 'vote');
// const votes = [1, 2, 3];
// return <div>{votes.map((v) => v).join(", ")}</div>;

const ref = `${context.accountId}/${timestamp}`;
return (
  <div className="d-flex flex-column">
    Enter your question:
    <input
      type="text"
      className="form-control"
      value={state.accountId}
      onChange={(e) => {
        // const accountId = e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, "");
        State.update({ questionContent: `${e.target.value} (${timestamp})` });
      }}
    />
    Q: {state.questionContent}
    <div>
      <CommitButton
        data={{
          experimental: {
            genie: { questions: { [ref]: state.questionContent } },
          },
        }}
      >
        Save question
      </CommitButton>
    </div>
  </div>
);
