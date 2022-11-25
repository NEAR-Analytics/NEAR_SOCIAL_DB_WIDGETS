console.log("props: ", props);
const userMakingQuestion = props.accountId;
const question = props.question;
const questionTimestamp = props.questionTimestamp;
//I need questionBockHeight to be a string but .toString() is reserved so i convert the number into string like this
const questionBlockHeight = props.blockHeight + "";

// console.log("questionBlockHeight: ", questionBlockHeight);
// console.log(isNaN(questionBlockHeight));

const currentAccountId = context.accountId;

const profile = Social.getr(`${userMakingQuestion}/profile`);

// You can use this code to know the blockheights of your question in case you need to test. Just use one blockheight in the props.
// const testBlockHeights = Social.keys(
//   `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/post/answer__poll/${questionBlockHeight}`,
//   "final",
//   {
//     return_type: "History",
//   }
// );

// console.log("testBlockHeights: ", testBlockHeights);

// const question = Social.get(
//   `${accountId}/post/poll__question/question`,
//   questionBlockHeight
// );

// const questionTimestamp = Social.get(
//   `${accountId}/post/poll__question/question_timestamp`,
//   questionBlockHeight
// );

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${userMakingQuestion}`}
  >
    {c}
  </a>
);

// const answerDataFromBlockHeight = Social.keys(
//   `*/post/answer__poll/${questionBlockHeight}`,
//   "final",
//   {
//     return_type: "History",
//   }
// );
// console.log("answerDataFromBlockHeight: ", answerDataFromBlockHeight);

let countVotes = [0, 0];
let answersData = Social.index("answer_poll", questionBlockHeight);

// if (answerDataFromBlockHeight) {
//   answersData = Object.keys(answerDataFromBlockHeight).map((key) => {
//     // console.log("key: ", key)
//     return {
//       accountId: key,
//       // Social.keys returns in the end a an array of blockHeight related to the query.
//       // In our case, we only care for one answer, so it's always the first one
//       blockHeightOfAnswer:
//         answerDataFromBlockHeight[key].post.answer__poll[
//           questionBlockHeight
//         ][0],
//     };
//   });

console.log("answData: ", answersData);
if (answersData) {
  countVotes = answersData.reduce(
    (acc, curr) => {
      // let vote = Social.get(
      //   `${curr.accountId}/post/answer__poll/${questionBlockHeight}/user_vote`,
      //   curr.blockHeightOfAnswer
      // );
      let vote = curr.value.data.user_vote;

      let voteValue = parseInt(vote);

      // console.log("testing votes: ", votes);
      // console.log(typeof votes);

      //vote can return null for a few seconds
      if (isNaN(voteValue)) {
        return acc;
      } else if (voteValue == 0) {
        return [acc[0], acc[1] + 1];
      } else {
        return [acc[0] + 1, acc[1]];
      }
    },

    [0, 0]
  );

  // console.log("countVotes: ", countVotes, questionBlockHeight);
}

const haveThisUserAlreadyVoted = () => {
  if (answersData.lenght == 0) {
    return false;
  }
  for (let i = 0; i < answersData.lenght; i++) {
    return answersData[i].accountId == currentAccountId;
  }

  // if (answersData.length == 0) {
  //   return false;
  // }
  // for (let i = 0; i < answersData.length; i++) {
  //   return answersData[i].accountId == currentAccountId;
  // }
};

const loadComments = () => {
  // console.log("answrDLength: ", answersData.length);
  // return answersData.map((answerData) => {
  return answersData.map((answerData) => {
    // console.log("this answer data: ", answerData);
    // let answer = Social.get(
    //   `${answerData.accountId}/post/answer__poll/${questionBlockHeight}/user_answers`
    // );

    let answer = answerData.value.data.user_answer;
    // console.log("answer: ", answer);

    // let answerTimeStamp = Social.get(
    //   `${answerData.accountId}/post/answer__poll/${questionBlockHeight}/answer_timestamps`
    // );

    let answerTimeStamp = answerData.value.data.answer_timestamp;

    if (answer != undefined) {
      return (
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answer_poll-comment-container"
          props={{
            answer: answer,
            answerTimeStamp: answerTimeStamp,
            userName: answerData.accountId,
          }}
        />
      );
    }
  });
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
    <h5>Give your opinion</h5>

    <p style={{ marginBottom: "0" }}>Vote:</p>
    <div className="form-check">
      <input
        key={state.vote}
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
        index: {
          answer_poll: JSON.stringify({
            key: questionBlockHeight,
            value: {
              data: {
                user_vote: state.vote == "" ? answer.userVote : state.vote,
                user_answer: state.currentAnswer,
                answer_timestamp: Date.now(),
              },
            },
          }),
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
          <a
            className="text-decoration-none"
            //Check how href is done in memes widget of mob.near
            href={`#`}
          >
            <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
          </a>
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
            className="bi bi-check-circle-fill"
            style={{ padding: "0 0.3rem" }}
          ></i>
          <p className="text-secondary">{countVotes[0]}</p>
          <i
            className="bi bi-x-octagon-fill"
            style={{ padding: "0 0.5rem 0 1rem" }}
          ></i>
          <p className="text-secondary">{countVotes[1]}</p>
        </div>
        <>{loadComments()}</>
        <>{getForm()}</>
      </div>
    </div>
  </div>
);
