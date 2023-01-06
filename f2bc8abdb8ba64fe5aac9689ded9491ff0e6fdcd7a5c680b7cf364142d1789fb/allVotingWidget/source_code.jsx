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
  showErrorsInForm: false,
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

let widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

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
  const questionEndTimestamp = pollParams.value.endTimestamp;
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
      Number(a.value.answer) < pollParams.value.choicesOptions.length
  );
}

function getValidAnswers() {
  let validTime = getTimeRelatedValidAnswers(answersToThisPoll);
  let validOptionAndTime = getOptionRelatedValidAnswers(validTime);
  return validOptionAndTime;
}

const isPreview = props.isPreview ?? false;

// Getting question
const questionBlockHeight = Number(props.blockHeight);
const questions = Social.index("poll_question", "question-v3.1.0");

if (JSON.stringify(questions) != JSON.stringify(state.questions)) {
  State.update({ questions: questions });
}

if (!questions) {
  return "Loading";
}
const pollParams = questions.find((q) => q.blockHeight == questionBlockHeight);

// Getting valid answers
const answers = Social.index("poll_question", "answer-v3.1.0");

if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
  State.update({ answers: answers });
}

if (!answers) {
  return "Loading";
}
const answersToThisPoll = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
const validAnswersToThisPoll = getValidAnswers(answersToThisPoll);

let userVote;
// Getting if user has already voted
const currAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    validAnswersToThisPoll.find((a) => a.accountId == currAccountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();
const isQuestionOpen =
  pollParams.value.startTimestamp < Date.now() &&
  Date.now() < pollParams.value.endTimestamp;
const canVote = !hasVoted && isQuestionOpen;

// Counting votes to display

//TODO check if this needs to consider the type of votes (Multiselect might be broking it since it have an array of strings instead of a single string)
function countVotes(questionNumber) {
  return validAnswersToThisPoll.reduce((acc, curr) => {
    let ans = curr.value.answers[questionNumber];
    acc[Number(ans)] += 1;
    return acc;
  }, new Array(pollParams.value.choicesOptions.length).fill(0));
}

const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.1.0",
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

//TODO check this
function isVoteValid() {
  let voteValid = true && state.vote.length == questionParams.questions.length;
  for (let i = 0; i < questionParams.questions.length; i++) {
    voteValid =
      (voteValid &&
        questionParams.quesitons.questionType == "2" &&
        state.vote[i].filter((a) => a != "").length > 0) ||
      (questionParams.questions.questionType != "2" && state.vote[i] != "");
  }
  return voteValid;
}

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisPoll.length == 0) return 0;
  return ((votesToThisOption / validAnswersToThisPoll.length) * 100).toFixed(2);
}

function getBorderRadious(index) {
  if (index == 0) {
    return "12px 12px 4px 4px";
  } else if (index == pollParams.value.choicesOptions.length - 1) {
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

const renderAnswers = (questionNumber) => {
  return validAnswersToThisPoll.map((answer) => {
    return (
      <div style={{ maxWidth: "45%" }}>
        <Widget
          src={`${widgetOwner}.near/widget/answer_poll-comment-container`}
          props={{ blockHeight: answer.blockHeight, questionNumber }}
        />
      </div>
    );
  });
};

function clickSelectionInputHandler(e) {
  return () => {
    let newVote = state.vote;

    if (questionParams.questionType[questionNumber] == "2") {
      if (e.target.checked) {
        let newRealVotes = [];

        for (let i = 0; i < newVote[questionNumber].length; i++) {
          if (i != index) {
            newRealVotes.push(newVote[questionNumber][i]);
          }
          newVote[questionNumber] = newRealVotes;
        }
      } else {
        newVote[questionNumber].push(index + "");
      }
    } else {
      newVote[questionNumber] = index + "";
    }
    State.update({ vote: newVote });
  };
}

const renderMultipleChoiceVotingInterface = (
  questionParams,
  questionNumber
) => {
  return (
    <>
      {canVote && <p style={{ margin: "0" }}>Make a choice:</p>}
      {questionParams.choicesOptions.map((option, index) => {
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
                      width: `${calculatePercentage(
                        countVotes(questionNumber)[index]
                      )}%`,
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
                        ({countVotes(questionNumber)[index]} votes)
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
                    {calculatePercentage(countVotes(questionNumber)[index])}%
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
                    type={
                      questionParams.questionType[questionNumber] == "2"
                        ? "checkbox"
                        : "radio"
                    }
                    value={index}
                    checked={
                      questionParams.questionType[questionNumber] == "2"
                        ? state.vote[questionNumber].includes(index + "")
                        : state.vote[questionNumber] == index + ""
                    }
                    onClick={clickSelectionInputHandler(e)}
                  />
                  <label for={`input-${questionNumber}-${index}`}>
                    {option}
                  </label>
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

const renderTextVotingInterface = (questionNumber) => {
  return (
    <div>
      {hasVoted ? (
        <div className="d-flex justify-content-between flex-wrap">
          {renderAnswers(questionNumber)}
        </div>
      ) : (
        <div>
          <textarea
            value={state.vote[questionNumber]}
            onChange={(e) => {
              let newVote = state.vote;
              newVote[questionNumber] = e.target.value;

              State.update({ vote: newVote });
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

return (
  <>
    {!isQuestionOpen && "This poll is not open"}
    {pollParams.value.questions.map((questionParams, questionNumber) => {
      questionParams.questionType != "3"
        ? renderMultipleChoiceVotingInterface(questionParams, questionNumber)
        : renderTextVotingInterface(questionNumber);
    })}
    {isQuestionOpen ? (
      hasVoted ? (
        <p
          className="text-primary"
          style={{ textAlign: "center", fontWeight: "500" }}
        >
          Voted
        </p>
      ) : isVoteValid() ? (
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
            className="my-2 btn btn-primary"
            onClick={() => State.update({ showErrorsInForm: true })}
          >
            Done
          </button>
          {state.showErrorsInForm && (
            <span className="text-danger">Please answer all the questions</span>
          )}
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
      {validAnswersToThisPoll.length} votes
    </p>
  </>
);
