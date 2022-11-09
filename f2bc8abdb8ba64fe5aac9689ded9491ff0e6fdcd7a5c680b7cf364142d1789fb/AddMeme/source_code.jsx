const accountId = props.accountId ?? context.accountId;
const currentAccountId = context.accountId;
// let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
const profile = Social.getr(`${accountId}/profile`);

const question = Social.getr(`${accountId}/post/poll_question`, blockHeight);

// let idVote = Social.keys(`${currentAccountId}/post/*`, "final", {
//   return_type: "History",
// });

//let answerBlockheight =
//  idVote.f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb.post[
//    `${blockHeight}`
//  ][0];

//let oneAnswer = Social.getr(`${currentAccountId}/*`, blockHeight);

// console.log(
//   "R",
//   idVote.f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb.post[
//     `${blockHeight}`
//   ][0]
// );

// console.log("answerBlockheight", answerBlockheight);
// console.log("oneAnswer", oneAnswer);

console.log("question", question);

// if (!question) {
//   return "Loading";
// }

// if (!props.question && !blockHeight) {
//   blockHeight = Social.keys(`${accountId}/post/meme`, undefined, {
//     return_type: "BlockHeight",
//   })[accountId].post.meme;
//   if (!blockHeight) {
//     return "Loading";
//   }
// }

const questionTimeMs = props.meme
  ? Date.now()
  : parseFloat(Near.block(blockHeight).header.timestamp_nanosec) / 1e6;

const actualQuestion = question.question;
const questionId = question.questionId;

let answer = Social.getr(`${currentAccountId}/post/${questionId}`, blockHeight);
console.log("answer", answer);

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

const getButtons = () => (
  <div>
    <CommitButton
      data={{
        post: {
          [questionId]: {
            userVoting: currentAccountId,
            userVote: "yes",
          },
        },
      }}
    >
      Yes
    </CommitButton>
    <CommitButton
      data={{
        post: {
          [questionId]: {
            userVoting: currentAccountId,
            userVote: "no",
          },
        },
      }}
    >
      No
    </CommitButton>
  </div>
);

const getResponses = () => (
  <p className="small text-muted mt-2 mb-0">
    <span>
      <i className="bi bi-star me-1"></i>4
    </span>
    <span className="ms-2">
      <i className="bi bi-chat-square-fill me-1"></i>20
    </span>
    <span className="ms-2">
      <i className="bi bi-reply"></i>
    </span>
  </p>
);

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
        <>{getButtons()}</>
      </div>
    </div>
  </div>
);
