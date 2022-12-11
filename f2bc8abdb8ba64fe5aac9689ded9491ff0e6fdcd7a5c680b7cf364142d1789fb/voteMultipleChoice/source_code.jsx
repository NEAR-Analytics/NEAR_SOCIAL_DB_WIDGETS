let question = props.question;
let option = props.option;
let index = props.index;

let styles = userHaveVoted()
  ? { color: "#000", width: "90%" }
  : { color: "#000", width: "100%" };

return (
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
            userHaveVoted() ? calculatePercentage(countVotes[index]) : 100
          }%`,
          textAlign: "center",
          overflow: "visible",
          whiteSpace: "nowrap",
          textAlign: "left",
          backgroundColor: `${
            (userHaveVoted() && thisUserVote == index) ||
            state.vote == index + ""
              ? "rgb(153, 255, 153)"
              : "lightgray"
          }`,
        }}
        onClick={() => !userHaveVoted && State.update({ vote: index + "" })}
      >
        <span style={{ overflow: "visible", fontWeight: "500" }}>
          {option}
          {userHaveVoted() && (
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
    {userHaveVoted() && (
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
);
