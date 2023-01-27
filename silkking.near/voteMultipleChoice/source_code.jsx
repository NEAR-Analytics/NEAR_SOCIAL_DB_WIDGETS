if (!props.isPreview && !props.blockHeight) {
  return "Property blockHeight not set";
}
if (!props.isPreview && isNaN(props.blockHeight)) {
  return "Property blockHeight should be a number";
}

State.init({
  vote: userVote ?? [""],
  questions: {},
  answers: {},
});

let bgBlue = "#96C0FF";
let bgRed = "#FFB4B4";
let bgYellow = "#FFE999";
let bgPurple = "#E6C0FF";
let bgGreen = "#96FFE0";
let bgPink = "#FF96B9";
let bgSkyBlue = "#96EAFF";
let bgIndigo = "#96DCD2";

let allBgColors = [
  bgBlue,
  bgRed,
  bgYellow,
  bgPurple,
  bgGreen,
  bgPink,
  bgSkyBlue,
  bgIndigo,
];

let secondaryBgBlue = "#E6F0FF";
let secondaryBgRed = "#FFEDED";
let secondaryBgYellow = "#FFFAE6";
let secondaryBgPurple = "#F9F0FF";
let secondaryBgGreen = "#E6FFF7";
let secondaryBgPink = "#FFE6EE";
let secondaryBgSkyBlue = "#E6FAFF";
let secondaryBgIndigo = "#E6F6F4";

let allSecondaryBgColors = [
  secondaryBgBlue,
  secondaryBgRed,
  secondaryBgYellow,
  secondaryBgPurple,
  secondaryBgGreen,
  secondaryBgPink,
  secondaryBgSkyBlue,
  secondaryBgIndigo,
];

let fontColorBlue = "#003E9C";
let fontColorRed = "#9C2B2B";
let fontColorYellow = "#9C7B03";
let fontColorPurple = "#763E9C";
let fontColorGreen = "#009C6D";
let fontColorPink = "#9C0034";
let fontColorSkyBlue = "#007C9C";
let fontColorIndigo = "#006758";

let allFontColors = [
  fontColorBlue,
  fontColorRed,
  fontColorYellow,
  fontColorPurple,
  fontColorGreen,
  fontColorPink,
  fontColorSkyBlue,
  fontColorIndigo,
];

let secondaryColor = "#E9EBF8";

function getBgColor(index, isPrimary) {
  let allColorsOfThisType =
    state.vote != `${index}` && isPrimary ? allBgColors : allSecondaryBgColors;

  return Number.isInteger((index + 1) / allColorsOfThisType.length)
    ? allColorsOfThisType[0]
    : allColorsOfThisType[
        ((index + 1) / allColorsOfThisType.length -
          Math.trunc((index + 1) / allColorsOfThisType.length)) *
          allColorsOfThisType.length -
          1
      ];
}

function getFontColor(index) {
  return Number.isInteger((index + 1) / allFontColors.length)
    ? allFontColors[0]
    : allFontColors[
        ((index + 1) / allFontColors.length -
          Math.trunc((index + 1) / allFontColors.length)) *
          allFontColors.length -
          1
      ];
}

function getInputStyles(index) {
  return index + "" == state.vote
    ? {
        borderColor: "black",
        backgroundColor: "black",
        width: "1rem",
        marginRight: "0.7rem",
      }
    : {
        width: "1rem",
        marginRight: "0.7rem",
      };
}

// Utility function
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

// Discards answers that were posted after question's end date
function getTimeRelatedValidAnswers(answers) {
  let low = 0;
  let high = answers.length - 1;
  const questionEndTimestamp = questionParams.value.endTimestamp;
  let endBlockTimestamp = getBlockTimestamp(answers[high].blockHeight);
  if (endBlockTimestamp < questionEndTimestamp) return answers;
  // For tries to exceed 50 there should be more than 10e15 answers which will never happen. But if you mess up and make an infinite cycle it will crash. This way it will never be infinite
  let tries = 10;
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

function getOptionRelatedValidAnswers(answers) {
  return answers.filter(
    (a) =>
      0 <= Number(a.value.answer) &&
      Number(a.value.answer) < questionParams.value.choicesOptions.length
  );
}

function getValidAnswers() {
  let validTime = getTimeRelatedValidAnswers(answersToThisQuestion);
  let validOptionAndTime = getOptionRelatedValidAnswers(validTime);
  return validOptionAndTime;
}

const isPreview = props.isPreview;

// Getting question
const questionBlockHeight = Number(props.blockHeight);
const questions = Social.index("poll_question", "question-v3.1.1");

if (JSON.stringify(questions) != JSON.stringify(state.questions)) {
  State.update({ questions: questions });
}

if (!questions) {
  return "Loading";
}
const questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);

