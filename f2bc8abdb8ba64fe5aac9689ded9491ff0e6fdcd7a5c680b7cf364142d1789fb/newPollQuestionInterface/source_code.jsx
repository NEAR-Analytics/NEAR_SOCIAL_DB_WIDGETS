State.init({
  pollTitle: "",
  pollDescription: "",
  pollDiscussionLink: "",
  pollStartDate: "",
  pollEndDate: "",
  amountOfQuestions: 1,
  questions: [""],
  // Treated as a number throws an error
  pollTypes: ["0"],
  choices: [[""]],
  amountOfChoices: [1],
  showErrorsInForm: false,
  showPreview: false,
  showSendFeedback: false,
  sectionShown: "mainInfo",
  hoveringElement: "",
});

const pollTypes = {
  TEXT: { id: "0", value: "Text" },
  MULTIPLE_CHOICE: { id: "1", value: "Multiple choice" },
};

const getPublicationParams = (isDraft) => {
  let paramQuestions = [];

  for (let i = 0; i < state.questions.length; i++) {
    paramQuestions.push({
      question: state.questions[i],
      questionType: state.pollTypes[i],
      choicesOptions: state.choices[i].filter((c) => c != ""),
    });
  }

  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "question-v3.0.1",
          value: {
            isDraft,
            title: state.pollTitle,
            description: state.pollDescription,
            tgLink: state.pollDiscussionLink,
            startTimestamp: getTimestamp(state.pollStartDate),
            endTimestamp: getTimestamp(state.pollEndDate),
            questions: paramQuestions,
            timestamp: Date.now(),
          },
        },
        undefined,
        0
      ),
    },
  };
};

const getTimestamp = (date) => new Date(`${date}`).getTime();

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const isValidInput = (quesitonNumber) => {
  // TODO validate date and link types
  let result =
    (state.pollType == pollTypes.MULTIPLE_CHOICE.id &&
      state.choices.filter((c) => c != "").length >= 2) ||
    state.pollType != pollTypes.MULTIPLE_CHOICE.id;
  result = result && state.pollTitle != "";
  result = result && state.pollDescription != "";
  result = result && isValidTelegramLink();
  result = result && state.pollStartDate != "";
  result = result && state.pollEndDate != "";
  result = result && state.questions[quesitonNumber] != "";
  result =
    result &&
    getTimestamp(state.pollStartDate) < getTimestamp(state.pollEndDate);
  // result = result && !state.pollDiscussionLink.includes("https://t.me/");
  return result;
};

function getStyles(inputData) {
  return !inputData && state.showErrorsInForm
    ? {
        backgroundColor: "white",
        padding: "0.5rem 1.5rem",
        borderRadius: "0.8rem",
        color: "#474D55",
        letterSpacing: "-0.01em",
        width: "100%",
        border: "1px solid #dc3545",
        borderOpacity: "1",
      }
    : {
        border: "1.5px solid #E1E9F0",
        backgroundColor: "white",
        padding: "0.5rem 1.5rem",
        borderRadius: "0.8rem",
        color: "#474D55",
        letterSpacing: "-0.01em",
        width: "100%",
      };
}

const widgetOwner = "silkking.near";

