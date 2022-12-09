const ownerId = "devgovgigs.near";

const idea_id = props.idea.id ? parseInt(props.idea.id) : 0;
const idea = props.idea ?? Near.view(ownerId, "get_idea", { idea_id });

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  idea.timestamp ? idea.timestamp / 1000000 : Date.now()
);

const submissions = props.isPreview
  ? null
  : Near.view(ownerId, "get_submissions", {
      idea_id,
    });

const submissionsList = props.isPreview ? null : (
  <div class="row">
    <a
      class="card-link mb-2"
      data-bs-toggle="collapse"
      href={`#collapseSubmissionEditor${idea_id}`}
      role="button"
      aria-expanded="false"
      aria-controls={`collapseSubmissionEditor${idea_id}`}
    >
      Add Submission
    </a>
    <div class="collapse" id={`collapseSubmissionEditor${idea_id}`}>
      <Widget src={`${ownerId}/widget/SubmissionEditor`} props={{ idea_id }} />
    </div>
    <div>
      {submissions
        ? submissions.map((submission) => {
            return (
              <Widget
                src={`${ownerId}/widget/Submission`}
                props={{ submission }}
              />
            );
          })
        : ""}
    </div>
  </div>
);

const Card = styled.div`
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

return (
  <Card className="card">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4">
            <Widget
              src={`mob.near/widget/ProfileLine`}
              props={{ accountId: idea.author_id }}
            />
          </div>
          <div class="col-4">
            <div class="d-flex justify-content-end">{timestamp}</div>
          </div>
        </div>
      </small>
    </div>
    <div className="card-body">
      <h5 class="card-title">Idea: {idea.name}</h5>
      <p class="card-text">{idea.description}</p>
      {submissionsList}
    </div>
  </Card>
);
