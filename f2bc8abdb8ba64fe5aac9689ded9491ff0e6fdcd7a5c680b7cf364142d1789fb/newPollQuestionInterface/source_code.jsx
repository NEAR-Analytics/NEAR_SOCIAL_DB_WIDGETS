State.init({
  pollTitle: "",
  pollDescription: "",
  pollDiscussionLink: "",
  pollStartDate: "",
  startTime: "",
  pollEndDate: "",
  endTime: "",
  question: "",
  // Treated as a number throws an error
  pollType: "0",
  choices: [],
  amountOfChoices: 1,
  expandOptions: false,
  showErrorsInForm: false,
  showPreview: false,
});

const pollTypes = {
  TEXT: { id: "0", value: "Text" },
  MULTIPLE_CHOICE: { id: "1", value: "Multiple choice" },
};

const getPublicationParams = (isDraft) => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "question-v3.0.1",
          value: {
            isDraft,
            title: state.pollTitle,
            description: state.pollDescription,
            startTimestamp: getTimestamp(state.pollStartDate, state.startTime),
            endTimestamp: getTimestamp(state.pollEndDate, state.endTime),
            questionType: state.pollType,
            question: state.question,
            choicesOptions: state.choices.filter((c) => c != ""),
            timestamp: Date.now(),
          },
        },
        undefined,
        0
      ),
    },
  };
};

const getTimestamp = (date, time) => new Date(`${date} ${time}`).getTime();

const isValidInput = () => {
  // TODO validate date and link types
  let result =
    (state.pollType == pollTypes.MULTIPLE_CHOICE.id &&
      state.choices.filter((c) => c != "").length >= 2) ||
    state.pollType != pollTypes.MULTIPLE_CHOICE.id;
  result = result && state.pollTitle != "";
  result = result && state.pollDescription != "";
  result = result && state.pollStartDate != "";
  result = result && state.startTime != "";
  result = result && state.pollEndDate != "";
  result = result && state.endTime != "";
  result = result && state.question != "";
  result = result && !state.pollDiscussionLink.includes("https://t.me/");
  return result;
};

function getStyles(inputData) {
  return !inputData && state.showErrorsInForm
    ? {
        border: "1px solid #dc3545",
        borderOpacity: "1",
      }
    : { backgroundColor: "rgb(230, 230, 230)" };
}

