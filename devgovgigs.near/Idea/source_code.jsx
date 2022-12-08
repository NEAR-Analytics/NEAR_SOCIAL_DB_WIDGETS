const idea_id = props.idea_id ? parseInt(props.idea_id) : 0;
const idea =
  props.idea ?? Near.view("devgovgigs.near", "get_idea", { idea_id });

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  idea.timestamp ? idea.timestamp / 1000000 : Date.now()
);

const submissions = Near.view("devgovgigs.near", "get_submissions", {
  idea_id,
});

const submissionHeader = submissions.length > 0 ? <h3>Submissions</h3> : null;

return (
  <div className="row">
    <div className="mb-2 card">
      <div className="card-body">
        <div>
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: idea.submitter_id }}
          />
        </div>
        <div>{timestamp}</div>
        <hr />
        <h4>{idea.name}</h4>
        <p>{idea.description}</p>
        {submissionHeader}
        <div class="row">
          <div class="span8 offset4">
            {submissions
              ? submissions.map((submission) => {
                  return (
                    <Widget
                      src="devgovgigs.near/widget/Submission"
                      props={{ submission }}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  </div>
);
