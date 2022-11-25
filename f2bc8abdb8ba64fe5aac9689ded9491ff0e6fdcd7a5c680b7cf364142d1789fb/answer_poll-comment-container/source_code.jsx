console.log("props: ", props);
const comment = props.answer;
const answerTimeStamp = props.answerTimeStamp;
const accountId = props.userName;

const profile = Social.getr(`${accountId}/profile`);

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
    href={`#/mob.near/widget/ProfilePage?accountId=${userMakingQuestion}`}
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
