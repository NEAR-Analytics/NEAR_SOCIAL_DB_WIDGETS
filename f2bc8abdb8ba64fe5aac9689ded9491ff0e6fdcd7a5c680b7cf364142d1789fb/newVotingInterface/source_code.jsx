if (!props.isPreview && !props.blockHeight) {
  return "Prop block height wasn't provided";
}

let isPreview = props.isPreview ?? false;
let shouldDisplayViewAll = props.shouldDisplayViewAll;

let questionBlockHeight = Number(props.blockHeight);
const questions =
  !props.previewInfo && Social.index("poll_question", "question-v3.0.1");
const questionParams =
  props.previewInfo ??
  questions.find((q) => q.blockHeight == questionBlockHeight);

let profile = Social.getr(`${questionParams.accountId}/profile`);

let questionsByThisCreator = Social.index("poll_question", "question-v3.0.1", {
  accountId: questionParams.accountId,
});

if (!questions && !props.previewInfo) {
  return "Loading...";
}

function sliceString(string, newStringLenght) {
  if (string.length > newStringLenght) {
    return string.slice(0, newStringLenght) + "...";
  }
  return string;
}

function transformDateFormat(date) {
  return new Date(date).toLocaleDateString();
}

State.init({
  showQuestionsByThisUser: false,
});

const widgetOwner = "silkking.near";
const renderVoteMultipleChoice = () => {
  if (questionParams) {
    return (
      <Widget
        src={`${widgetOwner}/widget/voteMultipleChoice`}
        props={{
          ...questionParams,
          isPreview,
        }}
      />
    );
  } else {
    return "Invalid block height provided.";
  }
};

const renderVoteText = () => {
  return (
    <Widget
      src={`${widgetOwner}/widget/voteWithText`}
      props={{ ...questionParams, isPreview }}
    />
  );
};

function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  // let questionParams = questions.find(q => q.blockHeight == questionBlockHeight)

  const answers = Social.index("poll_question", "answer-v3.0.1");
  const answersFromThisQuestion = answers.filter(
    (a) => a.value.questionBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisQuestion.map((a) => a.accountId);
  const usersWithAnswersWithoutDuplicates = usersWithAnswers.filter(
    (u, index) => usersWithAnswers.indexOf(u) == index
  );
  return usersWithAnswersWithoutDuplicates.length;
}

const renderQuestionsByThisCreator = () => {
  return questionsByThisCreator.map((questionByCreator, index) => {
    let divStyle = index == 0 ? {} : { borderTop: "1px solid #ced4da" };
    return (
      <div style={divStyle}>
        <p style={{ fontWeight: "500" }}>
          {sliceString(questionByCreator.value.title, 20)}
        </p>
        <div className="d-flex justify-content-between flex-nowrap text-secondary">
          <span>End date</span>
          <span>
            {transformDateFormat(questionByCreator.value.endTimestamp)}
          </span>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-secondary">
          <span>Votes</span>
          <span>
            ({getValidAnswersQtyFromQuestion(questionByCreator.blockHeight)})
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
              src={`${context.accountId}/widget/showQuestionsHandler`}
              props={{ accountId: questionParams.accountId }}
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

return (
  <>
    <div
      className="d-flex content-align-start justify-content-between"
      style={{ borderRadius: "3px", padding: "2rem 3rem" }}
    >
      <div style={{ width: "75%", marginRight: "2rem" }}>
        <div className="d-flex">
          <span
            style={{
              backgroundColor:
                questionParams.value.startTimestamp < Date.now() &&
                questionParams.value.endTimestamp > Date.now()
                  ? "rgb(153, 255, 153)"
                  : "rgb(255, 128, 128)",

              height: "max-content",
              width: "6rem",
              border: "1px solid rgb(0, 82, 204)",
              textAlign: "center",
              borderRadius: "80px",
              marginRight: "1rem",
            }}
          >
            {questionParams.value.startTimestamp < Date.now() &&
            questionParams.value.endTimestamp > Date.now()
              ? "Active"
              : "Closed"}
          </span>

          {Date.now() < questionParams.value.endTimestamp && (
            <span
              style={{
                paddingLeft: "1.5rem",
                borderLeft: "2px solid #ced4da",
              }}
            >
              Ends in
              <Widget
                src={`silkking.near/widget/timeAgo`}
                props={{ timeInFuture: questionParams.value.endTimestamp }}
              />
            </span>
          )}
        </div>

        <h2>{questionParams.value.title}</h2>

        <div className="d-flex">
          <span className="mr-3" style={{ fontWeight: "500" }}>
            Created by
          </span>

          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              profile,
              question: questionParams.accountId,
              className: "float-start d-inline-block me-2",
              style: {
                width: "1.5rem",
                marginLeft: "1rem",
              },
            }}
          />

          <span style={{ fontWeigth: "500" }}>
            {sliceString(questionParams.accountId, 18)}
          </span>
        </div>

        <p>{questionParams.value.description}</p>

        {questionParams.value.tgLink != "" &&
          questionParams.value.tgLink != undefined && (
            <h6>
              Discussion link:
              <a href={questionParams.value.tgLink}>
                {questionParams.value.tgLink}
              </a>
            </h6>
          )}

        <div
          style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
          className="p-3 my-3"
        >
          <h4>{questionParams.value.question}</h4>

          {questionParams.value.questionType == "0"
            ? renderVoteText()
            : renderVoteMultipleChoice()}
        </div>
      </div>
      <div style={{ minWidth: "17rem" }}>
        <h5>Information</h5>
        <div
          className="mb-2"
          style={{
            border: "1px solid #ced4da",
            borderRadius: "0.375rem",
            fontWeight: "500",
            padding: "0.5rem 1rem",
          }}
        >
          <div className="d-flex justify-content-between">
            <span>Status</span>
            <span>
              {questionParams.value.startTimestamp < Date.now() &&
              questionParams.value.endTimestamp > Date.now()
                ? "Active"
                : "Closed"}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Start date</span>
            <span>
              {transformDateFormat(questionParams.value.startTimestamp)}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span>End date</span>
            <span>
              {transformDateFormat(questionParams.value.endTimestamp)}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Creator</span>
            <span>{sliceString(questionParams.accountId, 8)}</span>
          </div>
        </div>

        {questionsByCreator.length != 1 && (
          <>
            <div className="d-flex">
              <h5>Polls by creator</h5>
              <h5 style={{ marginLeft: "0.5rem" }}>
                ({questionsByThisCreator.length})
              </h5>
            </div>

            <div
              style={{
                border: "1px solid #ced4da",
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
              }}
            >
              {renderQuestionsByThisCreator()}
              {shouldDisplayViewAll && (
                <div style={{ margin: "1rem 0", textAlign: "center" }}>
                  <button
                    className="btn btn-outline-primary w-75"
                    onClick={() => {
                      State.update({ showQuestionsByThisUser: true });
                    }}
                  >
                    View all
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    {state.showQuestionsByThisUser && renderModal()}
  </>
);
