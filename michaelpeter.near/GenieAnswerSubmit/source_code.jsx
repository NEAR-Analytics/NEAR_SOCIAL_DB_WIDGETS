State.init({ answerContent: "" });

const { questionRef } = props;

if (!questionRef) {
  return "No question ref provided";
}

return (
  <div className="d-flex flex-row gap-1">
    <input
      type="text"
      className="form-control"
      value={state.answerContent}
      onChange={(e) => {
        State.update({ answerContent: e.target.value });
      }}
    />
    <CommitButton
      className="btn btn-primary col-2"
      onCommit={() => {
        State.update({ answerContent: "" });
      }}
      data={{
        experimental: {
          genie: {
            answers: {
              [questionRef]: state.answerContent,
            },
          },
        },
        index: {
          genie: JSON.stringify({
            key: "answered1",
            value: questionRef,
          }),
        },
      }}
    >
      Submit answer
    </CommitButton>
  </div>
);