const renderPreview = () => {
  return (
    <div
      className="modal"
      style={
        state.showPreview && { display: "block", backgroundColor: "#7e7e7e70" }
      }
      tabindex="-1"
      role="dialog"
    >
      <div className="modal-dialog" style={{ maxWidth: "80%" }} role="document">
        <div
          className="modal-content"
          style={{ backgroundColor: "rgb(230, 230, 230)" }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Preview</h5>
            <button
              type="button"
              className="close"
              dataDismiss="modal"
              ariaLabel="Close"
              onClick={() => {
                State.update({ showPreview: false });
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
            <Widget
              src={`${context.accountId}/widget/newVotingInterface`}
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
                    startTimestamp: getTimestamp(
                      state.pollStartDate,
                      state.startTime
                    ),
                    endTimestamp: getTimestamp(
                      state.pollEndDate,
                      state.endTime
                    ),
                    questionType: state.pollType,
                    question: state.question,
                    choicesOptions: state.choices.filter((c) => c != ""),
                    timestamp: Date.now(),
                  },
                },
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                State.update({ showPreview: false });
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

const renderTextInputsForChoices = () => {
  let choices = [];

  for (let i = 0; i < state.amountOfChoices; i++) {
    choices.push(i);
  }

  return (
    <>
      {choices.map((choiceIndex) => {
        return (
          <div className="my-3" key={`choice-input-${choiceIndex}`}>
            <label>Answer option {choiceIndex + 1}</label>
            <div className="d-flex">
              <input
                style={
                  state.choices[choiceIndex] == "" && state.showErrorsInForm
                    ? {
                        border: "1px solid #dc3545",
                        borderOpacity: "1",
                        borderRadius: "0.375rem",
                      }
                    : {
                        backgroundColor: "rgb(230, 230, 230)",
                        border: "1px solid #ced4da",
                        borderRadius: "0.375rem",
                      }
                }
                type="text"
                className="w-100 mx-2"
                value={state.choices[choiceIndex]}
                onChange={handleWriteChoiceInputChange(choiceIndex)}
              />
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={deleteChoiceHandler(choiceIndex)}
              >
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="btn btn-outline-primary d-flex"
        style={{ margin: "0 auto" }}
        onClick={addChoicesHandler}
      >
        <i className="bi bi-plus-lg"></i>
        <span>Add option</span>
      </button>
    </>
  );
};

const renderOptions = () => {
  return (
    <div style={{ width: "max-content" }}>
      <input
        style={{
          cursor: "pointer",
          backgroundColor: "rgb(230, 230, 230)",
          borderRadius: "0px",
          position: "absolute",
          top: "100%",
          minWidth: "max-content",
          width: "152px",
        }}
        type="text"
        value="Text"
        readonly
        onClick={() => {
          State.update({ pollType: "0", expandOptions: !state.expandOptions });
        }}
      />

      <input
        style={{
          cursor: "pointer",
          backgroundColor: "rgb(230, 230, 230)",
          borderRadius: "0px",
          position: "absolute",
          top: "200%",
          minWidth: "max-content",
          width: "152px",
        }}
        type="text"
        value="Multiple choice"
        readonly
        onClick={() => {
          State.update({ pollType: "1", expandOptions: !state.expandOptions });
        }}
      />
    </div>
  );
};

function handleWriteChoiceInputChange(choiceIndex) {
  return (event) => {
    const newChoices = state.choices;

    newChoices[Number(choiceIndex)] = event.target.value;

    State.update({
      choices: newChoices,
    });
  };
}

function deleteChoiceHandler(choiceIndex) {
  return () => {
    let choices = state.choices;
    let newChoices = [];
    for (let i = 0; i < choices.length; i++) {
      if (i != choiceIndex) {
        newChoices.push(choices[i]);
      }
    }

    State.update({
      amountOfChoices: Number(state.amountOfChoices) - 1,
      choices: newChoices,
    });
  };
}

function addChoicesHandler() {
  let choices = state.choices;
  choices.push("");
  State.update({
    amountOfChoices: Number(state.amountOfChoices) + 1,
    choices: choices,
  });
}

return (
  <div
    className="d-flex align-items-start justify-content-around pt-4"
    style={{
      borderRadius: "0.375rem",
      height: "100vh",
      backgroundColor: "white",
    }}
  >
    <div className="d-flex flex-column w-75 justify-content-around">
      <label for="pollTitle">Title</label>
      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
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
      {!state.pollTitle && state.showErrorsInForm && (
        <p className="text-danger">Title cannot be empty</p>
      )}

      <label for="pollDescription" className="mt-2">
        Description
      </label>
      <textarea
        id="pollDescription"
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
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

      <label for="pollDiscussionLink" className="mt-3">
        Discussion link (optional)
      </label>
      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        type="text"
        className={
          !state.pollDiscussionLink.includes("https://t.me/") &&
          state.showErrorsInForm
            ? "border border-danger mb-2"
            : "mb-2"
        }
        id="pollDiscussionLink"
        value={state.pollDiscussionLink}
        onChange={(e) => {
          State.update({ pollDiscussionLink: e.target.value });
        }}
      />
      {!state.pollDiscussionLink.includes("https://t.me/") &&
        state.showErrorsInForm && (
          <p className="text-danger">Not a valid link</p>
        )}

      <div
        className="d-flex justify-content-around flex-wrap"
        style={{ maxWidth: "100%" }}
      >
        <div className="d-flex flex-row">
          <div className="d-flex flex-column mx-2">
            <label for="pollStartDate">Start date</label>
            {/*You have min and max properties on dates input*/}
            <input
              style={getStyles(state.pollStartDate)}
              type="date"
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
          <div>
            <div>Start time</div>
            <input
              type="time"
              style={getStyles(state.startTime)}
              onChange={(e) => {
                State.update({ startTime: e.target.value });
              }}
            />
            {!state.pollStartDate && state.showErrorsInForm && (
              <p className="text-danger">Start time cannot be empty</p>
            )}
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column mx-2">
            <label for="pollEndDate">End date</label>
            <input
              style={getStyles(state.pollEndDate)}
              type="date"
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
          <div>
            <div>End time</div>
            <input
              type="time"
              style={getStyles(state.endTime)}
              value={state.endTime}
              onChange={(e) => {
                State.update({ endTime: e.target.value });
              }}
            />
            {!state.pollEndDate && state.showErrorsInForm && (
              <p className="text-danger">End time cannot be empty</p>
            )}
          </div>
        </div>
      </div>

      <div
        style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
        className="p-3 my-3"
      >
        <label for="question">Question</label>
        <input
          style={
            !state.question && state.showErrorsInForm
              ? {
                  border: "1px solid #dc3545",
                  borderOpacity: "1",
                  borderRadius: "0.375rem",
                }
              : { backgroundColor: "rgb(230, 230, 230)" }
          }
          type="text"
          id="question"
          value={state.question}
          onChange={(e) => {
            State.update({ question: e.target.value });
          }}
        />
        {!state.question && state.showErrorsInForm && (
          <p className="text-danger">Question cannot be empty</p>
        )}
        <label className="mt-3" for="pollType">
          Pool type
        </label>
        <div className="dropdown">
          <button
            style={{ backgroundColor: "rgb(230, 230, 230)" }}
            className="btn dropdown-toggle"
            type="button"
            onClick={() => {
              State.update({ expandOptions: !state.expandOptions });
            }}
          >
            {state.pollType == "0"
              ? "Text"
              : state.pollType == "1"
              ? "Multiple choice"
              : undefined}
          </button>

          {state.expandOptions && renderOptions()}
        </div>
        {state.pollType == "1" && renderTextInputsForChoices()}
        {state.showErrorsInForm &&
          state.pollType == pollTypes.MULTIPLE_CHOICE.id &&
          state.choices.filter((c) => c != "").length < 2 && (
            <p className="text-danger">Should have at least 2 options</p>
          )}
      </div>
    </div>

    <div
      style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
      className="p-3 d-flex flex-column justify-content-center"
    >
      <button
        className="my-2 btn btn-outline-primary"
        onClick={() => State.update({ showPreview: true })}
      >
        Preview
      </button>

      {isValidInput() ? (
        <CommitButton
          className="my-2 btn btn-primary"
          data={getPublicationParams(false)}
        >
          Create poll
        </CommitButton>
      ) : (
        <button
          className="my-2 btn btn-primary"
          onClick={() => State.update({ showErrorsInForm: true })}
        >
          Create poll
        </button>
      )}
    </div>

    {state.showPreview && renderPreview()}
  </div>
);
