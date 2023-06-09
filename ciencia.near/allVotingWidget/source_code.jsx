if (!props.isPreview && !props.poll) {
  return "Property poll not set";
}

const isPreview = props.isPreview ?? false;

// let widgetOwner = "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
let widgetOwner = "ciencia.near";

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
  showHumanNotVerifyed: false,
  showErrorsInForm: false,
  hoveringElement: "",
  justVoted: false,
});

/* -------------------------------------------------
 ---------------    Humanity check     -------------
 --------------------------------------------------- */
/** Check if is human. 1: Unknown, 2: Yes, 3: No, but can retry, 4: No  */
function userIsHuman(reQuery) {
  if (!reQuery) {
    if (state.HumanityStatus == undefined) return userIsHuman(true);
    else return state.HumanityStatus;
  }

  /* // for testing - _intent must be added to State.init({ ... });
  let url = "";
  console.log("Intent: " + state._intent);
  switch (state._intent) {
    case 0:
      // ROJO - REINTENTAR
      url = "https://api.nearsocialwidgets.com/status?id=test2";
      break;
    case 1:
      // EMPEZO y no terminó el proceso
      url = "https://api.nearsocialwidgets.com/status?id=test22";
      break;
    case 4:
      // ROJO
      url = "https://api.nearsocialwidgets.com/status?id=test24";
      break;
    case 2:
      // NUNCA EMPEZO
      url = "https://api.nearsocialwidgets.com/status?id=test26";
      break;
    case 3:
      // VERDE
      url = "https://api.nearsocialwidgets.com/status?id=silkking.testnet";
      break;
  }

  state._intent++;
*/
  const url =
    "https://api.nearsocialwidgets.com/status?id=" + context.accountId;
  const response = fetch(url);

  if (response.status != 200) {
    alert("Can't connect to verification API. Please try again");
    return;
  }
  const obj = response.body;
  // console.log(obj);
  var result = 1;
  if (obj.body.code != 404) {
    if (obj.review.reviewResult.reviewAnswer == "GREEN") result = 2;
    else if (obj.review.reviewResult.reviewAnswer == "RED") {
      if (obj.review.reviewResult.reviewRejectType == "FINAL") result = 4;
      if (obj.review.reviewResult.reviewRejectType == "RETRY") result = 3;
    }
  }

  // console.log("isHuman: " + result);

  State.update({ HumanityStatus: result });

  return result;
}

