const ownerId = "maxdev.near";
State.init({ answerContent: "" });

const { questionRef } = props;

if (!questionRef) {
  return "No question ref provided";
}

return (
  <div className="d-flex flex-row gap-1">
    <textarea
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
        neardevs_beta1: {
          answers: {
            [questionRef]: state.answerContent,
          },
        },
        index: {
          neardevs_beta1: JSON.stringify({
            key: `answered/${questionRef}`,
            value: 1,
          }),
        },
      }}
    >
      Submit answer
    </CommitButton>
  </div>
);
