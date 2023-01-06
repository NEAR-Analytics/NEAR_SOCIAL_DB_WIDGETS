if (!props.isPreview && !props.blockHeight) {
  return "Prop block height wasn't provided";
}

let isPreview = props.isPreview ?? false;
let shouldDisplayViewAll = props.shouldDisplayViewAll;

let questionBlockHeight = Number(props.blockHeight);
const polls =
  !props.previewInfo && Social.index("poll_question", "question-v3.0.2");

if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!polls) {
  return "Loading";
}

const poll =
  props.previewInfo ?? polls.find((q) => q.blockHeight == questionBlockHeight);

if (JSON.stringify(poll) != JSON.stringify(state.poll)) {
  State.update({ poll: poll });
}

if (!state.poll && !isPreview) {
  return "Loading...";
}

let profile = Social.getr(`${poll.accountId}/profile`);

if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

if (!profile) {
  return "Loading";
}

let pollsByThisCreator = Social.index("poll_question", "question-v3.0.2", {
  accountId: poll.accountId,
});

if (
  JSON.stringify(pollsByThisCreator) != JSON.stringify(state.pollsByThisCreator)
) {
  State.update({ pollsByThisCreator: pollsByThisCreator });
}

if (!state.pollsByThisCreator) {
  return "Loading";
}

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

function transformDateFormat(date) {
  return new Date(date).toLocaleDateString();
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

State.init({
  showQuestionsByThisUser: false,
  descriptionHeightLimited: true,
  polls: [{}],
  profile: {},
  pollsByThisCreator: [{}],
  answers: [{}],
});

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  // let poll = polls.find(q => q.blockHeight == questionBlockHeight)

  const answers = Social.index("poll_question", "answer-v3.0.2");

  if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
    State.update({ answers: answers });
  }

  if (!state.answers) {
    return "Loading";
  }
  const answersFromThisPoll = state.answers.filter(
    (a) => a.value.questionBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisPoll.map((a) => a.accountId);
  const usersWithAnswersWithoutDuplicates = usersWithAnswers.filter(
    (u, index) => usersWithAnswers.indexOf(u) == index
  );
  return usersWithAnswersWithoutDuplicates.length;
}

const renderQuestionsByThisCreator = () => {
  //TODO show only the 2 polls
  return state.pollsByThisCreator.map((pollByCreator, index) => {
    let divStyle =
      index == 0
        ? {}
        : { backGroundColor: "white", borderTop: "1px solid #ced4da" };
    return (
      <div style={divStyle}>
        <p style={{ fontWeight: "500" }}>
          {sliceString(pollByCreator.value.title, 20)}
        </p>
        <div className="d-flex justify-content-between flex-nowrap text-secondary mb-2">
          <div>
            <i className="bi bi-people"></i>
            <span>
              {getValidAnswersQtyFromQuestion(pollByCreator.blockHeight)}
            </span>
          </div>
          <span>
            Ends
            <Widget
              src={`silkking.near/widget/timeAgo`}
              props={{
                timeInFuture: pollByCreator.value.endTimestamp,
                reduced: true,
              }}
            />
          </span>
          <span
            style={{
              backgroundColor: isUpcoming(pollByCreator)
                ? "#ffe06e"
                : isActive(pollByCreator)
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
              color: isUpcoming(pollByCreator)
                ? "#FFC905"
                : isActive(pollByCreator)
                ? "#00B37D"
                : "#FF4747",
              fontWeight: "500",
            }}
          >
            {isUpcoming(pollByCreator)
              ? "Upcoming"
              : isActive(pollByCreator)
              ? "Active"
              : "Closed"}
          </span>
        </div>
      </div>
    );
  });
};

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && State.update({ showQuestionsByThisUser: false });
  };
}

