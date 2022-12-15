State.init({ questionContent: "", timestamp: Date.now() });

if (!context.accountId) {
  return <p>Please log in to ask a question</p>;
}

const questionRef = `${context.accountId}--${Date.now()}`;
return (
  <div className="d-flex align-items-center gap-3">
    <i class="bi bi-search" />
    <div class="input-group input-group-lg">
      <input
        type="text"
        placeholder="Your wish is my command"
        className="form-control input-group input-group-lg"
        value={state.questionContent}
        onChange={(e) => {
          State.update({ questionContent: e.target.value });
        }}
      />
    </div>
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
        Ask question
      </CommitButton>
    </div>
  </div>
);
