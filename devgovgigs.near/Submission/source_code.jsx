const submission = props.submission;

return (
  <div>
    <h3>{submission.name}</h3>
    <p>Author: {submission.account_id}</p>
    <p>Timestamp: {submission.timestamp} </p>
    <p>{submission.description}</p>
  </div>
);
