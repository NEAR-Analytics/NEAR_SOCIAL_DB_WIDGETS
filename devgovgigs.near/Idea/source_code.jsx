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
    <div className="col-lg-12">
      <a
        class="btn btn-primary mb-2"
        data-bs-toggle="collapse"
        href={`#collapseSubmissionEditor${idea_id}`}
        role="button"
        aria-expanded="false"
        aria-controls={`collapseSubmissionEditor${idea_id}`}
      >
        Add Submission
      </a>
    </div>
    <div class="collapse" id={`collapseSubmissionEditor${idea_id}`}>
      <Widget src={`${ownerId}/widget/SubmissionEditor`} props={{ idea_id }} />
    </div>
    <div class="span8 offset4">
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  }
`;

return (
  <div className="row">
    <Card className="mb-2 card">
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
    </Card>
  </div>
);
