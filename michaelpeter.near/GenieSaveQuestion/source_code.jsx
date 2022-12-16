State.init({
  questionTitle: "",
  questionContent: "",
  timestamp: Date.now(),
  showAskForm: false,
});

if (!context.accountId) {
  return <p>Please log in to ask a question</p>;
}

const questionRef = `${context.accountId}--${Date.now()}`;
return (
  <div className="d-flex flex-column">
    <div className="d-flex align-items-center gap-3">
      <i class="bi bi-search" />
      <div class="input-group input-group-lg">
        <input
          type="text"
          placeholder="Your wish is my command"
          className="form-control input-group input-group-lg"
          value={state.questionContent}
        />
      </div>
      <button
        className="btn btn-primary text-nowrap"
        onClick={() => {
          State.update({ showAskForm: true });
        }}
      >
        <div>
          <i class="bi bi-chat" />
          Ask a question
        </div>
      </button>
    </div>
    {state.showAskForm && (
      <div className="pt-5 d-flex flex-column gap-2">
        Title of your question:
        <input
          type="text"
          className="form-control"
          value={state.questionTitle}
          onChange={(e) => {
            State.update({ questionTitle: e.target.value });
          }}
        />
        Content of your question:
        <input
          type="text"
          className="form-control"
          value={state.questionContent}
          onChange={(e) => {
            State.update({ questionContent: e.target.value });
          }}
        />
        <CommitButton
          className="btn btn-primary"
          onCommit={() => {
            State.update({ questionContent: "", showAskForm: false });
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
    )}
  </div>
);
