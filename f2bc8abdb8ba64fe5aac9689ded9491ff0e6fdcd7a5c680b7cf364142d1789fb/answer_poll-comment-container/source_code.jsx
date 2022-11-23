console.log("props: ", props);
const answer = props.answer;
const answerTimeStamp = props.answerTimeStamp;
const userName = props.accountId ?? "User name missed";

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

return (
  <div className="flex-column mt-2">
    <small className="ps-1 text-nowrap text-muted ms-auto">
      <i className="bi bi-clock me-1"></i>
      {timeAgo(Date.now() - answerTimeStamp)}
    </small>
    <div className="flex-row">
      <span className="fw-bold">{userName} :</span>
      <span>{comment}</span>
    </div>
  </div>
);
