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

function getOptionRelatedValidAnswers(answers) {
  return answers.filter((a) => {
    const userAnswers = a.value.answer;
    return userAnswers.every((an, i) => {
      // If has choicesOptions, then it's needs validation answer is among the options. If not, any answer is just fine
      if (poll.value.questions[i].choicesOptions.length > 0) {
        if (Array.isArray(an)) {
          return an.every(
            (ans) =>
              0 <= Number(ans) &&
              Number(ans) < poll.value.questions[i].choicesOptions.length
          );
        } else {
          return (
            0 <= Number(an) &&
            Number(an) < poll.value.questions[i].choicesOptions.length
          );
        }
      } else {
        return true;
      }
    });
  });
}

function getValidAnswers() {
  let validTimeAnswers = getTimeRelatedValidAnswers(answersToThisPoll);
  let validOptionAndTimeAnswers =
    getOptionRelatedValidAnswers(validTimeAnswers);
  return validOptionAndTimeAnswers;
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
function countVotes(questionNumber, questionType) {
  if (questionType == "3") return;
  return validAnswersToThisPoll.reduce((acc, curr) => {
    let ans = curr.value.answer[questionNumber];
    if (Array.isArray(ans)) {
      ans.forEach((a) => {
        acc[Number(a)] += 1;
      });
    } else {
      acc[Number(ans)] += 1;
    }

    return acc;
  }, new Array(poll.value.questions[questionNumber].choicesOptions.length).fill(0));
}

//TODO review this!
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

function isVoteValid() {
  let isValid = state.vote.length == poll.value.questions.length;
  for (let i = 0; i < state.vote.length; i++) {
    const vote = state.vote[i];
    // vote should always be a string, but in one case is treated as an array. Replace array with csv
    if (Array.isArray(vote)) {
      isValid = isValid && vote.filter((v) => v.trim() != "").length > 0;
    } else {
      isValid = isValid && vote.trim() != "";
    }
  }
  return isValid;
}

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisPoll.length == 0) return 0;
  return ((votesToThisOption / validAnswersToThisPoll.length) * 100).toFixed(2);
}

function calculatePercentageOfOption(votes, index) {
  if (votes.length == 0) return 0;
  const votesToThisOption = votes[index];
  const validAnswers = votes.reduce((acc, curr) => acc + curr, 0);
  return ((votesToThisOption / validAnswers) * 100).toFixed(2);
}

function getBorderRadious(questionNumber, optionNumber) {
  if (optionNumber == 0) {
    return "12px 12px 4px 4px";
  } else if (
    optionNumber ==
    poll.value.questions[questionNumber].choicesOptions.length - 1
  ) {
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
  return (
    <Widget
      src={`${widgetOwner}/widget/answer_poll-comment-container`}
      props={{
        answers: validAnswersToThisPoll,
        questionNumber,
      }}
    />
  );
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
                borderRadius: `${getBorderRadious(
                  questionNumber,
                  optionNumber
                )}`,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  padding: "0.01em 22px 0.01em 11px",
                  display: "inline-block",
                  width: `${calculatePercentageOfOption(
                    countVotes(questionNumber, questionType),
                    optionNumber
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
                {calculatePercentageOfOption(
                  countVotes(questionNumber, questionType),
                  optionNumber
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
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
          <div className="d-flex">
            <p
              style={{
                backgroundColor: "#353A40",
                padding: "0.15rem 0.65rem",
                borderRadius: "9px",
                color: "white",
              }}
            >
              {questionNumber + 1}
            </p>
            <h4 style={{ marginLeft: "0.8rem" }}>{question.question}</h4>
          </div>

          {!hasVoted &&
          (question.questionType == "0" || question.questionType == "1") ? (
            <p className="mb-1">Select one option:</p>
          ) : !hasVoted && question.questionType == "2" ? (
            <p className="mb-1">You can check multiple options:</p>
          ) : (
            !hasVoted && <p className="mb-1">Write your answer:</p>
          )}
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
