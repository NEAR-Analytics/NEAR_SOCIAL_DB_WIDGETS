if (!props.blockHeight) {
  return "Property blockHeight not set";
}

const isPreview = props.isPreview;
const questionBlockHeight = props.blockHeight;
const questions = Social.index("poll_question", "question-v3.0.1");
const question = questions.find((q) => q.blockHeight == questionBlockHeight);

const answers = Social.index("poll_question", "answer-v3.0.1");
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);

let userVote;
function userHasVoted() {
  return (
    answersToThisQuestion.find((a) => a.accountId == context.accountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();

const countVotes = answersToThisQuestion.reduce((acc, curr) => {
  const ans = curr.value.answer;
  const isValidAnswer =
    !isNaN(ans) &&
    Number(ans) >= 0 &&
    Number(ans) < question.value.choicesOptions.length;
  if (isValidAnswer) {
    acc[Number(ans)] += 1;
    return acc;
  } else {
    return acc;
  }
}, new Array(question.value.choicesOptions.length).fill(0));
console.log("C", countVotes);

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
            questionBlockHeight,
          },
        },
        undefined,
        0
      ),
    },
  };
};

//TODO get this data
// let countVotes = [1, 0, 0];

function calculatePercentage(votesToThisOption) {
  if (answersToThisQuestion.length == 0) return 0;
  return (votesToThisOption / answersToThisQuestion.length) * 100;
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
    {question.value.choicesOptions.map((option, index) => {
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
                    hasVoted ? calculatePercentage(countVotes[index]) : 100
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
                  {hasVoted && (
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

          {hasVoted ? (
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
    })}
  </>
);
