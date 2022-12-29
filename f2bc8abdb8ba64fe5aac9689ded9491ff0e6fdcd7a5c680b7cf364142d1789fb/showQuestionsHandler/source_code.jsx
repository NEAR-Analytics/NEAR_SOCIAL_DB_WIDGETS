State.init({ showQuestion: false, modalBlockHeight: 0, questions: {} });

//TODO considering this new prop use te context accoutId to filter the questions
const onlyUsersPolls = props.onlyUser ?? false;

const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

if (!questions) {
  return "Loading";
}

questions = questions.sort((q1, q2) => {
  const isQ1Finished = q1.value.endTimestamp < Date.now();
  const isQ2Finished = q2.value.endTimestamp < Date.now();
  if (isQ1Finished && !isQ2Finished) return 1;
  if (!isQ1Finished && isQ2Finished) return -1;
  if (isQ1Finished && isQ2Finished)
    return q2.value.endTimestamp - q1.value.endTimestamp;
  return q1.value.endTimestamp - q2.value.endTimestamp;
});

if (JSON.stringify(questions) != JSON.stringify(state.questions)) {
  State.update({ questions: questions });
}

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && State.update({ showQuestion: false });
  };
}

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const renderModal = () => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        state.showQuestion && { display: "block", backgroundColor: "#7e7e7e70" }
      }
      tabindex="-1"
      role="dialog"
      onClick={closeModalClickingOnTransparent()}
    >
      <div className="modal-dialog" style={{ maxWidth: "95%" }} role="document">
        <div
          className="modal-content"
          style={{ backgroundColor: "rgb(230, 230, 230)" }}
        >
          <div className="modal-header flex-row-reverse">
            <button
              type="button"
              className="close"
              dataDismiss="modal"
              ariaLabel="Close"
              onClick={() => State.update({ showQuestion: false })}
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
              src={`${widgetOwner}/widget/newVotingInterface`}
              props={{
                blockHeight: state.modalBlockHeight,
                shouldDisplayViewAll: props.accountId == undefined,
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => State.update({ showQuestion: false })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderQuestions = () => {
  return questions.map((question) => {
    return (
      <div
        className="m-2 py-3 px-4"
        style={{
          boxSizing: "border-box",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
          backgroundColor: "white",
          borderRadius: "1rem",
          cursor: "pointer",
          width: "48%",
        }}
        onClick={() => {
          State.update({
            showQuestion: true,
            modalBlockHeight: question.blockHeight,
          });
        }}
      >
        {onlyUsersPolls ? (
          <>
            <Widget
              src={
                "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/minimalistQuestionHeader"
              }
              props={{ ...question }}
            />
            <Widget
              src={
                "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/minimalistQuestionGeneralInfo"
              }
              props={{ ...question }}
            />
          </>
        ) : (
          <>
            <Widget
              src={`${widgetOwner}/widget/answersHeader`}
              props={{ ...question }}
            />
            <Widget
              src={`${widgetOwner}/widget/${
                displayAnswerWidgetNames[question.value.questionType]
              }`}
              props={{ ...question }}
            />
          </>
        )}
      </div>
    );
  });
};

return (
  <div
    style={{
      borderRadius: "3px",
      backgroundColor: "rgb(230, 230, 230)",
    }}
  >
    <div className="d-flex flex-wrap justify-content-between">
      {renderQuestions()}
    </div>
    {state.showQuestion && renderModal()}
    {/*TODO add a page picker instead the infinite scroll?*/}
  </div>
);