const renderModal = (whatModal) => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        (state.showPreview || state.showSendFeedback) && {
          display: "block",
          backgroundColor: "#7e7e7e70",
        }
      }
      tabindex="-1"
      role="dialog"
      onClick={(e) => {
        if (e.target.id == "modal" && state.showSendFeedback) {
          State.update({
            pollTitle: "",
            pollDescription: "",
            pollDiscussionLink: "",
            pollStartDate: "",
            pollEndDate: "",
            amountOfQuestions: 1,
            questions: [""],
            pollTypes: ["0"],
            choices: [[""]],
            amountOfChoices: [1],
            showSendFeedback: false,
          });
        } else if (e.target.id == "modal") {
          State.update({ showPreview: false });
        }
      }}
    >
      <div className="modal-dialog" style={{ maxWidth: "80%" }} role="document">
        <div
          className="modal-content"
          style={
            state.showSendFeedback
              ? { backgroundColor: "rgb(230, 230, 230)", marginTop: "30vh" }
              : { backgroundColor: "rgb(230, 230, 230)" }
          }
        >
          <div className="modal-header">
            <h5 className="modal-title">Preview</h5>
            <button
              type="button"
              className="close"
              dataDismiss="modal"
              ariaLabel="Close"
              onClick={() => {
                if (state.showSendFeedback) {
                  State.update({
                    pollTitle: "",
                    pollDescription: "",
                    pollDiscussionLink: "",
                    pollStartDate: "",
                    pollEndDate: "",
                    amountOfQuestions: 1,
                    questions: [""],
                    pollTypes: ["0"],
                    choices: [[""]],
                    amountOfChoices: [1],
                    showSendFeedback: false,
                  });
                } else {
                  State.update({ showPreview: false });
                }
              }}
            >
              <span ariaHidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body"
            style={{
              width: "90%",
              borderRadius: "1rem",
              backgroundColor: "white",
              margin: "0 auto",
            }}
          >
            {whatModal == "preview" ? (
              <Widget
                src={`${widgetOwner}/widget/newVotingInterface`}
                props={{
                  isPreview: true,
                  previewInfo: {
                    accountId: context.accountId,
                    blockHeight: undefined,
                    value: {
                      tgLink: state.pollDiscussionLink,
                      isDraft,
                      title: state.pollTitle,
                      description: state.pollDescription,
                      startTimestamp: getTimestamp(state.pollStartDate),
                      endTimestamp: getTimestamp(state.pollEndDate),
                      questions: state.questions,
                      questionTypes: state.pollTypes,
                      choicesOptions: state.choices.forEach((questionChoices) =>
                        questionChoices.filter((c) => c != "")
                      ),
                      timestamp: Date.now(),
                    },
                  },
                }}
              />
            ) : (
              whatModal == "sendFeedback" && (
                <p styles={{ textAling: "center" }}>
                  Poll created succesfully!
                </p>
              )
            )}
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                if (state.showSendFeedback) {
                  State.update({
                    pollTitle: "",
                    pollDescription: "",
                    pollDiscussionLink: "",
                    pollStartDate: "",
                    pollEndDate: "",
                    amountOfQuestions: 1,
                    questions: [""],
                    pollTypes: ["0"],
                    choices: [[""]],
                    amountOfChoices: [1],
                    showSendFeedback: false,
                  });
                } else {
                  State.update({ showPreview: false });
                }
              }}
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderTextInputsForChoices = (questionNumber) => {
  let thisQuestionChoices = [];

  for (let i = 0; i < state.amountOfChoices[questionNumber]; i++) {
    thisQuestionChoices.push(i);
  }

  return (
    <>
      {thisQuestionChoices.map((choiceIndex) => {
        return (
          <div className="mb-2" key={`choice-input-${choiceIndex}`}>
            <div style={{ position: "relative" }}>
              <input
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "0.8rem",
                  border: "1.5px solid #E1E9F0",
                  color: "#474D55",
                  letterSpacing: "-0.01em",
                  width: "100%",
                }}
                type="text"
                className={
                  !state.questions[questionNumber] && state.showErrorsInForm
                    ? "border border-danger mb-2"
                    : "mb-2"
                }
                id="question"
                value={state.questions[questionNumber]}
                onChange={(e) => {
                  let newQuestions = state.questions;
                  newQuestions[questionNumber] = e.target.value;

                  State.update({ questions: newQuestions });
                }}
              />
              <i
                className="bi bi-x"
                style={{
                  color: "#767B8E",
                  cursor: "pointer",
                  position: "absolute",
                  right: "1rem",
                  top: "0.55rem",
                }}
                onClick={deleteChoiceHandler(questionNumber, choiceIndex)}
              ></i>
            </div>
          </div>
        );
      })}
      <div
        className="d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={addChoicesHandler(questionNumber)}
      >
        <i
          className="bi bi-plus-lg"
          style={{ color: "#4B516A", marginRight: "0.7rem" }}
        ></i>
        <span
          style={{
            color: "#4B516A",
            fontSize: "0.8rem",
            dontWeight: "500",
            letterSpacing: "0.01em",
          }}
        >
          Add another option
        </span>
      </div>
    </>
  );
};

