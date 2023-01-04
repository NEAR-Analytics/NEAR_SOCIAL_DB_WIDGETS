State.init({
  questions: {},
  showQuestion: false,
  modalBlockHeight: question.blockHeight,
});

const onlyUsersPolls = props.onlyUser ?? false;

const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

let questions = Social.index("poll_question", "question-v3.0.1");

if (!questions) {
  return "Loading";
}

if (onlyUsersPolls) {
  questions = questions.filter((question) => {
    if (question.accountId == context.accountId) {
      return true;
    } else {
      return false;
    }
  });
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

//TODO review this
let usersMakingQuestions = [];
for (let i = 0; i < questions.length; i++) {
  if (!usersMakingQuestions.includes(questions[i].accountId)) {
    usersMakingQuestions.push(questions[i].accountId);
  }
}

if (JSON.stringify(questions) != JSON.stringify(state.questions)) {
  State.update({ questions: questions });
}

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

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
                shouldDisplayViewAll: false,
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

const renderQuestions = (onlyUsersPolls) => {
  if (onlyUsersPolls) {
    return questions.map((question, index) => {
      return (
        <div
          className="mx-1 py-3 px-4 my-2"
          style={{
            boxSizing: "border-box",
            boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
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
        </div>
      );
    });
  } else {
    return (
      <>
        {usersMakingQuestions.map((accountId, index) => {
          return (
            <div
              className="mx-1 py-3 px-4 my-2"
              style={{
                boxSizing: "border-box",
                boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
                backgroundColor: "white",
                borderRadius: "1rem",
              }}
            >
              <Widget
                src={`${widgetOwner}/widget/displayQuestionHeader`}
                props={{ allUsersQuestions: questions, accountId }}
              />
              <Widget
                src={`${widgetOwner}/widget/questionsByCreator`}
                props={{ accountId }}
              />
            </div>
          );
        })}
      </>
    );
  }
};

return (
  <div
    style={{
      borderRadius: "3px",
      backgroundColor: "rgb(230, 230, 230)",
    }}
  >
    <div
      style={
        onlyUsersPolls
          ? {
              display: "grid",
              gridTemplateColumns: "auto auto",
            }
          : {
              display: "grid",
              gridTemplateColumns: "auto auto auto",
            }
      }
    >
      {renderQuestions(onlyUsersPolls)}
    </div>
    {/*TODO add a page picker instead the infinite scroll?*/}
    {state.showQuestion && renderModal()}
  </div>
);
