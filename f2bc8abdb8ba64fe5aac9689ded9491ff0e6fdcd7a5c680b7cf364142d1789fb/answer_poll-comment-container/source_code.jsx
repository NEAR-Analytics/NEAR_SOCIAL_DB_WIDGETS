console.log("props: ", props);
const comment = props.answer;
const answerTimeStamp = props.answerTimeStamp;
const userName = props.userName.accountId;

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

return (
  <div className="flex-column my-2 border border-primary p-2">
    <small className="ps-1 text-nowrap text-muted ms-auto">
      <i className="bi bi-clock me-1"></i>
      {timeAgo(Date.now() - answerTimeStamp)}
    </small>
    <div className="flex-row">
      <p className="fw-bold">{userName} :</p>
      <p>{comment}</p>
    </div>
  </div>
);
