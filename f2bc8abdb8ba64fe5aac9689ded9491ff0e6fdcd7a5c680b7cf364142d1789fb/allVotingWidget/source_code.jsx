if (!props.isPreview && !props.poll) {
  return "Property poll not set";
}

const isPreview = props.isPreview ?? false;

// Getting question
const poll = props.poll;

let defaultVotes = [];
for (let i = 0; i < poll.value.questions.length; i++) {
  if (poll.value.questions[i].questionType == "2") {
    defaultVotes.push([""]);
  } else {
    defaultVotes.push("");
  }
}

State.init({
  vote: userVote ?? defaultVotes,
  answers: {},
  showErrorsInForm: false,
  hoveringElement: "",
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

function getInputStyles(questionType, questionNumber, optionNumber) {
  if (questionType == "2") {
    return state.vote[questionNumber].includes(optionNumber + "")
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
  } else {
    return optionNumber + "" == state.vote[questionNumber]
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
  const questionEndTimestamp = poll.value.endTimestamp;
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

//TODO review this since new poll structure breake the function
function getOptionRelatedValidAnswers(answers) {
  return answers.filter((a) => {
    // console.log(a);
    0 <= Number(a.value.answer) &&
      Number(a.value.answer) < poll.value.choicesOptions.length;
  });
}

function getValidAnswers() {
  let validTime = getTimeRelatedValidAnswers(answersToThisPoll);
  let validOptionAndTime = getOptionRelatedValidAnswers(validTime);
  return validOptionAndTime;
}

// Getting valid answers
const answers = Social.index("poll_question", "answer-v3.1.0");

if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
  State.update({ answers: answers });
}

if (!state.answers) {
  return "Loading";
}
const answersToThisPoll = state.answers.filter(
  (a) => a.value.questionBlockHeight == props.poll.blockHeight
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
  poll.value.startTimestamp < Date.now() &&
  Date.now() < poll.value.endTimestamp;
const canVote = !hasVoted && isQuestionOpen;

// Counting votes to display

//TODO check if this needs to consider the type of votes (Multiselect might be broking it since it have an array of strings instead of a single string)
function countVotes(questionNumber, questionType) {
  return validAnswersToThisPoll.reduce((acc, curr) => {
    let ans = curr.value.answers[questionNumber];
    acc[Number(ans)] += 1;
    return acc;
  }, new Array(pollParams.value.choicesOptions.length).fill(0));
}

//TODO review this
const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.1.0",
          value: {
            answer: state.vote,
            questionBlockHeight: props.poll.blockHeight,
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
  let voteValid = true && state.vote.length == poll.value.questions.length;
  for (let i = 0; i < poll.value.questions.length; i++) {
    voteValid =
      (voteValid &&
        poll.value.quesitons.questionType == "2" &&
        state.vote[i].filter((a) => a != "").length > 0) ||
      (poll.value.questions.questionType != "2" && state.vote[i] != "");
  }
  return voteValid;
}

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisPoll.length == 0) return 0;
  return ((votesToThisOption / validAnswersToThisPoll.length) * 100).toFixed(2);
}

function getBorderRadious(optionNumber) {
  if (optionNumber == 0) {
    return "12px 12px 4px 4px";
  } else if (optionNumber == poll.value.choicesOptions.length - 1) {
    return "4px 4px 12px 12px";
  } else {
    return "4px";
  }
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

function clickRadioInputHandler(questionNumber, optionNumber) {
  return () => {
    let newVote = state.vote;

    newVote[questionNumber] = optionNumber + "";
    State.update({ vote: newVote });
  };
}

function clickCheckboxInputHandler(questionNumber, optionNumber) {
  return () => {
    let newVote = state.vote;

    let oldQuestionVotes = newVote[questionNumber];
    let newQuestionVotes = [];

    if (!oldQuestionVotes.includes(optionNumber + "")) {
      newQuestionVotes = oldQuestionVotes;
      newQuestionVotes.push(optionNumber + "");
    } else {
      for (let i = 0; i < oldQuestionVotes.length; i++) {
        if (oldQuestionVotes[i] != optionNumber + "") {
          newQuestionVotes.push(oldQuestionVotes[i]);
        }
      }
    }

    newVote[questionNumber] = newQuestionVotes.filter((a) => a != "");

    State.update({ votes: newVote });
  };
}

const renderMultipleChoiceInput = (
  questionNumber,
  questionType,
  option,
  optionNumber
) => {
  return (
    <>
      <div>
        <div className="d-flex align-content-center">
          {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
          {!canVote ? (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                backgroundColor: `${getBgColor(optionNumber, false)}`,
                color: `${getFontColor(optionNumber)}`,
                width: "100%",
                margin: "0.3rem 0px",
                height: "2.4rem",
                borderRadius: `${getBorderRadious(optionNumber)}`,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  padding: "0.01em 22px 0.01em 11px",
                  display: "inline-block",
                  width: `${calculatePercentage(
                    countVotes(questionNumber, questionType)[optionNumber]
                  )}%`,
                  textAlign: "center",
                  overflow: "visible",
                  whiteSpace: "nowrap",
                  textAlign: "left",
                  backgroundColor: `${getBgColor(optionNumber, true)}`,
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
                    ({countVotes(questionNumber, questionType)[optionNumber]}{" "}
                    votes)
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
                {calculatePercentage(
                  countVotes(questionNumber, questionType)[optionNumber]
                )}
                %
              </span>
            </div>
          ) : (
            <>
              <input
                className="form-check-input"
                id={`${questionNumber}-${optionNumber}`}
                name={`${questionNumber}-${questionType}`}
                key={`${questionNumber}-${optionNumber}-${state.vote}`}
                style={getInputStyles(
                  questionType,
                  questionNumber,
                  optionNumber
                )}
                type={questionType == "2" ? "checkbox" : "radio"}
                value={optionNumber}
                checked={
                  questionType == "2"
                    ? state.vote[questionNumber].includes(optionNumber + "")
                    : state.vote[questionNumber] == optionNumber + ""
                }
                onClick={
                  questionType != "2" &&
                  clickRadioInputHandler(questionNumber, optionNumber)
                }
                onChange={
                  questionType == "2" &&
                  clickCheckboxInputHandler(questionNumber, optionNumber)
                }
              />
              <label for={`${questionNumber}-${optionNumber}`}>{option}</label>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const renderTextInput = (questionNumber) => {
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
    {poll.value.questions.map((question, questionNumber) => {
      return (
        <div
          style={{
            border: "1.5px solid rgb(206, 212, 218)",
            borderRadius: "24px",
            position: "relative",
          }}
          className="p-3 my-3"
        >
          <h4>{question.question}</h4>
          <p className="mb-1">
            {question.questionType == "0" || question.questionType == "1"
              ? "Select one option:"
              : question.questionType == "2"
              ? "You can check multiple options:"
              : "Write your answer"}
          </p>
          {question.questionType != "3"
            ? question.choicesOptions.map((option, optionNumber) => {
                return renderMultipleChoiceInput(
                  questionNumber,
                  question.questionType,
                  option,
                  optionNumber
                );
              })
            : renderTextInput(questionNumber)}
        </div>
      );
    })}
    {isQuestionOpen ? (
      hasVoted ? (
        ""
      ) : isVoteValid() ? (
        <CommitButton
          className="w-100"
          style={
            state.hoveringElement != "voteButton"
              ? {
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  borderRadius: "9px",
                  border: "1.5px solid transparent",
                }
              : {
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  fontSize: "1rem",
                  borderRadius: "9px",
                  border: "1.5px solid #000000",
                }
          }
          onMouseEnter={() => State.update({ hoveringElement: "voteButton" })}
          onMouseLeave={() => State.update({ hoveringElement: "" })}
          data={getPublicationParams()}
        >
          Vote
        </CommitButton>
      ) : (
        <>
          <button
            className="w-100"
            style={
              state.hoveringElement != "voteButton"
                ? {
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    borderRadius: "9px",
                    border: "1.5px solid transparent",
                  }
                : {
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    fontSize: "1rem",
                    borderRadius: "9px",
                    border: "1.5px solid #000000",
                  }
            }
            onMouseEnter={() => State.update({ hoveringElement: "voteButton" })}
            onMouseLeave={() => State.update({ hoveringElement: "" })}
            onClick={() => State.update({ showErrorsInForm: true })}
          >
            Vote
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
