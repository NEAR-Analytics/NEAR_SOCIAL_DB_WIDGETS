function validateProps(props) {
  let errors = [];
  if (!props.question) errors.push("Props doesn't contain question key");
  if (!props.option) errors.push("Props doesn't contain option key");
  if (!props.index) errors.push("Props doesn't contain index key");
  if (!props.haveVoted) errors.push("Props doesn't contain haveVoted key");
  if (!props.userVote) errors.push("Props doesn't contain userVote key");
  return errors;
}

const propErrors = validateProps(props);
if (propErrors.length > 0) {
  return (
    <>
      {propErrors.map((e) => (
        <div>{e}</div>
      ))}
    </>
  );
}

let question = props.question;
let option = props.option;
let index = props.index;
let haveVoted = props.haveVoted;
let userVote = props.userVote;
let isPreview = props.isPreview;

State.init({
  vote: userVote ?? "",
});

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

//TODO get this data
let countVotes = [1, 0, 0];

function calculatePercentage(votesToThisOption) {
  return (votesToThisOption / question.value.answers.length) * 100;
}

let styles = haveVoted
  ? { color: "#000", width: "90%" }
  : { color: "#000", width: "100%" };

const isValidInput = () => {
  let result = state.vote != "";
  return result && !isPreview;
};

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
              (haveVoted && state.vote == index) || state.vote == index + ""
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
      <CommitButton
        className="my-2 btn btn-primary"
        data={getPublicationParams()}
      >
        Vote
      </CommitButton>
    )}
  </div>
);
