/********** Start validations ************/

/********** End validations ************/

/********** Start initialization ************/

State.init({
  pollTitle: "",
  pollDescription: "",
  pollDiscussionLink: "",
  pollStartDate: "",
  pollEndDate: "",
  amountOfQuestions: 1,
  questions: [""],
  //Next 3 are setted with those values so theres a default value for pollTypes
  // Treated as a number throws an error
  pollTypes: ["0"],
  choices: [["Yes", "No"]],
  amountOfChoices: [2],
  showErrorsInForm: false,
  showPreview: false,
  showSendFeedback: false,
  sectionShown: "mainInfo",
  hoveringElement: "",
});

let amountOfQuestions = [];
for (let i = 0; i < state.amountOfQuestions; i++) {
  amountOfQuestions.push(i);
}
/********** End initialization ************/

/********** Start constants ************/

const pollTypes = {
  TEXT: { id: "0", value: "Text" },
  SINGLE_ANSWER: { id: "1", value: "Single answer" },
  MULTISELECT: { id: "2", value: "Multiselect" },
  YES_OR_NO: { id: "3", value: "Yes or No" },
};

const widgetOwner = "silkking.near";

const MODAL_TYPES = {
  PREVIEW: {
    id: 0,
    text: "preview",
  },
  SEND_FEEDBACK: {
    id: 1,
    text: "sendFeedback",
  },
};

const QUESTION_TYPE_DISPLAY = {
  YES_NO: {
    id: 0,
    text: "Yes or no",
    type: "radio",
    length: 2,
  },
  SINGLE_ANSWER: {
    id: 1,
    text: "Single Answer",
    type: "radio",
    length: 3,
  },
  MULTISELECT: {
    id: 2,
    text: "Multiselect",
    type: "checkbox",
    length: 3,
  },
  TEXT_ANSWER: {
    id: 3,
    text: "Text Answer",
    type: null,
    length: 3,
  },
};

/********** End constants ************/

/********** Start styles ************/

