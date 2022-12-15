if (!props.blockHeight) {
  return "Prop blockHeight not set";
}

// Utility function. Consider moving it to an utility widget
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

const answerBlockHeight = props.blockHeight;
const answers = Social.index("poll_question", "answer-v3.0.1");
if (!answers) {
  return "Loading";
}
const answerParams = answers.find((a) => a.blockHeight == answerBlockHeight);

console.log(1, answers);
const comment = answerParams.value.answer;
const answerTimeStamp = getBlockTimestamp(answerBlockHeight);
const accountId = answerParams.accountId;

const profile = Social.getr(`${accountId}/profile`);
// if (!profile) {
//   return "Loading";
// }

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

return (
  <div className="flex-column my-2 border border-primary p-2">
    <small className="ps-1 text-nowrap text-muted ms-auto">
      <i className="bi bi-clock me-1"></i>
      {timeAgo(Date.now() - answerTimeStamp)}
    </small>
    <div className="flex-row">
      {profileLink(
        <div className="d-flex align-items-center">
          <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
          <div>
            <span className="fw-bold">{profile.name}</span>
            <span className="text-secondary">@{accountId}</span>
          </div>
        </div>
      )}
    </div>
    <p className="m-3">{comment}</p>
  </div>
);
