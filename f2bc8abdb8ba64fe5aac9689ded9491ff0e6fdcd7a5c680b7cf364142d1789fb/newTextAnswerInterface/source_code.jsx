if (!props.blockHeight) {
  return "Property blockHeight not set";
}

const questionBlockHeight = props.blockHeight;
const questions = Social.index("poll_question", "question-v3.0.1");
if (!questions) {
  return "Loading";
}
const questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);
State.init({ vote: "", showErrorsInForm: false });

const answers = Social.index("poll_question", "answer-v3.0.1");
if (!answers) {
  return "Loading";
}
const answersToThisQuestion = answers.filter(
  (a) => a.value.questionBlockHeight == questionBlockHeight
);

let usersWithAnswersToThisQuestion = [];
const validAnswersToThisQuestion = answersToThisQuestion.filter((a) => {
  const didUserAlreadyAnswered = usersWithAnswersToThisQuestion.includes(
    a.accountId
  );
  if (!didUserAlreadyAnswered) {
    usersWithAnswersToThisQuestion.push(a.accountId);
  }
  return !didUserAlreadyAnswered;
});

function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

const profileLink = (accId, c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accId}`}
  >
    {c}
  </a>
);

function makeAnswerAccIdShorter(accId) {
  if (accId.length > 18) {
    return accId.slice(0, 18) + "...";
  }
  return accId;
}

return (
  <>
    {validAnswersToThisQuestion.length == 0
      ? "This question does not have any answers yet. Be the first one!"
      : validAnswersToThisQuestion.map((answerParams) => {
          if (!answerParams.accountId) return "";
          let profile = Social.getr(`${answerParams.accountId}/profile`);
          if (!profile) {
            return "Loading";
          }
          return (
            <>
              <div
                className="d-flex align-items-start"
                style={{
                  padding: "1.5rem 0",
                  borderBottom: "1px solid #e9e9e9",
                }}
              >
                <div>
                  {profileLink(
                    answerParams.accountId,
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{ accountId: answerParams.accountId }}
                    />
                  )}
                </div>
                <div className="d-flex">
                  <div className="flex-grow-1 me-1 text-truncate">
                    {profileLink(
                      answerParams.accountId,
                      <>
                        <p
                          style={{ margin: "0 2px 0 2px" }}
                          className="fw-bold"
                        >
                          {profile.name}
                        </p>
                        <p
                          style={{ margin: "0 2px 0 2px" }}
                          className="text-secondary"
                        >
                          @{makeAnswerAccIdShorter(answerParams.accountId)}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <small className="ps-1 text-nowrap text-muted ms-auto">
                      <i className="bi bi-clock me-1"></i>
                      <Widget
                        src="silkking.near/widget/timeAgo"
                        props={{
                          timeInFuture: getBlockTimestamp(
                            answerParams.blockHeight
                          ),
                          reduced: true,
                        }}
                      />
                    </small>
                  </div>
                </div>
              </div>
              <p className="w-100">{answerParams.value.answer}</p>
            </>
          );
        })}
  </>
);
