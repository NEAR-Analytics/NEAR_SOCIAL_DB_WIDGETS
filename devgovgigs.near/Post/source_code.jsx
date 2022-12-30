const ownerId = "devgovgigs.near";
const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post = props.post ?? Near.view(ownerId, "get_post", { post_id: postId });

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  post.snapshot.timestamp ? post.snapshot.timestamp / 1000000 : Date.now()
);

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
            {timestamp}
            <div class="bi bi-clock-history px-2"></div>
            <a
              class="card-link"
              href={`https://near.social/#/devgovgigs.near/widget/Post?id=${postId}`}
              role="button"
              target="_blank"
            >
              <h5 class="bi bi-link-45deg"></h5>
            </a>
          </div>
        </div>
      </div>
    </small>
  </div>
);

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
