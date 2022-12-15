State.init({ questionContent: "", timestamp: Date.now() });

if (!context.accountId) {
  return <p>Loading...</p>;
}

// const timestamp = Date.now();

// const votes = Social.index('genie', 'vote');
// const votes = [1, 2, 3];
// return <div>{votes.map((v) => v).join(", ")}</div>;

// const ref = `${context.accountId}/${timestamp}`;
return (
  <div className="d-flex flex-column">
    Enter your question:
    <input
      type="text"
      className="form-control"
      value={state.accountId}
      onChange={(e) => {
        State.update({ questionContent: e.target.value });
      }}
    />
    Q: {state.questionContent}
    <div>
      <CommitButton
        onClick={() => {
          State.update({ timestamp: Date.now() });
        }}
        data={{
          experimental: {
            genie: {
              questions: {
                [`${context.accountId}--${Date.now()}`]: state.questionContent,
              },
            },
          },
        }}
      >
        Save question
      </CommitButton>
    </div>
  </div>
);
