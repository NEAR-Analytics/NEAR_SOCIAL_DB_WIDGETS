const accountId = props.accountId;
const questionBlockHeight = props.questionBlockHeight;
// console.log("questionBlockHeight: ", questionBlockHeight);
const currentAccountId = context.accountId;

const profile = Social.getr(`${accountId}/profile`);

// You can use this code to know the blockheights of your question in case you need to test. Just use one blockheight in the props.
// const testBlockHeights = Social.keys(
//   `${accountId}/post/poll_question/*`,
//   "final",
//   {
//     return_type: "History",
//   }
// );

// console.log("testBlockHeights: ", testBlockHeights);

const question = Social.get(
  `${accountId}/post/poll_question/question`,
  questionBlockHeight
);

// console.log("question: ", question);

const questionTimestamp = Social.get(
  `${accountId}/post/poll_question/question_timestamp`, // maybe be wrong
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

const answerDataFromBlockHeight = Social.keys(
  `*/post/answer_poll/${questionBlockHeight}`, // forked from poll, need to display results properly
  "final",
  {
    return_type: "History",
  }
);
// console.log("answerDataFromBlockHeight: ", answerDataFromBlockHeight);

let answersData = Object.keys(answerDataFromBlockHeight).map((key) => {
  return {
    accountId: key,
    // Social.keys returns in the end a an array of blockHeight related to the query.
    // In our case, we only care for one answer, so it's always the first one
    blockHeightOfAnswer:
      answerDataFromBlockHeight[key].post.answer_poll[questionBlockHeight][0],
  };
});

// console.log("answData: ", answersData);

const haveThisUserAlreadyVoted = () => {
  if (answersData.length == 0) {
    return false;
  }
  for (let i = 0; i < answersData.length; i++) {
    return answersData[i].accountId == currentAccountId;
  }
};

let countVotes = answersData.reduce(
  (acc, curr) => {
    let answer = Social.get(
      `${curr.accountId}/post/answer_poll/${questionBlockHeight}/user_vote`,
      curr.blockHeightOfAnswer
    );
    if (answer == 0) {
      return [acc[0], acc[1], acc[2] + 1];
    } else if (answer == 1) {
      return [acc[0], acc[1] + 1, acc[2]];
    } else {
      return [acc[0], acc[1], acc[2] + 1];
    }
    // return answer == 1 ? [acc[0] + 1, acc[1]] : [acc[0], acc[1] + 1];
  },
  [0, 0, 0] // need to change this too to a conditional inceremnting each one, dont know if its going background // changed from [0,0]
);

const loadComments = () => {
  for (let i = 0; i < answersData.length; i++) {
    let answer = Social.get(
      `${answersData.accountId}/post/answer_poll/${answersData[i].blockHeightOfAnswer}/user_answers`
    );

    console.log("answer: ", answer);

    let answerTimeStamp = Social.get(
      `${answersData.accountId}/post/answer_poll/${answersData[i].blockHeightOfAnswer}/answer_timestamps`
    );

    console.log("answerTimeStamp: ", answerTimeStamp);

    if (answer != undefined) {
      return (
        <Widget
          src="bluntdao.near/widget/PickAStick" // changed this from poll
          props={{ answer, answerTimeStamp }}
        />
      );
    }
  }
};

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
    <h5>Which smoking stick do you pick? 🗳️💨🍃</h5>
    <p style={{ marginBottom: "0" }}>Vote:</p>
    <div className="form-check">
      <input
        key={state.vote}
        disabled={haveThisUserAlreadyVoted()}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteBlunt"
        value="2"
        onChange={onValueChange}
        checked={state.vote == "2"}
      />
      <label className="form-check-label" for="voteBlunt">
        Blunt
      </label>
    </div>
    <div className="form-check">
      <input
        key={state.vote}
        disabled={haveThisUserAlreadyVoted()}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteBlunt"
        value="1"
        onChange={onValueChange}
        checked={state.vote == "1"}
      />
      <label className="form-check-label" for="voteJoint">
        Joint
      </label>
    </div>
    <div className="form-check">
      <input
        key={state.vote}
        disabled={haveThisUserAlreadyVoted()}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteSpliff"
        value="0"
        onChange={onValueChange}
        checked={state.vote == "0"}
      />
      <label className="form-check-label" for="voteSpliff">
        Spliff
      </label>
    </div>
    {haveThisUserAlreadyVoted() && (
      <p className="text-danger">You burned 🔥 your only answer</p>
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
          answer_poll: {
            [questionBlockHeight]: {
              user_vote: state.vote == "" ? answer.userVote : state.vote,
              user_answers: currentAnswer,
              answer_timestamps: Date.now(),
            },
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
              {timeAgo(Date.now() - questionTimestamp)}
            </small>
          </div>
        </div>
        <div>{question}</div>
        <div className="d-flex align-items-start">
          <i
            className="bi bi-3-circle-fill" // maybe change bootstrap icon or number the questions
            style={{ padding: "0 0.3rem" }}
          ></i>
          <p className="text-secondary">{countVotes[2]}</p>
          <i
            className="bi bi-2-circle-fill"
            style={{ padding: "0 0.3rem" }}
          ></i>
          <p className="text-secondary">{countVotes[1]}</p>
          <i
            className="bi bi-1-circle-fill"
            style={{ padding: "0 0.5rem 0 1rem" }}
          ></i>
          <p className="text-secondary">{countVotes[0]}</p>
        </div>
        <>{loadComments()}</>
        <>{getForm()}</>
      </div>
    </div>
  </div>
);
