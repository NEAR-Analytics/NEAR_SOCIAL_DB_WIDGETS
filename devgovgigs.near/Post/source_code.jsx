const ownerId = "devgovgigs.near";
const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post = props.post ?? Near.view(ownerId, "get_post", { post_id: postId });
const snapshot = post.snapshot;
const post_type = snapshot.post_type;

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  snapshot.timestamp ? snapshot.timestamp / 1000000 : Date.now()
);

const editControl =
  post.author_id == context.accountId ? (
    <a class="card-link px-2" role="button" title="Edit post">
      <div class="bi bi-pencil-square"></div>
    </a>
  ) : null;

const header = (
  <div className="card-header">
    <small class="text-muted">
      <div class="row justify-content-between">
        <div class="col-4">
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: post.author_id }}
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">
            {editControl}
            {timestamp}
            <div class="bi bi-clock-history px-2"></div>
            <a
              class="card-link"
              href={`https://near.social/#/devgovgigs.near/widget/Post?id=${postId}`}
              role="button"
              target="_blank"
              title="Open in new tab"
            >
              <div class="bi bi-share"></div>
            </a>
          </div>
        </div>
      </div>
    </small>
  </div>
);

const emptyIcons = {
  Idea: "bi-lightbulb",
  Comment: "bi-chat",
  Submission: "bi-rocket",
  Attestation: "bi-check-circle",
  Sponsorship: "bi-cash-coin",
  Like: "bi-heart",
};

const fillIcons = {
  Idea: "bi-lightbulb-fill",
  Comment: "bi-chat-fill",
  Submission: "bi-rocket-fill",
  Attestation: "bi-check-circle-fill",
  Sponsorship: "bi-cash-coin",
  Like: "bi-heart-fill",
};

const Card = styled.div`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

return (
  <Card className="card my-2 border-primary">
    {header}
    <div className="card-body">
      <div id={`alertPlaceholder${postId}`}></div>
      <Markdown class="card-text" text={post.snapshot.description}></Markdown>
    </div>
  </Card>
);
