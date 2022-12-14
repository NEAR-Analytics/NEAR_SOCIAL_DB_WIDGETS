State.init({ showQuestion: false, modalBlockHeight: 0 });

const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

function closeModalClickingOnTransparent() {
  console.log("n3");
  return (e) => {
    e.target.id == "modal" && State.update({ showQuestion: false });
  };
}

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
              src={`${context.accountId}/widget/newVotingInterface`}
              props={{ blockHeight: state.modalBlockHeight }}
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
    console.log(question);
    return (
      <div
        className="my-5 py-3 px-4"
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          State.update({
            showQuestion: true,
            modalBlockHeight: question.blockHeight,
          });
        }}
      >
        <Widget
          src={`${context.accountId}/widget/answersHeader`}
          props={{ ...question }}
        />
        <Widget
          src={`${context.accountId}/widget/${
            displayAnswerWidgetNames[question.value.questionType]
          }`}
          props={{ ...question }}
        />
      </div>
    );
  });
};

return (
  <div
    style={{
      borderRadius: "3px",
      padding: "0px 2%",
    }}
  >
    {renderQuestions()}
    {state.showQuestion && renderModal()}
  </div>
);
