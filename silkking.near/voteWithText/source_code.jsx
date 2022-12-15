if (!props.isPreview && !props.blockHeight) {
  return "Property blockHeight not set";
}

// Utility function
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

// Discards answers that were posted after question's end date
function getTimeRelatedValidAnswers(answers) {
  let low = 0;
  let high = answers.length - 1;
  const questionEndTimestamp = questionParams.value.endTimestamp;
  let endBlockTimestamp = getBlockTimestamp(answers[high].blockHeight);
  if (endBlockTimestamp < questionEndTimestamp) return answers;
  // For tries to exceed 50 there should be more than 10e15 answers which will never happen. But if you mess up and make an infinite cycle it will crash. This way it will never be infinite
  let tries = 10;
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
State.init({ vote: "", showErrorsInForm: false });

const answers = Social.index("poll_question", "answer-v3.0.1");
if (answers) {
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
  console.log(2, validAnswersToThisQuestion);
  return validAnswersToThisQuestion.map((answer) => {
    return (
      <Widget
        src="silkking.near/widget/answer_poll-comment-container"
        props={{ blockHeight: answer.blockHeight }}
      />
    );
  });
};
console.log(1);
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
    {renderAnswers()}
  </div>
);
