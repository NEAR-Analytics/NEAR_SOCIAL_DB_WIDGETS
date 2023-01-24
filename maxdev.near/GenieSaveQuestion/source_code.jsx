State.init({
  questionTitle: "",
  questionContent: "",
  timestamp: Date.now(),
});

if (!context.accountId) {
  return <p>Please log in to ask a question</p>;
}

const questionRef = `${context.accountId}--${Date.now()}`;
return (
  <div className="d-flex flex-column">
    <div className="d-flex flex-column gap-2">
      Title:
      <input
        type="text"
        className="form-control"
        value={state.questionTitle}
        onChange={(e) => {
          State.update({ questionTitle: e.target.value });
        }}
      />
      Content:
      <textarea
        className="form-control"
        value={state.questionContent}
        style={{ height: "5rem" }}
        onChange={(e) => {
          State.update({ questionContent: e.target.value });
        }}
      />
      <CommitButton
        disabled={!state.questionTitle || !state.questionContent}
        className="btn btn-primary"
        onCommit={() => {
          State.update({ questionContent: "", showAskForm: false });
        }}
        onClick={() => {
          State.update({ timestamp: Date.now() });
        }}
        data={{
          neardevs_beta1: {
            questions: {
              [questionRef]: {
                title: state.questionTitle,
                content: state.questionContent,
              },
            },
          },
          index: {
            neardevs_beta1: JSON.stringify({
              key: "asked",
              value: questionRef,
            }),
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