const proveYoureHumanButton = () => {
  return (
    <div>
      {state.HumanityStatus == 1 ? (
        <p style={{ textAlign: "center" }} className="alert alert-info">
          Humanity not verified
        </p>
      ) : state.HumanityStatus == 2 ? (
        ""
      ) : state.HumanityStatus == 3 ? (
        <p style={{ textAlign: "center" }} className="alert alert-info">
          Humanity check failed. Please try again
        </p>
      ) : (
        <p style={{ textAlign: "center" }} className="alert alert-danger">
          Humanity check failed. You can't continue
        </p>
      )}
      {state.HumanityStatus < 4 ? (
        <>
          <div style={{ textAlign: "center" }}>
            <a
              href={"https://nearsocialwidgets.com?id=" + context.accountId}
              target="_blank"
              onClick={() => showCheckHumanModal()}
            >
              <button>Click here to prove you are human</button>
            </a>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const showCheckHumanModal = () => {
  State.update({ HumanityModal: "show" });
};

const closeCheckHumanModal = () => {
  State.update({ HumanityModal: "hide" });
  userIsHuman(true);
};

const renderCheckHumanModal = () => {
  return state.HumanityModal == "show" ? (
    <>
      <div
        className="modal"
        id="modal"
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#7e7e7e70",
          backdropFilter: "blur(4px)",
        }}
        tabindex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog"
          style={{ width: "540px", borderRadius: "28px" }}
          role="document"
        >
          <div
            className="modal-content"
            style={{ border: "none", borderRadius: "28px" }}
          >
            <div
              className="modal-header flex-row-reverse"
              style={{ padding: "0", margin: "0", border: "none" }}
            >
              <button
                type="button"
                className="close"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  margin: "0.5rem 0.5rem 0px 0px",
                  borderRadius: "28px",
                  marginRight: "0.3rem",
                  padding: "0.3rem 0.7rem 0 0",
                }}
                data-bs-dismiss="modal"
                ariaLabel="Close"
                onClick={() => closeCheckHumanModal()}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                width: "90%",
                borderRadius: "1rem",
                margin: "0 auto",
                padding: "0",
              }}
            >
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  letterSpacing: "0.1px",
                  textAlign: "center",
                }}
              >
                Humanity check pending...
              </h3>
              <p
                style={{
                  letterSpacing: "-0.01",
                  color: "#4B516A",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Close this once you completed the humanity check process
              </p>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  ariaLabel="Close"
                  onClick={() => closeCheckHumanModal()}
                >
                  Close
                </button>
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ border: "none", justifyContent: "space-around" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

/* ------------------------------------------------------------ */

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
const answers = Social.index("poll_question", "answer-v3.1.1");

if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
  State.update({ answers: answers, justVoted: false });
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

const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.1.1",
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
  isValid = isValid && context.accountId;
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
  const validAnswers = votes.reduce((acc, curr) => acc + curr, 0);

  if (validAnswers == 0 || votes.length == 0) return 0;

  const votesToThisOption = votes[index];
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
        questionNumber: questionNumber + "",
        answers: validAnswersToThisPoll,
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
          {!canVote || state.justVoted ? (
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
      {hasVoted || state.justVoted ? (
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

function PrimaryButtonStyle() {
  return state.hoveringElement != "primaryButton"
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
      };
}

function SecondaryButtonStyle() {
  return state.hoveringElement != "secondaryButton"
    ? {
        marginTop: "0.5rem",
        padding: "0.5rem",
        backgroundColor: "#888",
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
      };
}

return (
  <>
    {renderCheckHumanModal()}
    {userIsHuman(false) != 2 ? proveYoureHumanButton() : ""}
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
            <h4 style={{ fontWeight: "700", marginLeft: "0.8rem" }}>
              {question.question}
            </h4>
          </div>

          {!hasVoted &&
          !state.justVoted &&
          (question.questionType == "0" || question.questionType == "1") ? (
            <p className="mb-1">Select one option:</p>
          ) : !hasVoted && !state.justVoted && question.questionType == "2" ? (
            <p className="mb-1">You can check multiple options:</p>
          ) : (
            !hasVoted &&
            !state.justVoted && <p className="mb-1">Write your answer:</p>
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
        userIsHuman(false) == 2 ? (
          // human is verified
          <CommitButton
            className="w-100"
            style={PrimaryButtonStyle()}
            onMouseEnter={() =>
              State.update({ hoveringElement: "primaryButton" })
            }
            onMouseLeave={() => State.update({ hoveringElement: "" })}
            data={getPublicationParams()}
            onCommit={() => {
              State.update({ justVoted: true });
            }}
          >
            Vote
          </CommitButton>
        ) : (
          // human is not verified
          <>
            <button
              className="w-100"
              style={PrimaryButtonStyle()}
              onMouseEnter={() =>
                State.update({ hoveringElement: "primaryButton" })
              }
              onMouseLeave={() => State.update({ hoveringElement: "" })}
              onClick={() => State.update({ showHumanNotVerifyed: true })}
            >
              Vote
            </button>
            {state.showHumanNotVerifyed && (
              <span className="text-danger">You must verify you're human</span>
            )}
          </>
        )
      ) : (
        <>
          <button
            className="w-100"
            style={PrimaryButtonStyle()}
            onMouseEnter={() =>
              State.update({ hoveringElement: "primaryButton" })
            }
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
