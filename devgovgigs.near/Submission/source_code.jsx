const submission = props.submission;

function readableDate(UNIX_timestamp) {
  var a = new Date(parseInt(UNIX_timestamp) / 1000000);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  submission.timestamp ? submission.timestamp / 1000000 : Date.now()
);

return (
  <div className="row">
    <div className="mb-2 card">
      <div className="card-body">
        <div>
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: submission.author_id }}
          />
        </div>
        <div>{timestamp}</div>
        <hr />
        <h4>Submission: {submission.name}</h4>
        <p>{submission.description}</p>
      </div>
    </div>
  </div>
);
