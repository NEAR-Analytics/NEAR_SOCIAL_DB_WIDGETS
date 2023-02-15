/********** Start validations ************/

if (!props.isPreview && !props.blockHeight) {
  return "Prop block height wasn't provided";
}

/********** End validations ************/

/********** Start initialization ************/

State.init({
  showQuestionsByThisUser: false,
  descriptionHeightLimited: true,
  poll: {},
  polls: [{}],
  profile: {},
  pollsByThisCreator: [{}],
  answers: [{}],
});

let isPreview = props.isPreview ?? false;
let shouldDisplayViewAll = props.shouldDisplayViewAll;

let questionBlockHeight = Number(props.blockHeight);

const polls =
  !props.previewInfo && Social.index("poll_question", "question-v3.1.1");
if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!state.polls) {
  return "Loading";
}

const poll =
  props.previewInfo ??
  state.polls.find((q) => q.blockHeight == questionBlockHeight);

if (JSON.stringify(poll) != JSON.stringify(state.poll)) {
  State.update({ poll: poll });
}

if (!state.poll && !isPreview) {
  return "Loading...";
}

function getPollStatus(poll) {
  return isUpcoming(poll)
    ? QUESTION_STATUSES.UPCOMING
    : isActive(poll)
    ? QUESTION_STATUSES.ACTIVE
    : QUESTION_STATUSES.CLOSED;
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

const pollStatus = getPollStatus(state.poll);

let profile = Social.getr(`${state.poll.accountId}/profile`);
if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

if (!profile) {
  return "Loading";
}

let pollsByThisCreator = Social.index("poll_question", "question-v3.1.1", {
  accountId: state.poll.accountId,
});

if (
  JSON.stringify(pollsByThisCreator) != JSON.stringify(state.pollsByThisCreator)
) {
  State.update({ pollsByThisCreator });
}

if (!state.pollsByThisCreator) {
  return "Loading";
}

/********** End initialization ************/

/********** Start constants ************/

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const QUESTION_STATUSES = {
  ACTIVE: {
    id: 0,
    text: "Active",
    backgroundColor: "#D9FCEF",
    fontColor: "#00B37D",
  },
  CLOSED: {
    id: 1,
    text: "Closed",
    backgroundColor: "#FFE5E5",
    fontColor: "#FF4747",
  },
  UPCOMING: {
    id: 2,
    text: "Upcoming",
    backgroundColor: "#FFF3B4",
    fontColor: "#FFC905",
  },
};

/********** End constants ************/

/********** Start styles ************/
/********** End styles ************/

/********** Start functions ************/

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

function transformDateFormat(date) {
  return new Date(date).toLocaleDateString();
}

function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  const answers = Social.index("poll_question", "answer-v3.1.1");

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

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && State.update({ showQuestionsByThisUser: false });
  };
}

function descriptionText(description) {
  if (state.descriptionHeightLimited && description.length > 501) {
    return description.slice(0, 500) + "...";
  } else {
    return description;
  }
}

/********** End functions ************/

/********** Start components ************/

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

const renderQuestionsByThisCreator = () => {
  return state.pollsByThisCreator.map((pollByCreator, index) => {
    let divStyle =
      index == 0
        ? { backGroundColor: "white" }
        : {
            backGroundColor: "white",
            paddingTop: "1rem",
            borderTop: "1px solid #ced4da",
          };
    let pollByCreatorStatus = getPollStatus(pollByCreator);
    return (
      <div style={divStyle}>
        <div className="d-flex align-items-center">
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
            {renderPollTypeIcon(pollByCreator)}
          </div>
          <p style={{ fontWeight: "500", margin: "0" }}>
            {sliceString(pollByCreator.value.title, 20)}
          </p>
        </div>
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
              backgroundColor: pollByCreatorStatus.backgroundColor,
              height: "1.5rem",
              width: "4rem",
              textAlign: "center",
              borderRadius: "16px",
              marginRight: "1rem",
              lineHeight: "1.5rem",
              fontSize: "0.8rem",
              letterSpacing: "-0.025rem",
              color: pollByCreatorStatus.fontColor,
              fontWeight: "500",
            }}
          >
            {pollByCreatorStatus.text}
          </span>
        </div>
      </div>
    );
  });
};

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
              props={{ accountId: state.poll.accountId, onlyUser: true }}
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

/********** End components ************/

/********** Start rendering ************/
return (
  <div>
    <div className="d-flex content-align-start justify-content-between">
      <div
        style={{
          width: "75%",
          maxWidth: "1000px",
          margin: "2rem 0.5rem 2rem 2rem",
          padding: "2rem",
          borderRadius: "18px",
          background: "white",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                profile,
                question: state.poll.accountId,
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
              <p style={{ margin: "0", fontWeight: "300" }}>Created by</p>
              <p style={{ fontWeight: "500" }}>
                {sliceString(state.poll.accountId, 18)}
              </p>
            </div>
          </div>

          {Date.now() < state.poll.value.endTimestamp && (
            <>
              <span>
                Started{" "}
                {new Date(state.poll.value.startTimestamp).toLocaleDateString()}
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
                    timeInFuture: state.poll.value.endTimestamp,
                    reduced: true,
                  }}
                />
              </span>
            </>
          )}
          <span
            style={{
              backgroundColor: pollStatus.backgroundColor,
              height: "2.1rem",
              width: "5rem",
              textAlign: "center",
              borderRadius: "16px",
              marginRight: "1rem",
              lineHeight: "1.9rem",
              fontSize: "1rem",
              letterSpacing: "-0.025rem",
              color: pollStatus.fontColor,
              fontWeight: "500",
            }}
          >
            {pollStatus.text}
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
            {state.poll.value.title}
          </h2>
        </div>
        <div
          style={{
            position: "relative",
            width: "max-content",
            margin: "1rem",
          }}
        >
          <Widget
            src={`${widgetOwner}/widget/shareWidget`}
            props={{ blockHeight: questionBlockHeight }}
          />
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
          <Markdown
            text={descriptionText(state.poll.value.description)}
            style={{ pointerEvent: all }}
          />

          {state.poll.value.description.length > 501 &&
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
            state.poll.value.description.length > 501 && (
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
        {state.poll.value.tgLink && state.poll.value.tgLink != "" && (
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
                  <a
                    style={{ color: "#2346B1" }}
                    href={state.poll.value.tgLink}
                  >
                    {sliceString(state.poll.value.tgLink, 30)}
                  </a>
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <a
                target="_blank"
                href={state.poll.value.tgLink}
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
                onClick={() => clipboard.writeText(state.poll.value.tgLink)}
              ></i>
            </div>
          </div>
        )}
        {
          <Widget
            src={`${widgetOwner}/widget/allVotingWidget`}
            props={{
              poll: state.poll,
              isPreview,
            }}
          />
        }
      </div>
      <div style={{ minWidth: "17rem" }}>
        <div
          style={{
            margin: "2rem 2rem 2rem 0.5rem",
            padding: "2rem",
            borderRadius: "18px",
            backgroundColor: "white",
            boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
          }}
        >
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
                  padding: "0.5rem 1rem",
                }}
              >
                {renderQuestionsByThisCreator()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    {state.showQuestionsByThisUser && renderModal()}
  </div>
);
/********** End rendering ************/
