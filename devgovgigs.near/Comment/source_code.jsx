const comment_id = props.comment_id ? parseInt(props.comment.id) : 0;
const comment = props.comment;

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  comment.timestamp ? comment.timestamp / 1000000 : Date.now()
);

const onLike = () => {
  Near.call(ownerId, "like", {
    post_type: "Comment",
    post_id: comment_id,
  });
};

const comments = props.isPreview
  ? null
  : Near.view(ownerId, "get_comments", {
      post_type: "Comment",
      post_id: comment_id,
    });

const Card = styled.div`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

const commentsList = props.isPreview ? null : (
  <div class="row">
    <div class="row">
      <div class="col-2" onClick={onLike}>
        <a class="bi bi-heart" role="button">
          Like
        </a>
      </div>
      <div class="col-2">
        <a class="bi bi-chat" role="button">
          Comment
        </a>
      </div>
    </div>
    <div class="collapse" id={`collapseCommentEditor${comment_id}`}>
      <Widget src={`${ownerId}/widget/CommentEditor`} props={{ comment_id }} />
    </div>
    <div>
      {comments
        ? comments.map((comment) => {
            return (
              <Widget src={`${ownerId}/widget/Comment`} props={{ comment }} />
            );
          })
        : ""}
    </div>
  </div>
);

return (
  <Card className="card my-2 border-light">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4">
            <Widget
              src={`mob.near/widget/ProfileLine`}
              props={{ accountId: comment.author_id }}
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
        <i class="bi bi-chat"> </i>Comment: {comment.name}
      </h5>
      <Markdown class="card-text" text={comment.description}></Markdown>
    </div>
  </Card>
);
