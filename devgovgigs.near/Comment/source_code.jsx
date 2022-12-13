const comment = props.comment;
const comment_id = comment.id;

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
  ? []
  : Near.view(ownerId, "get_comments", {
      post_type: "Comment",
      post_id: comment_id,
    });

const buttonsFooter = props.isPreview ? null : (
  <div class="row">
    <div class="row">
      <div class="col-2" onClick={onLike}>
        <a class="bi bi-heart" role="button">
          {" "}
          Like ({comment.likes.length ?? 0})
        </a>
      </div>
      <div class="col-3">
        <a
          class="card-link"
          data-bs-toggle="collapse"
          href={`#collapseCommentEditorComment${comment_id}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapseCommentEditorComment${comment_id}`}
        >
          <i class="bi bi-chat"> </i> Comment ({comments.length ?? 0})
        </a>
      </div>
    </div>
    <div class="collapse" id={`collapseCommentEditorComment${comment_id}`}>
      <Widget
        src={`${ownerId}/widget/CommentEditor`}
        props={{ comment: { post_type: "Comment", post_id: comment_id } }}
      />
    </div>
  </div>
);

const commentsList = props.isPreview ? null : (
  <div class="row">
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

const Card = styled.div`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

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
      <Markdown class="card-text" text={comment.description}></Markdown>
      {buttonsFooter}
      {commentsList}
    </div>
  </Card>
);