// Getting valid answers
const answers = Social.index("poll_question", "answer-v3.1.1");

if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
  State.update({ answers: answers });
}

if (!answers) {
  return "Loading";
}
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
const validAnswersToThisQuestion = getValidAnswers(answersToThisQuestion);

let userVote;
// Getting if user has already voted
const currAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    validAnswersToThisQuestion.find((a) => a.accountId == currAccountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();
const isQuestionOpen =
  questionParams.value.startTimestamp < Date.now() &&
  Date.now() < questionParams.value.endTimestamp;
const canVote = !hasVoted && isQuestionOpen;

// Counting votes to display

const countVotes = validAnswersToThisQuestion.reduce((acc, curr) => {
  let ans = curr.value.answer;
  acc[Number(ans)] += 1;
  return acc;
}, new Array(questionParams.value.choicesOptions.length).fill(0));

const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.1.1",
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
  if (validAnswersToThisQuestion.length == 0) return 0;
  return (
    (votesToThisOption / validAnswersToThisQuestion.length) *
    100
  ).toFixed(2);
}

function getBorderRadious(index) {
  if (index == 0) {
    return "12px 12px 4px 4px";
  } else if (index == questionParams.value.choicesOptions.length - 1) {
    return "4px 4px 12px 12px";
  } else {
    return "4px";
  }
}

function getStyles(index) {
  return !canVote
    ? {
        display: "flex",
        alignContent: "center",
        backgroundColor: `${getBgColor(index, false)}`,
        color: `${getFontColor(index)}`,
        width: "100%",
        margin: "0.3rem 0px",
        height: "2.4rem",
        borderRadius: `${getBorderRadious(index)}`,
        overflow: "hidden",
        position: "relative",
      }
    : {
        appearance: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        margin: "0.4rem 0",
        position: "relative",
      };
}

const isValidInput = () => {
  let result = state.vote != "";
  return result && !isPreview;
};

return (
  <>
    {!isQuestionOpen ? "This question is already closed" : ""}
    {canVote && <p style={{ margin: "0" }}>Make a choice:</p>}
    {questionParams.value.choicesOptions.map((option, index) => {
      return (
        <div>
          <div className="d-flex align-content-center">
            {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
            {!canVote ? (
              <div style={getStyles(index)}>
                <div
                  style={{
                    height: "100%",
                    padding: "0.01em 22px 0.01em 11px",
                    display: "inline-block",
                    width: `${calculatePercentage(countVotes[index])}%`,
                    textAlign: "center",
                    overflow: "visible",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    backgroundColor: `${getBgColor(index, true)}`,
                    borderRadius: "4px",
                  }}
                >
                  <span
                    style={{
                      overflow: "visible",
                      fontWeight: "500",
                      lineHeight: "2.5rem",
                    }}
                  >
                    {option} •
                    <span
                      className="text-secondary"
                      style={{
                        marginLeft: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      ({countVotes[index]} votes)
                    </span>
                  </span>
                </div>
                <span
                  style={{
                    minWidth: "max-content",
                    margin: "0.4rem 0px 0.4rem 0.3rem",
                    fontWeight: "500",
                    position: "absolute",
                    right: "1.7rem",
                  }}
                >
                  {calculatePercentage(countVotes[index])}%
                </span>
              </div>
            ) : (
              <>
                <input
                  className="form-check-input"
                  id={"input" + index}
                  name="selectMultipleChoice"
                  key={index + "-" + state.vote}
                  style={getInputStyles(index)}
                  type="radio"
                  value={index}
                  checked={state.vote == index + ""}
                  onClick={() => State.update({ vote: index + "" })}
                />
                <label for={"input" + index}>{option}</label>
              </>
            )}
          </div>
        </div>
      );
    })}
    {isQuestionOpen ? (
      hasVoted ? (
        <p
          className="text-primary"
          style={{ textAlign: "center", fontWeight: "500" }}
        >
          Voted
        </p>
      ) : state.vote != "" ? (
        <CommitButton
          className="w-100"
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            fontSize: "1rem",
            borderRadius: "9px",
            border: "none",
          }}
          data={getPublicationParams()}
        >
          Vote
        </CommitButton>
      ) : (
        <>
          <button
            className="w-100"
            style={{
              marginTop: "0.5rem",
              padding: "0.5em",
              backgroundColor: "#F2F6FA",
              color: "#B0B3BE",
              fontSize: "1rem",
              borderRadius: "9px",
              border: "none",
            }}
            disabled
          >
            Vote
          </button>
        </>
      )
    ) : (
      ""
    )}
    <p
      style={{
        fontWeight: "500",
        fontSize: "1.1rem",
        color: "#767B8E",
        letterSpacing: "-0.02em",
        marginTop: "0.8rem",
      }}
    >
      {validAnswersToThisQuestion.length} votes
    </p>
  </>
);
