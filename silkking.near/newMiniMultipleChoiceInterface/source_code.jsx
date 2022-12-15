if (!props.blockHeight) {
  return "Property blockHeight not set";
}

// Utility function. Consider moving it to an utility widget
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

// Discards answers that were posted after question's end date. Consider moving to utility widget
function getTimeRelatedValidAnswers(answers) {
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

const questionBlockHeight = Number(props.blockHeight);
const questions = Social.index("poll_question", "question-v3.0.1");
if (!questions) {
  return "Loading";
}
const questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);
State.init({ vote: "", showErrorsInForm: false });

const answers = Social.index("poll_question", "answer-v3.0.1");
if (!answers) {
  return "Loading";
}
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
let usersWithAnswersToThisQuestion = [];
let validAnswersToThisQuestion = answersToThisQuestion.filter((a) => {
  const didUserAlreadyAnswered = usersWithAnswersToThisQuestion.includes(
    a.accountId
  );
  if (!didUserAlreadyAnswered) {
    usersWithAnswersToThisQuestion.push(a.accountId);
  }
  return !didUserAlreadyAnswered;
});
validAnswersToThisQuestion = getTimeRelatedValidAnswers(
  validAnswersToThisQuestion
);

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisQuestion.length == 0) return 100;
  return (votesToThisOption / validAnswersToThisQuestion.length) * 100;
}

const currAccId = context.accountId ?? "";
const userHasVoted = validAnswersToThisQuestion.find(
  (a) => a.accountId == currAccId
);
const isQuestionOpen =
  questionParams.value.startTimestamp < Date.now() &&
  Date.now() < questionParams.value.endTimestamp;
const displayAnswers = userHasVoted || !isQuestionOpen;

let countVotes = new Array(questionParams.value.choicesOptions.length).fill(0);
countVotes = !userHasVoted
  ? countVotes
  : validAnswersToThisQuestion.reduce((acc, curr) => {
      const ans = curr.value.answer;
      const isValidAnswer =
        !isNaN(ans) &&
        Number(ans) >= 0 &&
        Number(ans) < questionParams.value.choicesOptions.length;
      if (isValidAnswer) {
        acc[Number(ans)] += 1;
        return acc;
      } else {
        return acc;
      }
    }, countVotes);

function displayableOptionName(option) {
  if (option.length > 20) {
    return option.slice(0, 20) + "...";
  }
  return option;
}

const renderOption = (option, index) => {
  return (
    <div className="d-flex">
      <div style={{ color: "#000", width: "90%" }}>
        {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
        <div
          style={{
            margin: "0.3rem 0px",
            content: "",
            display: "table",
            clear: "both",
            padding: "0.01em 16px",
            display: "inline-block",
            width: `${calculatePercentage(countVotes[index])}%`,
            textAlign: "center",
            overflow: "visible",
            whiteSpace: "nowrap",
            textAlign: "left",
            backgroundColor: "lightgray",
          }}
        >
          <span style={{ overflow: "visible", fontWeight: "500" }}>
            {displayableOptionName(option)}
            <span
              className="text-secondary"
              style={{ marginLeft: "1rem", fontWeight: "400" }}
            >
              {displayAnswers && `(${countVotes[index]} votes)`}
            </span>
          </span>
        </div>
      </div>
      <span
        style={{
          minWidth: "max-content",
          marginLeft: "0.3rem",
          fontWeight: "500",
        }}
      >
        {displayAnswers && `${calculatePercentage(countVotes[index])}%`}
      </span>
    </div>
  );
};

return (
  <div className="m-2">
    {questionParams.value.choicesOptions.map((option, index) => {
      return renderOption(option, index);
    })}
  </div>
);
