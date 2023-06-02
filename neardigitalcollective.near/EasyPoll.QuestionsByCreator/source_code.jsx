State.init({
  showQuestion: false,
  modalBlockHeight: 0,
  polls: {},
  answers: {},
});

let widgetOwner = "neardigitalcollective.near";

let isShort = props.isShort;
let polls = Social.index("poll_question", "question-v3.2.0", {
  accountId: props.accountId,
});

if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!polls) {
  return "Loading";
}

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

function isActive(poll) {
  return (
    poll.value.startTimestamp < Date.now() &&
    Date.now() < poll.value.endTimestamp
  );
}

function isUpcoming(poll) {
  return poll.value.startTimestamp > Date.now();
}

function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  // let questionParams = polls.find(q => q.blockHeight == questionBlockHeight)

  const answers = Social.index("poll_question", "answer-v3.2.0");

  if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
    State.update({ answers: answers });
  }

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

const renderPollTypeIcon = () => {
  let allPollTypes = [];
  for (let i = 0; i < poll.value.questions.length; i++) {
    if (!allPollTypes.includes(poll.value.questions[i].questionType)) {
      allPollTypes.push(poll.value.questions[i].questionType);
    }
  }

  return allPollTypes.length == 1 &&
    (allPollTypes[0] == "0" || allPollTypes[0] == "1") ? (
    <i className="bi bi-pie-chart" style={{ padding: "0.6rem 0.8rem" }}></i>
  ) : allPollTypes.length == 1 && allPollTypes[0] == "2" ? (
    <i
      style={{
        transform: "rotate(90deg)",
        padding: "0.6rem 0.8rem",
      }}
      className="bi bi-bar-chart-line"
    ></i>
  ) : allPollTypes.length == 1 && allPollTypes[0] == "3" ? (
    <i className="bi bi-file-text" style={{ padding: "0.6rem 0.8rem" }}></i>
  ) : (
    <i className="bi bi-collection" style={{ padding: "0.6rem 0.8rem" }}></i>
  );
};

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
          <div className="modal-body" style={{ backgroundColor: "#FAFAFB" }}>
            {console.log(state.modalBlockHeight)}
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.Voting`}
              props={{
                blockHeight: state.modalBlockHeight,
                shouldDisplayViewAll: true,
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
    {polls.map((poll, index) => {
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
                modalBlockHeight: poll.blockHeight,
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
                {renderPollTypeIcon(poll)}
              </div>
              <p style={{ margin: "0.5rem 0 0 0", fontWeight: "500" }}>
                {sliceString(poll.value.title, 20)}
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
                    {getValidAnswersQtyFromQuestion(poll.blockHeight)}
                  </span>
                </div>
                <span>
                  {Date.now() < poll.value.startTimestamp ||
                  (Date.now() > poll.value.startTimestamp &&
                    Date.now() < poll.value.endTimestamp) ? (
                    <span>Ends</span>
                  ) : (
                    <span>Ended</span>
                  )}
                  <Widget
                    src={`silkking.near/widget/timeAgo`}
                    props={{
                      reduced: true,
                      timeInFuture: poll.value.endTimestamp,
                    }}
                  />
                </span>
                <span
                  style={{
                    backgroundColor: isUpcoming(poll)
                      ? "#FFF3B4"
                      : isActive(poll)
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
                    color: isUpcoming(poll)
                      ? "#FFC905"
                      : isActive(poll)
                      ? "#00B37D"
                      : "#FF4747",
                    fontWeight: "500",
                  }}
                >
                  {isUpcoming(poll)
                    ? "Upcoming"
                    : isActive(poll)
                    ? "Active"
                    : "Closed"}
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
