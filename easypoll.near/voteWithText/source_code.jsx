State.init({ vote: "", showErrorsInForm: false, questions: {}, answers: {} });

if (!props.isPreview && !props.blockHeight) {
  return "Property blockHeight not set";
}

let widgetOwner = "easypoll.near";

// Utility function
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

function getQuestion(blockHeight) {
  const questions = Social.index("poll_question", "question-v3.1.0");

  if (JSON.stringify(questions) != JSON.stringify(state.questions)) {
    State.update({ questions: questions });
  }
  if (!questions) {
    return "Loading";
  }
  return questions.find((q) => q.blockHeight == blockHeight);
}

// Discards answers that were posted after question's end date
function getTimeRelatedValidAnswers(answers) {
  const questionParams = getQuestion(props.blockHeight);
  let low = 0;
  let high = answers.length - 1;
  const questionEndTimestamp = questionParams.value.endTimestamp;
  let endBlockTimestamp = getBlockTimestamp(answers[high].blockHeight);
  if (endBlockTimestamp < questionEndTimestamp) return answers;
  // For tries to exceed 50 there should be more than 10e15 answers which will never happen. But if you mess up and make an infinite cycle it will crash. This way it will never be infinite
  let tries = 50;
  while (high - low > 1 && tries > 0) {
    tries--;
    let curr = Math.floor((high - low) / 2) + low;
    let currBlockTimestamp = getBlockTimestamp(answers[curr].blockHeight);
    if (currBlockTimestamp < questionEndTimestamp) {
      low = curr;
    } else {
      high = curr;
    }
  }
  // Slice ignores the index of the last one. Since high - low == 1, high = low + 1
  return answers.slice(0, high);
}

let isPreview = props.isPreview;
const questionBlockHeight = props.blockHeight;

const answers = Social.index("poll_question", "answer-v3.1.0");

if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
  State.update({ answers: answers });
}

if (!answers) {
  return "Loading";
}
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
const onTimeAnswersToThisQuestion = getTimeRelatedValidAnswers(
  answersToThisQuestion
);

let usersThatAlreadyReplied = [];
let validAnswersToThisQuestion = onTimeAnswersToThisQuestion.filter((a) => {
  const didUserAlreadyVoted = usersThatAlreadyReplied.includes(a.accountId);
  if (!didUserAlreadyVoted) {
    usersThatAlreadyReplied.push(a.accountId);
  }
  return !didUserAlreadyVoted;
});

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
          key: "answer-v3.1.0",
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
  return validAnswersToThisQuestion.map((answer) => {
    return (
      <div style={{ maxWidth: "45%" }}>
        <Widget
          src={`${widgetOwner}.near/widget/answer_poll-comment-container`}
          props={{ blockHeight: answer.blockHeight }}
        />
      </div>
    );
  });
};

return (
  <div>
    {hasVoted ? (
      <div className="d-flex justify-content-between flex-wrap">
        {renderAnswers()}
      </div>
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
    <p
      style={{
        fontWeight: "500",
        fontSize: "1.1rem",
        color: "#767B8E",
        letterSpacing: "-0.02em",
        marginTop: "0.8rem",
      }}
    >
      {validAnswersToThisQuestion.length} votes
    </p>
  </div>
);
