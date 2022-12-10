let question = props.question ?? {
  title: "Multiple choice test",
  tgLink: "",
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  choicesOptions: ["a", "b", "c"],
  question: "Testing multiple choice",
  description: "",
  questionBlockHeight: 79932918,
  startDate: Date.now(),
  endDate: Date.now() + 10000000,
  storingTimestamp: Date.now(),
  questionType: "1",
  answers: [
    {
      accountId:
        "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      answer: "0",
      timeStamp: Date.now(),
    },
  ],
};

function calculatePercentage(votesToThisOption) {
  return (votesToThisOption / question.answers.length) * 100;
}

let countVotes = [];
for (let i = 0; i < question.choicesOptions.length; i++) {
  countVotes.push(0);
}

for (let i = 0; i < question.answers.length; i++) {
  countVotes[Number(question.answers[i].answer)] += 1;
}

function displayableOptionName(option) {
  if (option.length > 12) {
    return option.slice(0, 12) + "...";
  }
  return option;
}

const renderOption = (option, index) => {
  return (
    <div>
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
            <span style={{ overflow: "visible" }}>
              {displayableOptionName(option)}
              <span className="text-secondary" style={{ marginLeft: "1rem" }}>
                ({question.answers.length} votes)
              </span>
            </span>
          </div>
        </div>
        <span style={{ minWidth: "max-content", marginLeft: "0.3rem" }}>
          {calculatePercentage(countVotes[index])}%
        </span>
      </div>
    </div>
  );
};

return (
  <div className="m-2">
    {question.choicesOptions.map((option, index) => {
      return renderOption(option, index);
    })}
  </div>
);
