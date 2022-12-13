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

const onLike = () => {
  Near.call(ownerId, "like", {
    post_type: "Idea",
    post_id: idea_id,
  });
};

const submissions = props.isPreview
  ? null
  : Near.view(ownerId, "get_submissions", {
      idea_id,
    });

const comments = props.isPreview
  ? null
  : Near.view(ownerId, "get_comments", {
      post_type: "Idea",
      post_id: idea_id,
    });

const submissionsList = props.isPreview ? null : (
  <div class="row">
    <div class="row">
      <div class="col-2">
        <a
          class="card-link"
          data-bs-toggle="collapse"
          href={`#collapseSubmissionEditor${idea_id}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapseSubmissionEditor${idea_id}`}
        >
          <div class="bi bi-rocket"> Submit</div>
        </a>
      </div>
      <div class="col-2" onClick={onLike}>
        <a class="bi bi-heart" role="button">
          {" "}
          Like
        </a>
      </div>
      <div class="col-2">
        <a class="bi bi-chat" role="button">
          {" "}
          Comment
        </a>
      </div>
    </div>
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
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

return (
  <Card className="card my-2 border-primary">
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
      <h5 class="card-title">
        <div className="row justify-content-between">
          <div class="col-9">
            <i class="bi bi-lightbulb"> </i>Idea: {idea.name}
          </div>
          <div class="col-3 ">
            <div class="d-flex justify-content-evenly">
              <div class="bi bi-rocket-fill">{submissions.length}</div>

              <div class="bi bi-heart-fill">{idea.likes.length}</div>

              <div class="bi bi-chat-fill">{comments.length}</div>
            </div>
          </div>
        </div>
      </h5>
      <Markdown class="card-text" text={idea.description}></Markdown>
      {submissionsList}
    </div>
  </Card>
);
