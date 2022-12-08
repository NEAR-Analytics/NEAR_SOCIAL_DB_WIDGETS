const ownerId = "devgovgigs.near";

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

const submissionsList = props.isPreview ? null : (
  <div class="row">
    <div className="col-lg-12">
      <a
        class="btn btn-primary mb-2"
        data-bs-toggle="collapse"
        href="#collapseSubmissionEditor"
        role="button"
        aria-expanded="false"
        aria-controls="collapseSubmissionEditor"
      >
        Add Submission
      </a>
    </div>
    <div class="collapse" id="collapseSubmissionEditor">
      <Widget src={`${ownerId}/widget/SubmissionEditor`} />
    </div>
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
);

return (
  <div className="row">
    <div className="mb-2 card">
      <div className="card-body">
        <div>
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: idea.author_id }}
          />
        </div>
        <div>{timestamp}</div>
        <hr />
        <h4>Idea: {idea.name}</h4>
        <p>{idea.description}</p>
        {submissionsList}
      </div>
    </div>
  </div>
);
