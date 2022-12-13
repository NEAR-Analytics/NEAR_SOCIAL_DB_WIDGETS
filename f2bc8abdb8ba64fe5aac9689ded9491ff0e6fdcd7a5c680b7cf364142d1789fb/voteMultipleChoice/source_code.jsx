if (!props.blockHeight) {
  return "Property blockHeight not set";
}
if (isNaN(props.blockHeight)) {
  return "Property blockHeight should be a number";
}

const isPreview = props.isPreview;
const questionBlockHeight = Number(props.blockHeight);
const questions = Social.index("poll_question", "question-v3.0.1");
const questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);

const answers = Social.index("poll_question", "answer-v3.0.1");
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);

let userVote;
const currAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    answersToThisQuestion.find((a) => a.accountId == currAccountId) != undefined
  );
}
let hasVoted = userHasVoted();

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

State.init({
  vote: userVote ?? "",
});

const isQuestionOpen =
  questionParams.value.startTimestamp < Date.now() &&
  Date.now() < questionParams.value.endTimestamp;
console.log(1, isQuestionOpen);

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
