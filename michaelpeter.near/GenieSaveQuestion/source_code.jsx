State.init({ questionContent: "", timestamp: Date.now() });

if (!context.accountId) {
  return <p>Please log in to ask a question</p>;
}

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
        className="btn btn-primary"
        onCommit={() => {
          State.update({ questionContent: "" });
        }}
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
