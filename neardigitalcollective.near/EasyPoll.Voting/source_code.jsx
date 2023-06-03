State.init({
    showQuestionsByThisUser: false,
    descriptionHeightLimited: true,
    poll: {},
    polls: [{}],
    profile: {},
    pollsByThisCreator: [{}],
    answers: [{}],
  });
  
  if (!props.isPreview && !props.blockHeight) {
    return "Prop block height wasn't provided";
  }

  if(!props.canOperate) {
    return "You are not allowed to vote"
  }
  
  const widgetOwner = "neardigitalcollective.near";
  const indexVersion = props.indexVersion ?? "3.2.0";
  const canOperate = props.canOperate;
  const whitelist = props.whitelist;
  
  let isPreview = props.isPreview ?? false;
  let shouldDisplayViewAll = props.shouldDisplayViewAll;
  
  let questionBlockHeight = Number(props.blockHeight);

  const polls =
    !props.previewInfo && Social.index("poll_question", `question-v${indexVersion}`);
  if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
    State.update({ polls: polls });
  }
  
  if (!state.polls) {
    return "Loading";
  } else {
    const poll =
      props.previewInfo ??
      state.polls.find((q) => q.blockHeight == questionBlockHeight);
  
    if (JSON.stringify(poll) != JSON.stringify(state.poll)) {
      State.update({ poll: poll });
    }
  
    if (!state.poll && !isPreview) {
      return "Loading... ";
    }
  }
  
  
  let profile = Social.getr(`${state.poll.accountId}/profile`);
  
  if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
    State.update({ profile: profile });
  }
  
  // if (!profile) {
  //   return "Loading";
  // }
  
  let pollsByThisCreator = Social.index("poll_question", `question-v${indexVersion}`, {
    accountId: state.poll.accountId,
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
  
  function getValidAnswersQtyFromQuestion(questionBlockHeight) {
    // let poll = polls.find(q => q.blockHeight == questionBlockHeight)
  
    const answers = Social.index("poll_question", `answer-v${indexVersion}`);
  
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
    //TODO show only the 2 polls
    return state.pollsByThisCreator.map((pollByCreator, index) => {
      let divStyle =
        index == 0
          ? { backGroundColor: "white" }
          : {
              backGroundColor: "white",
              paddingTop: "1rem",
              borderTop: "1px solid #ced4da",
            };
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
                backgroundColor: isUpcoming(pollByCreator)
                  ? "#FFF3B4"
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
                src={`${widgetOwner}/widget/EasyPoll.Questions`}
                props={{ accountId: state.poll.accountId, onlyUser: true, indexVersion, canOperate }}
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
      <Widget
        src={`${widgetOwner}/widget/EasyPoll.Voting2`}
        props={{
          state,
          stateUpdate: (data) => State.update(data),
          sliceString,
          profile,
          isUpcoming,
          isActive,
          widgetOwner,
          questionBlockHeight,
          showDescription,
          questionsByCreator,
          shouldDisplayViewAll: true,
          renderQuestionsByThisCreator,
          isPreview,
          renderModal,
          indexVersion,
          whitelist,
        }}
      />
    </>
  );
  