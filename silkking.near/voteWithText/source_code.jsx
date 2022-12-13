if (!props.blockHeight) {
  return "Missing prop blockHeight";
}

let haveVoted = props.haveVoted;
let isPreview = props.isPreview;

State.init({ vote: "", showErrorsInForm: false });

const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.0.1",
          value: {
            answer: state.vote,
            questionBlockHeight: props.blockHeight,
          },
        },
        undefined,
        0
      ),
    },
  };
};

const isValidInput = () => {
  let result = state.vote != "";
  return result && !isPreview;
};

return (
  <div>
    {haveVoted ? (
      <p
        className="text-primary"
        style={{ textAlign: "center", fontWeight: "500" }}
      >
        You have already voted
      </p>
    ) : (
      <div>
        <textarea
          value={state.vote}
          onChange={(e) => State.update({ vote: e.target.value })}
          style={{ width: "100%" }}
        />
        {isValidInput() ? (
          <CommitButton
            className="my-2 btn btn-primary"
            data={getPublicationParams()}
          >
            Done
          </CommitButton>
        ) : (
          <button
            className="my-2 btn btn-primary"
            onClick={() => State.update({ showErrorsInForm: true })}
          >
            Done
          </button>
        )}
      </div>
    )}
  </div>
);