// const renderOptions = (questionNumber) => {
//   function changeQuestionType(questionType) {
//     let newPollTypes = state.pollTypes;
//     newPollTypes[questionNumber] = questionType;
//   }

//   return (
//     <div style={{ width: "max-content" }}>
//       <input
//         style={{
//           cursor: "pointer",
//           backgroundColor: "rgb(230, 230, 230)",
//           borderRadius: "0px",
//           position: "absolute",
//           top: "100%",
//           minWidth: "max-content",
//           width: "152px",
//         }}
//         type="text"
//         value="Text"
//         readonly
//         onClick={() => {
//           State.update({
//             pollTypes: changeQuestionType("0"),
//           });
//         }}
//       />

//       <input
//         style={{
//           cursor: "pointer",
//           backgroundColor: "rgb(230, 230, 230)",
//           borderRadius: "0px",
//           position: "absolute",
//           top: "200%",
//           minWidth: "max-content",
//           width: "152px",
//         }}
//         type="text"
//         value="Multiple choice"
//         readonly
//         onClick={() => {
//           State.update({
//             pollTypes: changeQuestionType("1"),
//           });
//         }}
//       />
//     </div>
//   );
// };

// function handleWriteChoiceInputChange(questionNumber, choiceIndex) {
//   return (event) => {
//     const newChoices = state.choices;
//     newChoices[questionNumber][Number(choiceIndex)] = event.target.value;

//     State.update({
//       choices: newChoices,
//     });
//   };
// }

function deleteChoiceHandler(questionNumber, choiceIndex) {
  return () => {
    let thisQuestionChoices = state.choices[questionNumber];
    let newThisQuestionChoices = [];
    for (let i = 0; i < choices.length; i++) {
      if (i != choiceIndex) {
        newThisQuestionChoices.push(thisQuestionChoices[i]);
      }
    }

    let newChoices = state.choices;
    newChoices[questionNumber] = newThisQuestionChoices;

    let newAmountOfChoices = state.amountOfChoices;
    newAmountOfChoices[questionNumber] =
      Number(newAmountOfChoices[questionNumber]) - 1;

    State.update({
      amountOfChoices: newAmountOfChoices,
      choices: newChoices,
    });
  };
}

function addChoicesHandler(questionNumber) {
  let newchoices = state.choices;
  newchoices[questionNumber].push("");

  let newAmountOfChoices = state.amountOfChoices;
  newAmountOfChoices[questionNumber] =
    Number(newAmountOfChoices[questionNumber]) + 1;

  State.update({
    amountOfChoices: newAmountOfChoices,
    choices: newchoices,
  });
}

function isValidTelegramLink() {
  if (!state.pollDiscussionLink) return true;
  return state.pollDiscussionLink.startsWith("https://t.me");
}

function getTypeOfQuestionSelectionStyles(questionNumber, typeOfQuestion) {
  if (state.pollTypes[questionNumber] == typeOfQuestion) {
    return {
      padding: "1rem",
      borderRadius: "1rem",
      cursor: "pointer",
      border: "1.5px solid #353A40",
      position: "relative",
    };
  } else {
    return {
      padding: "1rem",
      borderRadius: "1rem",
      cursor: "pointer",
      border: "1.5px solid #E1E9F0",
    };
  }
}

let amountOfQuestions = [];
for (let i = 0; i < state.amountOfQuestions; i++) {
  amountOfQuestions.push(i);
}

console.log(amountOfQuestions);

