if (!props.isPreview && !props.blockHeight) {
  return "Property blockHeight not set";
}
if (!props.isPreview && isNaN(props.blockHeight)) {
  return "Property blockHeight should be a number";
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

function getOptionRelatedValidAnswers(answers) {
  return answers.filter(
    (a) =>
      0 <= Number(a.value.answer) &&
      Number(a.value.answer) < questionParams.value.choicesOptions.length
  );
}

function getValidAnswers() {
  let validTime = getTimeRelatedValidAnswers(answersToThisQuestion);
  let validOptionAndTime = getOptionRelatedValidAnswers(validTime);
  return validOptionAndTime;
}

const isPreview = props.isPreview;

// Getting question
const questionBlockHeight = Number(props.blockHeight);
const questions = Social.index("poll_question", "question-v3.0.1");
const questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);

// Getting valid answers
const answers = Social.index("poll_question", "answer-v3.0.1");
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
const validAnswersToThisQuestion = getValidAnswers(answersToThisQuestion);
console.log(1, validAnswersToThisQuestion);

let userVote;
// Getting if user has already voted
const currAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    validAnswersToThisQuestion.find((a) => a.accountId == currAccountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();

// Counting votes to display

const countVotes = validAnswersToThisQuestion.reduce((acc, curr) => {
  let ans = curr.value.answer;
  acc[Number(ans)] += 1;
  return acc;
}, new Array(questionParams.value.choicesOptions.length).fill(0));

State.init({
  vote: userVote ?? "",
});

const isQuestionOpen =
  questionParams.value.startTimestamp < Date.now() &&
  Date.now() < questionParams.value.endTimestamp;

const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.0.1",
          value: {
            answer: state.vote,
            questionBlockHeight,
          },
        },
        undefined,
        0
      ),
    },
  };
};

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisQuestion.length == 0) return 0;
  return (votesToThisOption / validAnswersToThisQuestion.length) * 100;
}

let styles = hasVoted
  ? { color: "#000", width: "90%" }
  : { color: "#000", width: "100%" };

const isValidInput = () => {
  let result = state.vote != "";
  return result && !isPreview;
};

return (
  <>
    {!isQuestionOpen ? "This question is already closed" : ""}
    {questionParams.value.choicesOptions.map((option, index) => {
      return (
        <div>
          <div className="d-flex">
            <div style={styles}>
              {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
              <div
                style={{
                  margin: "0.3rem 0px",
                  content: "",
                  display: "table",
                  clear: "both",
                  padding: "0.01em 16px",
                  display: "inline-block",
                  width: `${
                    hasVoted || !isQuestionOpen
                      ? calculatePercentage(countVotes[index])
                      : 100
                  }%`,
                  textAlign: "center",
                  overflow: "visible",
                  whiteSpace: "nowrap",
                  textAlign: "left",
                  backgroundColor: `${
                    (hasVoted && state.vote == index) ||
                    state.vote == index + ""
                      ? "rgb(153, 255, 153)"
                      : "lightgray"
                  }`,
                }}
                onClick={() => !hasVoted && State.update({ vote: index + "" })}
              >
                <span style={{ overflow: "visible", fontWeight: "500" }}>
                  {option}
                  {(hasVoted || !isQuestionOpen) && (
                    <span
                      className="text-secondary"
                      style={{ marginLeft: "1rem", fontWeight: "400" }}
                    >
                      ({countVotes[index]} votes)
                    </span>
                  )}
                </span>
              </div>
            </div>
            {hasVoted && (
              <span
                style={{
                  minWidth: "max-content",
                  margin: "0.3rem 0px 0.3rem 0.3rem",
                  fontWeight: "500",
                }}
              >
                {calculatePercentage(countVotes[index])}%
              </span>
            )}
          </div>

          {isQuestionOpen ? (
            hasVoted ? (
              <p
                className="text-primary"
                style={{ textAlign: "center", fontWeight: "500" }}
              >
                Voted
              </p>
            ) : (
              <CommitButton
                className="my-2 btn btn-primary"
                data={getPublicationParams()}
              >
                Vote
              </CommitButton>
            )
          ) : (
            ""
          )}
        </div>
      );
    })}
  </>
);
