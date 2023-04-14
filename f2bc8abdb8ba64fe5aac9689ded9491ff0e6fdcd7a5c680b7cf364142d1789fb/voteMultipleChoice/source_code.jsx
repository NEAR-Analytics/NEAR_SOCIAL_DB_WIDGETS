let question = props.question;
let option = props.option;
let index = props.index;
let haveVoted = props.haveVoted;
let userVote = props.userVote;

State.init({
  vote: userVote ?? "",
});

//TODO get this data
let countVotes = [1, 0, 0];

function calculatePercentage(votesToThisOption) {
  return (votesToThisOption / question.value.answers.length) * 100;
}

let styles = haveVoted
  ? { color: "#000", width: "90%" }
  : { color: "#000", width: "100%" };

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
              haveVoted ? calculatePercentage(countVotes[index]) : 100
            }%`,
            textAlign: "center",
            overflow: "visible",
            whiteSpace: "nowrap",
            textAlign: "left",
            backgroundColor: `${
              (haveVoted && thisUserVote == index) || state.vote == index + ""
                ? "rgb(153, 255, 153)"
                : "lightgray"
            }`,
          }}
          onClick={() => !haveVoted && State.update({ vote: index + "" })}
        >
          <span style={{ overflow: "visible", fontWeight: "500" }}>
            {option}
            {haveVoted && (
              <span
                className="text-secondary"
                style={{ marginLeft: "1rem", fontWeight: "400" }}
              >
                ({question.answers.length} votes)
              </span>
            )}
          </span>
        </div>
      </div>
      {haveVoted && (
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

    {haveVoted ? (
      <p
        className="text-primary"
        style={{ textAlign: "center", fontWeight: "500" }}
      >
        Voted
      </p>
    ) : (
      <>{/*TODO replace with commit button*/}</>
    )}
  </div>
);