return (
  <div
    className="pt-4"
    style={{
      borderRadius: "0.375rem",
      backgroundColor: "white",
      margin: "0 auto",
    }}
  >
    <div style={{ margin: "0 auto" }}>
      <span
        style={
          state.sectionShown == "mainInfo"
            ? {
                color: "#353A40",
                fontSize: "0.8rem",
                userSelect: "none",
                cursor: "pointer",
                marginRight: "1rem",
              }
            : {
                color: "#767B8E",
                fontSize: "0.8rem",
                userSelect: "none",
                cursor: "pointer",
                marginRight: "1rem",
              }
        }
        onClick={() => {
          State.update({ sectionShown: "mainInfo" });
        }}
      >
        <i className="bi bi-square-fill"></i> Main information
      </span>
      <span
        style={
          state.sectionShown == "questions"
            ? {
                color: "#353A40",
                fontSize: "0.8rem",
                position: "relative",
                userSelect: "none",
                cursor: "pointer",
              }
            : {
                color: "#767B8E",
                fontSize: "0.8rem",
                position: "relative",
                userSelect: "none",
                cursor: "pointer",
              }
        }
        onClick={() => {
          State.update({ sectionShown: "questions" });
        }}
      >
        <i className="bi bi-square-fill"></i> Questions{" "}
        <span
          style={{
            fontSize: "0.7rem",
            position: "absolute",
            top: "-8%",
            left: "103%",
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {state.amountOfQuestions + ""}
        </span>
      </span>
    </div>
    <div className="pt-4">
      <div className="mb-3" style={{ maxHeight: "50vh", overflowY: "scroll" }}>
        {state.sectionShown == "mainInfo" && (
          <div
            className="d-flex flex-column justify-content-center"
            style={{ margin: "0 auto" }}
          >
            <label
              for="pollTitle"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
                color: "#474D55",
                marginBottom: "0.3rem",
              }}
            >
              Title*
            </label>
            <div style={{ position: "relative" }}>
              <input
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "0.8rem",
                  border: "1.5px solid #E1E9F0",
                  color: "#474D55",
                  letterSpacing: "-0.01em",
                  width: "100%",
                }}
                type="text"
                className={
                  !state.pollTitle && state.showErrorsInForm
                    ? "border border-danger mb-2"
                    : "mb-2"
                }
                id="pollTitle"
                value={state.pollTitle}
                onChange={(e) => {
                  State.update({ pollTitle: e.target.value });
                }}
              />
              <i
                className="bi bi-x-circle-fill"
                style={{
                  color: "#E1E9F0",
                  cursor: "pointer",
                  position: "absolute",
                  right: "1rem",
                  top: "0.55rem",
                }}
                onClick={() => {
                  State.update({ pollTitle: "" });
                }}
              ></i>
            </div>
            {!state.pollTitle && state.showErrorsInForm && (
              <p className="text-danger">Title cannot be empty</p>
            )}

            <label
              for="pollDescription"
              className="mt-2"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
                color: "#474D55",
                marginBottom: "0.3rem",
              }}
            >
              Description*
            </label>
            <textarea
              id="pollDescription"
              style={{
                backgroundColor: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.8rem",
                border: "1.5px solid #E1E9F0",
                color: "#474D55",
                letterSpacing: "-0.01em",
                width: "100%",
              }}
              rows="3"
              className={
                !state.pollDescription &&
                state.showErrorsInForm &&
                "border border-danger"
              }
              value={state.pollDescription}
              onChange={(e) => {
                State.update({ pollDescription: e.target.value });
              }}
            ></textarea>
            {!state.pollDescription && state.showErrorsInForm && (
              <p className="text-danger">Description cannot be empty</p>
            )}

            <label
              for="pollDiscussionLink"
              className="mt-3"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
                color: "#474D55",
                marginBottom: "0.3rem",
              }}
            >
              Discussion link (optional)
            </label>
            <div style={{ position: "relative" }}>
              <i
                className="bi bi-people"
                style={{
                  color: "#767B8E",
                  position: "absolute",
                  left: "1rem",
                  top: "0.55rem",
                }}
              ></i>
              <input
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem 1.5rem 0.5rem 2.2rem",
                  borderRadius: "0.8rem",
                  border: "1.5px solid #E1E9F0",
                  color: "#474D55",
                  letterSpacing: "-0.01em",
                  width: "100%",
                }}
                type="text"
                className={
                  !isValidTelegramLink() && state.showErrorsInForm
                    ? "border border-danger mb-2"
                    : "mb-2"
                }
                id="pollDiscussionLink"
                value={state.pollDiscussionLink}
                onChange={(e) => {
                  State.update({ pollDiscussionLink: e.target.value });
                }}
              />
              <i
                className="bi bi-x-circle-fill"
                style={{
                  color: "#E1E9F0",
                  cursor: "pointer",
                  position: "absolute",
                  right: "1rem",
                  top: "0.55rem",
                }}
                onClick={() => {
                  State.update({ pollDiscussionLink: "" });
                }}
              ></i>
            </div>
            {!isValidTelegramLink() && state.showErrorsInForm && (
              <p className="text-danger">Not a valid link</p>
            )}

            <div
              className="d-flex justify-content-between flex-wrap mb-3"
              style={{ maxWidth: "100%" }}
            >
              <div className="d-flex flex-column" style={{ width: "48%" }}>
                <label
                  for="pollStartDate"
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "-0.01em",
                    color: "#474D55",
                    marginBottom: "0.3rem",
                  }}
                >
                  Start date*
                </label>
                {/*You have min and max properties on dates input*/}
                <input
                  style={getStyles(state.pollStartDate)}
                  type="datetime-local"
                  id="pollStartDate"
                  value={state.pollStartDate}
                  onChange={(e) => {
                    State.update({ pollStartDate: e.target.value });
                    console.log(getTimestamp(state.pollStartDate));
                  }}
                />
                {!state.pollStartDate && state.showErrorsInForm && (
                  <p className="text-danger">Start date cannot be empty</p>
                )}
              </div>
              <div className="d-flex flex-column" style={{ width: "48%" }}>
                <label
                  for="pollEndDate"
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "-0.01em",
                    color: "#474D55",
                    marginBottom: "0.3rem",
                  }}
                >
                  End date*
                </label>
                <input
                  style={getStyles(state.pollEndDate)}
                  type="datetime-local"
                  id="pollStartDate"
                  value={state.pollEndDate}
                  onChange={(e) => {
                    State.update({ pollEndDate: e.target.value });
                  }}
                />
                {!state.pollEndDate && state.showErrorsInForm && (
                  <p className="text-danger">End date cannot be empty</p>
                )}
              </div>
            </div>
            {getTimestamp(state.pollStartDate) >=
              getTimestamp(state.pollEndDate) &&
              state.showErrorsInForm && (
                <div>
                  <p className="text-danger">
                    Poll should start before it ends
                  </p>
                </div>
              )}
          </div>
        )}

        {state.sectionShown == "questions" &&
          amountOfQuestions.map((questionNumber) => {
            return (
              <>
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{
                    border: "1.5px solid #E1E9F0",
                    padding: "1.5rem 1rem",
                    borderRadius: "1.2rem",
                    margin: "0 auto",
                  }}
                >
                  <label
                    for="question"
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "-0.01em",
                      color: "#474D55",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Question*
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      style={{
                        backgroundColor: "white",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "0.8rem",
                        border: "1.5px solid #E1E9F0",
                        color: "#474D55",
                        letterSpacing: "-0.01em",
                        width: "100%",
                      }}
                      type="text"
                      className={
                        !state.questions[questionNumber] &&
                        state.showErrorsInForm
                          ? "border border-danger mb-2"
                          : "mb-2"
                      }
                      id={`question${questionNumber}`}
                      value={state.questions[questionNumber]}
                      onChange={(e) => {
                        let newQuestions = state.questions;
                        newQuestions[questionNumber] = e.target.value;

                        State.update({ questions: newQuestions });
                      }}
                    />
                    <i
                      className="bi bi-x-circle-fill"
                      style={{
                        color: "#E1E9F0",
                        cursor: "pointer",
                        position: "absolute",
                        right: "1rem",
                        top: "0.55rem",
                      }}
                      onClick={() => {
                        let newQuestions = state.questions;
                        newQuestions[questionNumber] = "";

                        State.update({ question: newQuestions });
                      }}
                    ></i>
                  </div>

                  <label
                    className="mt-3"
                    for="pollType"
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "-0.01em",
                      color: "#474D55",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Type of question
                  </label>
                  <div className="d-flex justify-content-between">
                    <div
                      style={getTypeOfQuestionSelectionStyles(
                        questionNumber,
                        "0"
                      )}
                      onClick={() => {
                        let newPollTypes = state.pollTypes;
                        newPollTypes[questionNumber] = "0";

                        State.update({ pollTypes: newPollTypes });
                      }}
                    >
                      {state.pollTypes[questionNumber] == "0" && (
                        <i
                          className="bi bi-check2-circle"
                          style={{
                            position: "absolute",
                            top: "-0.5rem",
                            right: "-0.2rem",
                            color: "rgb(53, 58, 64)",
                            backgroundColor: "white",
                            borderRadius: "100px",
                          }}
                        ></i>
                      )}
                      <p
                        style={{
                          letterSpacing: "-0.01em",
                          fontWeight: "500",
                          color: "#010A2D",
                          fontSize: "0.8rem",
                          userSelect: "none",
                        }}
                      >
                        Yes or No
                      </p>
                      <div className="d-flex mb-1">
                        <input
                          style={{
                            appearance: "auto",
                            width: "16px",
                            marginRight: "0.2rem",
                          }}
                          type="radio"
                          disabled
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "16px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                      <div className="d-flex">
                        <input
                          className="form-check-input"
                          style={{
                            appearance: "auto",
                            width: "16px",
                            marginRight: "0.2rem",
                            backgroundColor: "black",
                          }}
                          type="radio"
                          disabled
                          checked
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "16px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      style={getTypeOfQuestionSelectionStyles(
                        questionNumber,
                        "1"
                      )}
                      onClick={() => {
                        let newPollTypes = state.pollTypes;
                        newPollTypes[questionNumber] = "1";

                        State.update({ pollTypes: newPollTypes });
                      }}
                    >
                      {state.pollTypes[questionNumber] == "1" && (
                        <i
                          className="bi bi-check2-circle"
                          style={{
                            position: "absolute",
                            top: "-0.5rem",
                            right: "-0.2rem",
                            color: "rgb(53, 58, 64)",
                            backgroundColor: "white",
                            borderRadius: "100px",
                          }}
                        ></i>
                      )}
                      <p
                        style={{
                          letterSpacing: "-0.01em",
                          fontWeight: "500",
                          color: "#010A2D",
                          fontSize: "0.8rem",
                          userSelect: "none",
                        }}
                      >
                        Single Answer
                      </p>
                      <div className="d-flex mb-1">
                        <input
                          style={{
                            appearance: "auto",
                            width: "12px",
                            marginRight: "0.2rem",
                          }}
                          type="radio"
                          disabled
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "12px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                      <div className="d-flex mb-1">
                        <input
                          style={{
                            appearance: "auto",
                            width: "12px",
                            marginRight: "0.2rem",
                          }}
                          type="radio"
                          disabled
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "12px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          className="form-check-input"
                          style={{
                            appearance: "auto",
                            width: "12px",
                            marginTop: "0",
                            marginRight: "0.2rem",
                            backgroundColor: "black",
                          }}
                          type="radio"
                          disabled
                          checked
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "12px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      style={getTypeOfQuestionSelectionStyles(
                        questionNumber,
                        "2"
                      )}
                      onClick={() => {
                        let newPollTypes = state.pollTypes;
                        newPollTypes[questionNumber] = "2";

                        State.update({ pollTypes: newPollTypes });
                      }}
                    >
                      {state.pollTypes[questionNumber] == "2" && (
                        <i
                          className="bi bi-check2-circle"
                          style={{
                            position: "absolute",
                            top: "-0.5rem",
                            right: "-0.2rem",
                            color: "rgb(53, 58, 64)",
                            backgroundColor: "white",
                            borderRadius: "100px",
                          }}
                        ></i>
                      )}
                      <p
                        style={{
                          letterSpacing: "-0.01em",
                          fontWeight: "500",
                          color: "#010A2D",
                          fontSize: "0.8rem",
                          userSelect: "none",
                        }}
                      >
                        Multiselect
                      </p>
                      <div className="d-flex mb-1">
                        <input
                          style={{
                            appearance: "auto",
                            width: "12px",
                            marginRight: "0.2rem",
                          }}
                          type="checkbox"
                          disabled
                          checked
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "12px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                      <div className="d-flex mb-1">
                        <input
                          style={{
                            appearance: "auto",
                            width: "12px",
                            marginRight: "0.2rem",
                          }}
                          type="checkbox"
                          disabled
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "12px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          className="form-check-input"
                          style={{
                            appearance: "auto",
                            width: "12px",
                            marginTop: "0",
                            marginRight: "0.2rem",
                            backgroundColor: "black",
                          }}
                          type="checkbox"
                          disabled
                          checked
                        />
                        <input
                          style={{
                            padding: "0",
                            border: "none",
                            borderRadius: "30px",
                            height: "12px",
                          }}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      style={getTypeOfQuestionSelectionStyles(
                        questionNumber,
                        "3"
                      )}
                      onClick={() => {
                        let newPollTypes = state.pollTypes;
                        newPollTypes[questionNumber] = "3";

                        State.update({ pollTypes: newPollTypes });
                      }}
                    >
                      {state.pollTypes[questionNumber] == "3" && (
                        <i
                          className="bi bi-check2-circle"
                          style={{
                            position: "absolute",
                            top: "-0.5rem",
                            right: "-0.2rem",
                            color: "rgb(53, 58, 64)",
                            backgroundColor: "white",
                            borderRadius: "100px",
                          }}
                        ></i>
                      )}
                      <p
                        style={{
                          letterSpacing: "-0.01em",
                          fontWeight: "500",
                          color: "#010A2D",
                          fontSize: "0.8rem",
                          userSelect: "none",
                        }}
                      >
                        Text Answer
                      </p>
                      <input
                        style={{
                          marginBottom: "0.5rem",
                          padding: "0",
                          border: "none",
                          borderRadius: "30px",
                          height: "12px",
                          width: "100%",
                        }}
                        type="text"
                        disabled
                      />
                      <input
                        style={{
                          marginBottom: "0.5rem",
                          padding: "0",
                          border: "none",
                          borderRadius: "30px",
                          height: "12px",
                          width: "90%",
                        }}
                        type="text"
                        disabled
                      />
                      <input
                        style={{
                          padding: "0",
                          border: "none",
                          borderRadius: "30px",
                          height: "12px",
                          width: "100%",
                        }}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  {(state.pollTypes[questionNumber] == "1" ||
                    state.pollTypes[questionNumber] == "2") && (
                    <>
                      <label
                        className="mt-3"
                        for="pollType"
                        style={{
                          fontSize: "0.8rem",
                          letterSpacing: "-0.01em",
                          color: "#474D55",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Answer options
                      </label>
                      {renderTextInputsForChoices(
                        questionNumber,
                        state.pollType
                      )}
                    </>
                  )}
                  {state.showErrorsInForm &&
                    state.pollTypes[questionNumber] ==
                      pollTypes.MULTIPLE_CHOICE.id &&
                    state.choices[questionNumber].filter((c) => c != "")
                      .length < 2 && (
                      <p className="text-danger">
                        Should have at least 2 options
                      </p>
                    )}
                </div>
              </>
            );
          })}
        {state.sectionShown == "questions" && (
          <button
            className="d-flex justify-content-center align-items-center py-3 w-100"
            style={{
              margin: "1rem auto",
              backgroundColor: "#F2F6FA",
              borderColor: "transparent",
              borderRadius: "20px",
            }}
            onClick={() => {
              State.update({ amountOfQuestions: state.amountOfQuestions + 1 });
            }}
          >
            <i
              className="bi bi-plus-lg"
              style={{ color: "#010A2D", marginRight: "0.7rem" }}
            ></i>
            <span
              style={{
                color: "#010A2D",
                fontSize: "1rem",
                dontWeight: "700",
              }}
            >
              Add question
            </span>
          </button>
        )}
      </div>

      <div className="d-flex flex-row-reverse">
        {/*<button
          className="my-2 btn btn-outline-primary"
          onClick={() => State.update({ showPreview: true })}
        >
          Preview
        </button>*/}

        {isValidInput() ? (
          <CommitButton
            style={
              state.hoveringElement == "createPollButton"
                ? {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                  }
                : {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                  }
            }
            data={getPublicationParams(false)}
            onMouseEnter={() => {
              State.update({ hoveringElement: "createPollButton" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onMouse
            onClick={() => {
              State.update({
                showSendFeedback: true,
              });
            }}
          >
            Create
          </CommitButton>
        ) : (
          <button
            style={
              state.hoveringElement == "createPollButton"
                ? {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                  }
                : {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                  }
            }
            onMouseEnter={() => {
              State.update({ hoveringElement: "createPollButton" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => State.update({ showErrorsInForm: true })}
          >
            Create
          </button>
        )}
      </div>

      {state.showPreview && renderModal("preview")}
      {state.showSendFeedback && renderModal("sendFeedback")}
    </div>
  </div>
);
