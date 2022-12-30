State.init({ showQuestion: false, modalBlockHeight: 0 });

let isShort = props.isShort;
let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

function isQuestionActive(question) {
  return (
    question.value.startTimestamp < Date.now() &&
    Date.now() < question.value.endTimestamp
  );
}

function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  // let questionParams = questions.find(q => q.blockHeight == questionBlockHeight)

  const answers = Social.index("poll_question", "answer-v3.0.1");
  if (!answers) {
    return "Loading";
  }
  const answersFromThisQuestion = answers.filter(
    (a) => a.value.questionBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisQuestion.map((a) => a.accountId);
  const usersWithAnswersWithoutDuplicates = usersWithAnswers.filter(
    (u, index) => usersWithAnswers.indexOf(u) == index
  );
  return usersWithAnswersWithoutDuplicates.length;
}

function closeModalClickingOnTransparent() {
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

return (
  <>
    {questions.map((questionByCreator, index) => {
      console.log("qbc: ", questionByCreator);
      if ((isShort && index < 2) || !isShort) {
        return (
          <div
            className="mt-2"
            style={
              index == 0
                ? { cursor: "pointer", backGroundColor: "white" }
                : {
                    paddingTop: "1rem",
                    backGroundColor: "white",
                    borderTop: "1px solid #ced4da",
                    marginTop: "1rem",
                    cursor: "pointer",
                  }
            }
            onClick={() => {
              State.update({
                showQuestion: true,
                modalBlockHeight: questionByCreator.blockHeight,
              });
            }}
          >
            <div className="d-flex align-content-center">
              <div
                className="d-flex justify-content-center"
                style={{
                  maxHeight: "2.8rem",
                  aspectRatio: "1",
                  borderRadius: "16px",
                  backgroundColor: "#F2F6FA",
                  marginRight: "0.8rem",
                }}
              >
                {questionByCreator.value.questionType == "0" ? (
                  <i
                    className="bi bi-file-text"
                    style={{ padding: "0.6rem 0.8rem" }}
                  ></i>
                ) : (
                  questionByCreator.value.questionType == "1" && (
                    <i
                      style={{
                        transform: "rotate(90deg)",
                        padding: "0.6rem 0.8rem",
                      }}
                      className="bi bi-bar-chart-line"
                    ></i>
                  )
                )}
              </div>
              <p style={{ margin: "0.5rem 0 0 0", fontWeight: "500" }}>
                {sliceString(questionByCreator.value.title, 20)}
              </p>
            </div>
            <div className="d-flex">
              <div
                className="d-flex justify-content-center"
                style={{
                  width: "2.8rem",
                  marginRight: "0.8rem",
                }}
              >
                {/*Structural div, do not delete*/}
              </div>
              <div className="d-flex w-100 justify-content-between flex-nowrap text-secondary mb-2">
                <div>
                  <i className="bi bi-people"></i>
                  <span>
                    {getValidAnswersQtyFromQuestion(
                      questionByCreator.blockHeight
                    )}
                  </span>
                </div>
                <span>
                  Ends
                  <Widget
                    src={`silkking.near/widget/timeAgo`}
                    props={{
                      timeInFuture: questionByCreator.value.endTimestamp,
                    }}
                  />
                </span>
                <span
                  style={{
                    backgroundColor: isQuestionActive(questionByCreator)
                      ? "#D9FCEF"
                      : "#FFE5E5",

                    height: "1.5rem",
                    width: "4rem",
                    textAlign: "center",
                    borderRadius: "16px",
                    marginRight: "1rem",
                    lineHeight: "1.5rem",
                    fontSize: "0.8rem",
                    letterSpacing: "-0.025rem",
                    color: isQuestionActive(questionByCreator)
                      ? "#00B37D"
                      : "#FF4747",
                    fontWeight: "500",
                  }}
                >
                  {isQuestionActive(questionByCreator) ? "Active" : "Closed"}
                </span>
              </div>
            </div>
          </div>
        );
      }
    })}
    {state.showQuestion && renderModal()}
  </>
);
