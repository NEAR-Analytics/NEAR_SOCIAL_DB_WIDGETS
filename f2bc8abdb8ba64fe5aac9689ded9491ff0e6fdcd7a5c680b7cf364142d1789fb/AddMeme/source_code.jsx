console.log("props: ", props);

const accountId = props.accountId ?? context.accountId;
const currentAccountId = context.accountId;

const profile = Social.getr(`${accountId}/profile`);

const question =
  props.question ?? Social.getr(`${accountId}/post/poll_question`, blockHeight);

console.log("question", question);

const questionTimeMs = props.question.timeStamp ?? Date.now();
const actualQuestion = question.question;
const questionId = question.questionId;

const processAllAnswers = () => {};

const answer = Social.getr(
  `${currentAccountId}/post/${questionId}`,
  blockHeight
);

// console.log("answer: ", answer);

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);
State.init({ vote: "", currentAnswer: "" });
// console.log("input vote value: ", state.vote, "textarea value: ", state.currentAnswer);
const allowVote = () => {
  if (answer.userVote == "") {
    return false;
  } else {
    return true;
  }
};

const oldUserAnswers = answer.userAnswer ?? [];
const newUserAnswers = oldUserAnswers.push(state.currentAnswer);

const getForm = () => (
  <div>
    <div class="form-check">
      <input
        disabled={allowVote()}
        key={state.vote}
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteYes"
        value="yes"
        onChange={onValueChange}
        checked={state.vote == "yes"}
      />
      <label class="form-check-label" for="voteYes">
        Yes
      </label>
    </div>
    <div class="form-check">
      <input
        disabled={allowVote()}
        key={state.vote}
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteNo"
        value="no"
        onChange={onValueChange}
        checked={state.vote == "no"}
      />
      <label class="form-check-label" for="voteNo">
        No
      </label>
    </div>
    {answer.userVote != "" && (
      <p className="text-danger">You can only vote once</p>
    )}

    <div class="form-group">
      <label for="answer">Your answer</label>
      <textarea
        class="form-control mb-1"
        id="answer"
        rows="3"
        value={state.currentAnswer}
        onChange={(e) => {
          const currentAnswer = e.target.value;
          State.update({ currentAnswer });
        }}
      ></textarea>
    </div>
    <CommitButton
      data={{
        post: {
          [questionId]: {
            userVoting: currentAccountId,
            userVote: state.vote == "" ? answer.userVote : state.vote,
            userAnswer: newUserAnswers,
            answerTimestamp: Date.now(),
          },
        },
      }}
    >
      Confirm
    </CommitButton>
  </div>
);

function onValueChange(e) {
  const vote = e.target.value;

  State.update({ vote });
}

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

return (
  <div style={{ maxWidth: "40em" }}>
    <div
      className="d-flex align-items-start"
      style={{
        padding: "1.5rem 0",
        borderBottom: "1px solid #e9e9e9",
      }}
    >
      <div>
        {profileLink(
          <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
        )}
      </div>
      <div className="ms-2 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-start">
          <div className="flex-grow-1 me-1 text-truncate">
            {profileLink(
              <>
                <span className="fw-bold">{profile.name}</span>
                <span className="text-secondary">@{accountId}</span>
              </>
            )}
          </div>
          <div>
            <small className="ps-1 text-nowrap text-muted ms-auto">
              <i className="bi bi-clock me-1"></i>
              {timeAgo(Date.now() - questionTimeMs)}
            </small>
          </div>
        </div>
        <div>{actualQuestion}</div>
        <>{getForm()}</>
      </div>
    </div>
  </div>
);