const renderModal = () => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        state.showQuestionsByThisUser && {
          display: "block",
          backgroundColor: "#7e7e7e70",
        }
      }
      tabindex="-1"
      role="dialog"
      onClick={closeModalClickingOnTransparent()}
    >
      <div
        className="modal-dialog"
        style={{ maxWidth: "100%" }}
        role="document"
      >
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
              onClick={() => State.update({ showQuestionsByThisUser: false })}
            >
              <span ariaHidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body"
            style={{
              width: "90%",
              borderRadius: "1rem",
              margin: "0 auto",
            }}
          >
            <Widget
              src={`${widgetOwner}/widget/showQuestionsHandler`}
              props={{ accountId: poll.accountId }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => State.update({ showQuestionsByThisUser: false })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function showDescription(description) {
  if (state.descriptionHeightLimited && description.length > 501) {
    return description.slice(0, 500) + "...";
  } else {
    return description;
  }
}

return (
  <>
    <div
      className="d-flex content-align-start justify-content-between"
      style={{ borderRadius: "3px", padding: "2rem 3rem" }}
    >
      <div style={{ width: "75%", marginRight: "2rem" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                profile,
                question: poll.accountId,
                className: "float-start d-inline-block me-2",
                style: {
                  width: "3.5rem",
                  aspectRatio: "1",
                  marginLeft: "1rem",
                  borderRadius: "100%",
                  overflow: "hidden",
                },
              }}
            />
            <div>
              <span className="mr-3" style={{ fontWeight: "300" }}>
                Created by
              </span>
              <span style={{ fontWeight: "500" }}>
                {sliceString(poll.accountId, 18)}
              </span>
            </div>
          </div>

          {Date.now() < poll.value.endTimestamp && (
            <>
              <span>
                Start {new Date(poll.value.startTimestamp).toLocaleDateString()}
              </span>

              <span
                style={{
                  paddingLeft: "1.5rem",
                  borderLeft: "2px solid #ced4da",
                  height: "max-content",
                }}
              >
                Ends
                <Widget
                  src={`silkking.near/widget/timeAgo`}
                  props={{
                    timeInFuture: poll.value.endTimestamp,
                    reduced: true,
                  }}
                />
              </span>
            </>
          )}
          <span
            style={{
              backgroundColor: isUpcoming(poll)
                ? "#ffe06e"
                : isActive(poll)
                ? "#D9FCEF"
                : "#FFE5E5",

              height: "2.1rem",
              width: "5rem",
              textAlign: "center",
              borderRadius: "16px",
              marginRight: "1rem",
              lineHeight: "1.9rem",
              fontSize: "1rem",
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
        <div className="d-flex my-3">
          <div
            style={{
              height: "inherit",
              backgroundColor: "#AAC8F7",
              width: "0.5rem",
              minWidth: "5px",
              marginRight: "0.5rem",
              borderRadius: "8px",
            }}
          >
            {/*Decorative div, do not delete*/}
          </div>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "2rem",
              letterSpacing: "0.1px",
              color: "#010A2D",
              wordWrap: "anywhere",
            }}
          >
            {poll.value.title}
          </h2>
        </div>
        <div
          className="p-3"
          style={{
            position: "relative",
            border: "1.5px solid rgb(206, 212, 218)",
            borderRadius: "24px",
            wordWrap: "anywhere",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
              marginBottom: "1.2rem",
            }}
          >
            Description
          </h3>
          <p style={{ fontSize: "0.9rem" }}>
            {showDescription(poll.value.description)}
          </p>
          {poll.value.description.length > 501 &&
          !state.descriptionHeightLimited ? (
            <div
              style={{
                position: "absolute",
                bottom: "-1.125rem",
                left: "0",
                right: "0",
                marginRight: "auto",
                marginLeft: "auto",
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  fontSize: "1.2rem",
                  display: "inline-block",
                  backgroundColor: "white",
                  padding: "0 1rem",
                  cursor: "pointer",
                }}
                onClick={() => State.update({ descriptionHeightLimited: true })}
              >
                Show less <i className="bi bi-arrow-up"></i>
              </h4>
            </div>
          ) : (
            poll.value.description.length > 501 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.125rem",
                  left: "0",
                  right: "0",
                  marginRight: "auto",
                  marginLeft: "auto",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.2rem",
                    display: "inline-block",
                    backgroundColor: "white",
                    padding: "0 1rem",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    State.update({ descriptionHeightLimited: false })
                  }
                >
                  Show more <i className="bi bi-arrow-down"></i>
                </h4>
              </div>
            )
          )}
        </div>
        {poll.value.tgLink != "" && poll.value.tgLink != undefined && (
          <div
            className="mt-3 d-flex justify-content-between"
            style={{
              border: "1.5px solid #D4E5FB",
              padding: "1.2rem 1.7rem",
              borderRadius: "24px",
            }}
          >
            <div className="d-flex">
              <i
                className="bi bi-people d-flex align-items-center justify-content-center"
                style={{
                  height: "100%",
                  aspectRatio: "1",
                  backgroundColor: "#2F5BCF",
                  borderRadius: "14px",
                  marginRight: "1rem",
                  color: "white",
                }}
              ></i>
              <div>
                <p
                  className="m-0"
                  style={{
                    color: "#2F5BCF",
                    fontWeight: "500",
                    fontSize: "0.7rem",
                  }}
                >
                  Discussion link
                </p>
                <h6>
                  <a style={{ color: "#2346B1" }} href={poll.value.tgLink}>
                    {sliceString(poll.value.tgLink, 30)}
                  </a>
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <a
                target="_blank"
                href={poll.value.tgLink}
                style={{ userSelect: "none" }}
              >
                <i
                  className="bi bi-box-arrow-up-right"
                  style={{
                    color: "#2F5BCF",
                    cursor: "pointer",
                  }}
                ></i>
              </a>
              <i
                className="bi bi-clipboard"
                style={{
                  userSelect: "none",
                  color: "#2F5BCF",
                  cursor: "pointer",
                  marginLeft: "0.8rem",
                }}
                onClick={() => clipboard.writeText(poll.value.tgLink)}
              ></i>
            </div>
          </div>
        )}
        {poll.value.questions.map((question) => {
          return (
            <div
              style={{
                border: "1.5px solid rgb(206, 212, 218)",
                borderRadius: "24px",
                position: "relative",
              }}
              className="p-3 my-3"
            >
              <h4>{question.question}</h4>

              {poll && (
                <Widget
                  src={`${widgetOwner}/widget/allVotingWidget`}
                  props={{
                    blockHeight: poll.blockHeight,
                    isPreview,
                  }}
                />
              )}
            </div>
          );
        })}
        //TODO add voting button and it's logic
      </div>
      <div style={{ minWidth: "17rem" }}>
        {questionsByCreator.length != 1 && (
          <>
            <div
              className="d-flex"
              style={
                shouldDisplayViewAll
                  ? {
                      justifyContent: "space-between",
                      alignItems: "center",
                    }
                  : {
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }
              }
            >
              <h5>Polls by creator ({state.pollsByThisCreator.length})</h5>

              {shouldDisplayViewAll && (
                <div style={{ margin: "1rem 0", textAlign: "center" }}>
                  <p
                    style={{
                      color: "#2346B1",
                      fontWeight: "500",
                      fontSize: "1rem",
                      margin: "0",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      State.update({ showQuestionsByThisUser: true });
                    }}
                  >
                    View All <i className="bi bi-arrow-right"></i>
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                border: "1px solid #ced4da",
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
              }}
            >
              {renderQuestionsByThisCreator()}
            </div>
          </>
        )}
      </div>
    </div>
    {state.showQuestionsByThisUser && renderModal()}
  </>
);
