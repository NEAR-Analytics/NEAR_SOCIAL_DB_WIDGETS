State.init({ questionContent: "", timestamp: Date.now() });

if (!context.accountId) {
  return <p>Loading...</p>;
}

// const timestamp = Date.now();

// const votes = Social.index('genie', 'vote');
// const votes = [1, 2, 3];
// return <div>{votes.map((v) => v).join(", ")}</div>;

// const ref = `${context.accountId}/${timestamp}`;
const questionRef = `${context.accountId}--${Date.now()}`;
return (
  <div className="d-flex flex-column gap-3">
    Enter your question:
    <input
      type="text"
      className="form-control"
      value={state.questionContent}
      onChange={(e) => {
        State.update({ questionContent: e.target.value });
      }}
    />
    <div>
      <CommitButton
        onClick={() => {
          State.update({ timestamp: Date.now() });
        }}
        data={{
          experimental: {
            genie: {
              questions: {
                [questionRef]: state.questionContent,
              },
            },
          },
          index: {
            genie: JSON.stringify({
              key: "asked",
              value: questionRef,
            }),
          },
        }}
      >
        Save question
      </CommitButton>
    </div>
  </div>
);
