let questionBlockHeight = props.questionBlockHeight;
let userMakingQuestion = props.accountId;

//TODO you have to use Social.index with the questionBlockHeight call to check all the answers and then reduce them to count positives and negatives votes. You should get someting like the next array
let countVotes = [2, 1];

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
