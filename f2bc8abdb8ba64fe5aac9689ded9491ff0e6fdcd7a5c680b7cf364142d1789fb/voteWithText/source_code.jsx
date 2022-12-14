if (!props.isPreview && !props.blockHeight) {
  return "Property blockHeight not set";
}

let isPreview = props.isPreview;
const questionBlockHeight = props.blockHeight;
State.init({ vote: "", showErrorsInForm: false });

const answers = Social.index("poll_question", "answer-v3.0.1");
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);

let userVote;
const loggedAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    answersToThisQuestion.find((a) => a.accountId == loggedAccountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();

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

const renderAnswers = () => {
  return answsers.map((answer) => {
    return (
      <Widget
        src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answer_poll-coment-container"
        props={{ comment, answerTimeStamp, accountId }}
      />
    );
  });
};

return (
  <div>
    {hasVoted ? (
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
        {renderAnswers()}
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
