if (!props.isPreview && !props.blockHeight) {
  return "Property blockHeight not set";
}

const isQuestionOpen =
  questionParams.value.startTimestamp < Date.now() &&
  Date.now() < questionParams.value.endTimestamp;

// Utility function
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

function getQuestion(blockHeight) {
  const questions = Social.index("poll_question", "question-v3.0.1");
  if (!questions) {
    return "Loading";
  }
  return questions.find((q) => q.blockHeight == blockHeight);
}

// Discards answers that were posted after question's end date
function getTimeRelatedValidAnswers(answers) {
  const questionParams = getQuestion(props.blockHeight);
  let low = 0;
  let high = answers.length - 1;
  const questionEndTimestamp = questionParams.value.endTimestamp;
  let endBlockTimestamp = getBlockTimestamp(answers[high].blockHeight);
  console.log(4, questionParams);
  if (endBlockTimestamp < questionEndTimestamp) return answers;
  // For tries to exceed 50 there should be more than 10e15 answers which will never happen. But if you mess up and make an infinite cycle it will crash. This way it will never be infinite
  let tries = 50;
  while (high - low > 1 && tries > 0) {
    tries--;
    let curr = Math.floor((high - low) / 2) + low;
    let currBlockTimestamp = getBlockTimestamp(answers[curr].blockHeight);
    if (currBlockTimestamp < questionEndTimestamp) {
      low = curr;
    } else {
      high = curr;
    }
  }
  // Slice ignores the index of the last one. Since high - low == 1, high = low + 1
  return answers.slice(0, high);
}

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" &&
      State.update({
        showVeryfyInstructionModal: false,
        showVeryfyFailedModal: false,
      });
  };
}

let isPreview = props.isPreview;
const questionBlockHeight = props.blockHeight;
State.init({
  vote: "",
  showErrorsInForm: false,
  verifiedStatus: "verifying",
  showVeryfyInstructionModal: false,
  showVeryfyFailedModal: false,
});

const answers = Social.index("poll_question", "answer-v3.0.1");
if (!answers) {
  return "Loading";
}
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);
const onTimeAnswersToThisQuestion = getTimeRelatedValidAnswers(
  answersToThisQuestion
);

let usersThatAlreadyReplied = [];
let validAnswersToThisQuestion = onTimeAnswersToThisQuestion.filter((a) => {
  const didUserAlreadyVoted = usersThatAlreadyReplied.includes(a.accountId);
  if (!didUserAlreadyVoted) {
    usersThatAlreadyReplied.push(a.accountId);
  }
  return !didUserAlreadyVoted;
});

let userVote;
const loggedAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    answersToThisQuestion.find((a) => a.accountId == loggedAccountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();

const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: "answer-v3.0.1",
          value: {
            answer: state.vote,
            questionBlockHeight: props.blockHeight,
          },
        },
        undefined,
        0
      ),
    },
  };
};

const isValidInput = () => {
  let result = state.vote != "";
  return result && !isPreview;
};

const renderAnswers = () => {
  return validAnswersToThisQuestion.map((answer) => {
    return (
      <Widget
        src="silkking.near/widget/answer_poll-comment-container"
        props={{ blockHeight: answer.blockHeight }}
      />
    );
  });
};

const renderModal = () => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        (state.showVeryfyInstructionModal || state.showVeryfyFailedModal) && {
          display: "block",
          backgroundColor: "#7e7e7e70",
        }
      }
      tabindex="-1"
      role="dialog"
      onClick={closeModalClickingOnTransparent()}
    >
      <div className="modal-dialog" style={{ maxWidth: "90%" }} role="document">
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
              onClick={() =>
                State.update({
                  showVeryfyInstructionModal: false,
                  showVeryfyFailedModal: false,
                })
              }
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
              backgroundColor: "white",
            }}
          >
            {state.showVeryfyInstructionModal ? (
              <p className="text-center">
                Please complete the Proof of Humanity on the other tab. Once you
                finish, the process might take a few minutes. Please, reload
                this tab
              </p>
            ) : (
              <p className="text-center text-danger">
                The verification has failed. Please verify again.
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() =>
                State.update({
                  showVeryfyInstructionModal: false,
                  showVeryfyFailedModal: false,
                })
              }
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
  <div>
    {!isQuestionOpen ? "This question is already closed" : ""}
    {hasVoted ? (
      <p
        className="text-primary"
        style={{ textAlign: "center", fontWeight: "500" }}
      >
        You have already voted
      </p>
    ) : (
      isQuestionOpen && (
        <div>
          <textarea
            value={state.vote}
            onChange={(e) => State.update({ vote: e.target.value })}
            style={{ width: "100%" }}
          />

          {state.verifiedStatus == "verified" ? (
            isValidInput() ? (
              <CommitButton
                className="my-2 btn btn-primary"
                data={getPublicationParams()}
              >
                Done
              </CommitButton>
            ) : (
              <button
                className="my-2 btn btn-primary"
                onClick={() => State.update({ showErrorsInForm: true })}
              >
                Done
              </button>
            )
          ) : state.verifiedStatus == "verifying" ? (
            <button type="button" disabled className="my-2 btn btn-primary">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Verifying...</span>
            </button>
          ) : state.verifiedStatus == "failed" ? (
            <></>
          ) : (
            state.verifiedStatus == "notVerified" && (
              <a
                href="http://localhost:1234"
                target="_blank"
                onClick={() =>
                  State.update({ showVeryfyInstructionModal: true })
                }
              >
                <button className="my-2 btn btn-primary">Verify</button>
              </a>
            )
          )}
        </div>
      )
    )}
    {renderAnswers()}
    {(state.showVeryfyInstructionModal || state.showVeryfyFailedModal) &&
      renderModal()}
  </div>
);
