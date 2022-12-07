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
  <div>
    <Widget
      src={`mob.near/widget/ProfileLine`}
      props={{ accountId: idea.submitter_id }}
    />
    <h3>{idea.name}</h3>
    <p>Timestamp: {timestamp}</p>
    <p>{idea.description}</p>
    {submissionHeader}
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
);
