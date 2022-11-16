// console.log("props: ", props);

const accountId = props.accountId;
const currentAccountId = context.accountId;

const profile = Social.getr(`${accountId}/profile`);

// You can use this code to know the blockheights of your question in case you need to test. Just use one blockheight in the props.
// const testBlockHeights = Social.keys(
//   `${accountId}/post/poll_question/question/questionTimestamp`,
//   "final",
//   {
//     return_type: "History",
//   }
// );
// console.log("testBlockHeights: ", testBlockHeights);

const questionBlockHeight = props.questionBlockHeight;
// console.log("questionBlockHeight: ", questionBlockHeight);

const question = Social.get(
  `${accountId}/post/poll_question/question/question`,
  questionBlockHeight
);

// console.log("question: ", question);

const questionTimestamp = Social.get(
  `${accountId}/post/poll_question/question/questionTimestamp`,
  questionBlockHeight
);

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

const blockHeightsOfAllAnswers = Social.keys(
  `*/post/${questionBlockHeight}`,
  "final",
  {
    return_type: "History",
  }
);

let mapped = Object.keys(blockHeightsOfAllAnswers).map((key) => {
  return {
    accountId: key,
    blockHeightArray: blockHeightsOfAllAnswers[key].post.test[0],
  };
});

// console.log("mpd", mapped);

const haveThisUserAlreadyVoted = () => {
  if (mapped.length == 0) {
    return false;
  }
  for (let i = 0; i < mapped.length; i++) {
    return mapped[i].accountId == currentAccountId;
  }
};

let countVotes = mapped.reduce(
  (acc, curr) => {
    let answer = Social.get(
      `${curr.accountId}/post/${questionBlockHeight}`,
      curr.blockHeightArray
    );
    return answer == 1 ? [acc[0] + 1, acc[1]] : [acc[0], acc[1] + 1];
  },
  [0, 0]
);

State.init({ vote: "", currentAnswer: "" });
// console.log("input vote value: ", state.vote, "textarea value: ", state.currentAnswer);

const getForm = () => (
  <div
    style={{
      border: "1px solid #e9e9e9",
      borderRadius: "20px",
      padding: "1rem",
    }}
  >
    <h5>Give your opinion</h5>
    <p style={{ marginBottom: "0" }}>Vote:</p>
    <div className="form-check">
      <input
        key={state.vote}
        disabled={haveThisUserAlreadyVoted()}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteYes"
        value="1"
        onChange={onValueChange}
        checked={state.vote == "1"}
      />
      <label className="form-check-label" for="voteYes">
        Yes
      </label>
    </div>
    <div className="form-check">
      <input
        key={state.vote}
        disabled={haveThisUserAlreadyVoted()}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteNo"
        value="0"
        onChange={onValueChange}
        checked={state.vote == "0"}
      />
      <label className="form-check-label" for="voteNo">
        No
      </label>
    </div>
    {haveThisUserAlreadyVoted() && (
      <p className="text-danger">You can only vote once</p>
    )}

    <div className="form-group">
      <label for="answer" className="font-weight-bold">
        Write answer:
      </label>
      <textarea
        className="form-control mb-1"
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
          [questionBlockHeight]: {
            userVote: state.vote == "" ? answer.userVote : state.vote,
            userVoting: currentAccountId,
            userAnswers: currentAnswer,
            answerTimestamps: Date.now(),
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
              {timeAgo(Date.now() - questionTimestamp ?? 0)}
            </small>
          </div>
        </div>
        <div>{question}</div>
        <div className="d-flex align-items-start">
          <i
            className="bi bi-check-circle-fill"
            style={{ padding: "0 0.3rem" }}
          ></i>
          <p className="text-secondary">{countVotes[1]}</p>
          <i
            className="bi bi-x-octagon-fill"
            style={{ padding: "0 0.5rem 0 1rem" }}
          ></i>
          <p className="text-secondary">{countVotes[0]}</p>
        </div>
        <>{getForm()}</>
      </div>
    </div>
  </div>
);
