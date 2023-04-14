let questionBlockHeight = props.questionBlockHeight ?? 79932918;
let question = props.question ?? "Testing multiple choice";
let description = props.description ?? "This is a test";
let choicesOptions = props.choicesOptions ?? ["a", "b", "c"];

//You need to do a Social.index call to get all the answers to this question, then count the amounts of votes for each option and the totals
let countVotes = [20, 3, 4];
let amountOfVotes = "30";

function calculatePercentage(votesToThisOption) {
  return (votesToThisOption / amountOfVotes) * 100;
}

const renderOption = (option, index) => {
  return (
    <div>
      <h4>{option}</h4>
      <div className="d-flex">
        <div
          style={{ color: "#000", backgroundColor: "#f1f1f1", width: "90%" }}
        >
          {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
          <div
            style={{
              content: "",
              display: "table",
              clear: "both",
              padding: "0.01em 16px",
              display: "inline-block",
              width: `${calculatePercentage(countVotes[index])}%`,
              textAlign: "center",
              backgroundColor: "lightgray",
            }}
          >
            <span>{calculatePercentage(countVotes[index])}</span>
          </div>
        </div>
        <span style={{ minWidth: "max-content" }}>
          Of {amountOfVotes} votes
        </span>
      </div>
    </div>
  );
};

return (
  <div className="m-2">
    {choicesOptions.map((option, index) => {
      return renderOption(option, index);
    })}
  </div>
);
