let questionBlockHeight = props.questionBlockHeight;
let userMakingQuestion = props.accountId;

//TODO you have to use Social.index with the questionBlockHeight call to check all the answers and then reduce them to count positives and negatives votes. You should get someting like the next array
let countVotes = [2, 1];

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
  <div className="d-flex align-items-start">
    <i className="bi bi-check-circle-fill" style={{ padding: "0 0.3rem" }}></i>
    <p className="text-secondary">{countVotes[0]}</p>
    <i
      className="bi bi-x-octagon-fill"
      style={{ padding: "0 0.5rem 0 1rem" }}
    ></i>
    <p className="text-secondary">{countVotes[1]}</p>
  </div>
);