const styleUnderline = {
  backgroundImage: "linear-gradient(black 0 0)",
  backgroundPosition: "bottom center",
  backgroundSize:
    "60% 2px" /*Adjust the background size to control length and height*/,
  backgroundRepeat: "no-repeat",
  paddingBottom: "4px" /* this can also control the position */,
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

function getTypeOfQuestionSelectionStyles(questionNumber, typeOfQuestion) {
  let style = {
    padding: "1rem",
    borderRadius: "1rem",
    cursor: "pointer",
  };
  if (state.pollTypes[questionNumber] == typeOfQuestion) {
    return {
      ...style,
      border: "1.5px solid #353A40",
      position: "relative",
    };
  } else {
    return {
      ...style,
      border: "1.5px solid #E1E9F0",
    };
  }
}

// TODO compare with function isValidInput and use it
function getDangerClassIfNeeded(tab) {
  let shouldDisplayNormalStyles = true;
  if (state.showErrorsInForm) {
    for (let i = 0; i < state.amountOfQuestions; i++) {
      if (tab == "MainInformation") {
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles && state.pollTitle != "";
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles && state.pollDescription != "";
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles && isValidTelegramLink();
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles && state.pollStartDate != "";
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles && state.pollEndDate != "";
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles &&
          getTimestamp(state.pollStartDate) < getTimestamp(state.pollEndDate);
      } else if (state.sectionShown == "questions") {
        if (
          state.pollTypes[i] == pollTypes.SINGLE_ANSWER.id ||
          state.pollTypes[i] == pollTypes.MULTISELECT.id
        ) {
          shouldDisplayNormalStyles =
            shouldDisplayNormalStyles &&
            !(state.choices[i].filter((c) => c != "").length < 2);
        }
        shouldDisplayNormalStyles =
          shouldDisplayNormalStyles && state.questions[i] != "";
      }
    }
  }

  if (state.showErrorsInForm) {
    return !shouldDisplayNormalStyles && "text-danger";
  }
  return "";
}

/********** End styles ************/

/********** Start functions ************/

function getPublicationParams(isDraft) {
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
          key: "question-v3.1.0",
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
}

function getTimestamp(date) {
  return new Date(`${date}`).getTime();
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function validateOptionsSettedProperly() {
  let allQuestionsValid = true;
  for (let i = 0; i < amountOfQuestions.length; i++) {
    if (
      state.pollTypes[i] == pollTypes.SINGLE_ANSWER.id ||
      state.pollTypes[i] == pollTypes.MULTISELECT.id
    ) {
      allQuestionsValid =
        allQuestionsValid &&
        state.choices[i].filter((c) => c != "").length >= 2;
    }
  }
  return allQuestionsValid;
}

function validateQuestionsSettedProperly() {
  let allQuestionsValid = true;
  for (let i = 0; i < amountOfQuestions.length; i++) {
    allQuestionsValid = allQuestionsValid && state.questions[i] != "";
  }
  return allQuestionsValid;
}

function isValidInput(validateQuestions) {
  let result = true;
  result = result && state.pollTitle != "";
  result = result && state.pollDescription != "";
  result = result && isValidTelegramLink();
  result = result && state.pollStartDate != "";
  result = result && state.pollEndDate != "";
  if (validateQuestions) {
    result = result && validateQuestionsSettedProperly();
  }
  result =
    result &&
    getTimestamp(state.pollStartDate) < getTimestamp(state.pollEndDate);
  result = result && validateOptionsSettedProperly();
  return result;
}

function deleteChoiceHandler(questionNumber, choiceNumber) {
  if (state.amountOfChoices[questionNumber] > 1) {
    let thisQuestionChoices = state.choices[questionNumber];

    let newThisQuestionChoices = [];

    for (let i = 0; i < thisQuestionChoices.length; i++) {
      if (i != choiceNumber) {
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
  }
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

/********** End functions ************/

/********** Start components ************/

const renderModal = (modalType) => {
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
            {modalType == MODAL_TYPES.PREVIEW ? (
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
              modalType == MODAL_TYPES.SEND_FEEDBACK && (
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
      {thisQuestionChoices.map((choiceNumber) => {
        return (
          <div className="mb-2">
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
                  !state.choices[questionNumber][choiceNumber] &&
                  state.showErrorsInForm
                    ? "border border-danger mb-2"
                    : "mb-2"
                }
                id={`question-${questionNumber}-${choiceNumber}`}
                value={state.choices[questionNumber][choiceNumber]}
                onChange={(e) => {
                  let newChoices = state.choices;
                  newChoices[questionNumber][choiceNumber] = e.target.value;

                  State.update({ choices: newChoices });
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
                onClick={() =>
                  deleteChoiceHandler(questionNumber, choiceNumber)
                }
              ></i>
            </div>
          </div>
        );
      })}
      <div
        className="d-flex align-items-center"
        style={{ cursor: "pointer", maxWidth: "max-content" }}
        onClick={() => addChoicesHandler(questionNumber)}
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

/********** End components ************/

/********** Start rendering ************/

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
        className={getDangerClassIfNeeded("MainInformation")}
        style={
          state.sectionShown == "mainInfo"
            ? {
                ...styleUnderline,
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
        className={getDangerClassIfNeeded("Questions")}
        style={
          state.sectionShown == "questions"
            ? {
                ...styleUnderline,
                color: "#353A40",
                fontSize: "0.8rem",
                userSelect: "none",
                position: "relative",
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
          isValidInput(false) && State.update({ sectionShown: "questions" });
        }}
      >
        <i className="bi bi-square-fill"></i>
        Questions
        <span
          style={
            isValidInput(false)
              ? {
                  fontSize: "0.7rem",
                  position: "absolute",
                  top: "-8%",
                  left: "103%",
                  userSelect: "none",
                }
              : {
                  fontSize: "0.7rem",
                  position: "absolute",
                  top: "-8%",
                  left: "103%",
                  userSelect: "none",
                  cursor: "pointer",
                }
          }
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
                    margin: "1rem auto",
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
                  {!state.questions[questionNumber] &&
                    state.showErrorsInForm && (
                      <p className="text-danger">Question cannot be empty</p>
                    )}

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

                        let newChoices = state.choices;
                        newChoices[questionNumber] = ["Yes", "No"];

                        let newAmountOfChoices = state.amountOfChoices;
                        newAmountOfChoices[questionNumber] = 2;

                        State.update({
                          pollTypes: newPollTypes,
                          choices: newChoices,
                          amountOfChoices: newAmountOfChoices,
                        });
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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
                            cursor: "pointer",
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

                        let newChoices = state.choices;
                        newChoices[questionNumber] = [""];

                        let newAmountOfChoices = state.amountOfChoices;
                        newAmountOfChoices[questionNumber] = 1;

                        State.update({
                          pollTypes: newPollTypes,
                          choices: newChoices,
                          newAmountOfChoices: newAmountOfChoices,
                        });
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
                          cursor: "pointer",
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
                          cursor: "pointer",
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
                          cursor: "pointer",
                        }}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  {(state.pollTypes[questionNumber] ==
                    pollTypes.SINGLE_ANSWER.id ||
                    state.pollTypes[questionNumber] ==
                      pollTypes.MULTISELECT.id) && (
                    <div>
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
                      {renderTextInputsForChoices(questionNumber)}
                    </div>
                  )}
                  {state.showErrorsInForm &&
                    (state.pollTypes[questionNumber] ==
                      pollTypes.SINGLE_ANSWER.id ||
                      state.pollTypes[questionNumber] ==
                        pollTypes.MULTISELECT.id) &&
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
              let oldPollTypes = state.pollTypes;
              let newPollTypes = [];

              for (let i = 0; i < oldPollTypes.length; i++) {
                newPollTypes.push(oldPollTypes[i]);
              }
              newPollTypes.push("0");

              let oldChoices = state.choices;
              let newChoices = [];

              for (let i = 0; i < oldChoices.length; i++) {
                newChoices.push(oldChoices[i]);
              }
              newChoices.push([""]);

              let oldAmountOfChoices = state.amountOfChoices;
              let newAmountOfChoices = [];

              for (let i = 0; i < oldAmountOfChoices.length; i++) {
                newAmountOfChoices.push(oldAmountOfChoices[i]);
              }
              newAmountOfChoices.push(1);

              let oldQuestions = state.questions;
              let newQuestions = [];
              for (let i = 0; i < oldQuestions.length; i++) {
                newQuestions.push(oldQuestions[i]);
              }
              newQuestions.push("");

              State.update({
                questions: newQuestions,
                amountOfQuestions: state.amountOfQuestions + 1,
                pollTypes: newPollTypes,
                choices: newChoices,
                amountOfChoices: newAmountOfChoices,
              });
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

        {state.sectionShown == "mainInfo" ? (
          <button
            style={
              state.hoveringElement == "continueButton"
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
              State.update({ hoveringElement: "continueButton" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => {
              console.log("Click on continue");
              isValidInput(false)
                ? State.update({
                    showErrorsInForm: false,
                    sectionShown: "questions",
                  })
                : State.update({ showErrorsInForm: true });
            }}
          >
            Continue
          </button>
        ) : isValidInput(true) ? (
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

      {state.showPreview && renderModal(MODAL_TYPES.PREVIEW)}
      {state.showSendFeedback && renderModal(MODAL_TYPES.SEND_FEEDBACK)}
    </div>
  </div>
);
/********** End rendering ************/
