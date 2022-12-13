let blockHeight = props.blockHeight;
// let question = Social.index("poll_question", "question-v3.0.1");
let question = props.value;

function calculatePercentage(votesToThisOption) {
  if (question.answers.length == 0) return 0;
  return (votesToThisOption / question.answers.length) * 100;
}

let countVotes = [];
for (let i = 0; i < question.choicesOptions.length; i++) {
  countVotes.push(0);
}

for (let i = 0; i < question.answers.length; i++) {
  // Any user can post any answer they want. They might post "yes" for example
  const option = Number(question.answers[i].value.answer);
  if (option >= 0 && option < countVotes.length) countVotes[option] += 1;
}

function displayableOptionName(option) {
  if (option.length > 12) {
    return option.slice(0, 12) + "...";
  }
  return option;
}

const renderOption = (option, index) => {
  return (
    <a
      href={`#${context.accountId}/widget/newVotingInterface?blockHeight=${blockHeight}`}
      style={{ textDecoration: "none", color: "black" }}
    >
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
    </a>
  );
};

return (
  <div className="m-2">
    {question.choicesOptions.map((option, index) => {
      return renderOption(option, index);
    })}
  </div>
);
