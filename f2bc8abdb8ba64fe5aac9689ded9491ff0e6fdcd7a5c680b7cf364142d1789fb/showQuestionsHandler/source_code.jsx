let sharedBlockHeight = props.sharedBlockHeight;

State.init({
  polls: {},
  showQuestion: false,
  modalBlockHeight: sharedBlockHeight ?? question.blockHeight,
});

let globalAccountId = props.accountId ?? context.accountId;

const onlyUsersPolls = props.onlyUser ?? false;

let polls = Social.index("poll_question", "question-v3.1.0");

if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!polls) {
  return "Loading";
}

if (onlyUsersPolls) {
  polls = state.polls.filter((poll) => {
    if (poll.accountId == globalAccountId) {
      return true;
    } else {
      return false;
    }
  });
}

polls = polls.sort((q1, q2) => {
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
for (let i = 0; i < polls.length; i++) {
  if (!usersMakingQuestions.includes(polls[i].accountId)) {
    usersMakingQuestions.push(polls[i].accountId);
  }
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
          <div className="modal-body" style={{ backgroundColor: "#FAFAFB" }}>
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

const renderPolls = (onlyUsersPolls) => {
  if (onlyUsersPolls) {
    return polls.map((poll, index) => {
      return (
        <div
          className="mx-1 py-3 px-4 my-2"
          style={
            polls.length == 1
              ? {
                  boxSizing: "border-box",
                  boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  maxWidth: "40vw",
                }
              : {
                  boxSizing: "border-box",
                  boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
                  backgroundColor: "white",
                  borderRadius: "1rem",
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
          <Widget
            src={
              "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/minimalistQuestionHeader"
            }
            props={{ ...poll }}
          />
          <Widget
            src={
              "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/minimalistQuestionGeneralInfo"
            }
            props={{ ...poll }}
          />
        </div>
      );
    });
  } else {
    return (
      <>
        {usersMakingQuestions.map((accountId) => {
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
                props={{ allUsersQuestions: polls, accountId }}
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
              gridTemplateColumns: " repeat(2, 1fr)",
            }
          : {
              display: "grid",
              gridTemplateColumns: " repeat(3, 1fr)",
            }
      }
    >
      {renderPolls(onlyUsersPolls)}
    </div>
    {/*TODO add a page picker instead the infinite scroll?*/}
    {state.showQuestion || (sharedBlockHeight && renderModal())}
  </div>
);
