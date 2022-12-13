if (!props.blockHeight) {
  return "Property blockHeight not set";
}

const questionBlockHeight = props.blockHeight;
const questions = Social.index("poll_question", "question-v3.0.1");
const questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);
State.init({ vote: "", showErrorsInForm: false });

const answers = Social.index("poll_question", "answer-v3.0.1");
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
let usersWithAnswersToThisQuestion = [];
const validAnswersToThisQuestion = answersToThisQuestion.filter((a) => {
  const didUserAlreadyAnswered = usersWithAnswersToThisQuestion.includes(
    a.accountId
  );
  if (!didUserAlreadyAnswered) {
    usersWithAnswersToThisQuestion.push(a.accountId);
  }
  return !didUserAlreadyAnswered;
});

console.log(1, validAnswersToThisQuestion);

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisQuestion.length == 0) return 0;
  return (votesToThisOption / validAnswersToThisQuestion.length) * 100;
}

const countVotes = answersToThisQuestion.reduce((acc, curr) => {
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
}, new Array(questionParams.value.choicesOptions.length).fill(0));

console.log(1, countVotes);

function displayableOptionName(option) {
  if (option.length > 12) {
    return option.slice(0, 12) + "...";
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
              ({countVotes[index]} votes)
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
        {calculatePercentage(countVotes[index])}%
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
