const ownerId = "gov.near";

const task_id = props.task.id ? parseInt(props.task.id) : 0;
const task = props.task ?? Near.view(ownerId, "get_task", { task_id });

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  task.timestamp ? task.timestamp / 1000000 : Date.now()
);

const onLike = () => {
  Near.call(ownerId, "like", {
    post_type: "Task",
    post_id: task_id,
  });
};

const submissionsUnordered =
  Near.view(ownerId, "get_submissions", {
    task_id,
  }) ?? [];
const submissions = props.isPreview ? [] : submissionsUnordered.reverse();

const commentsUnordered =
  Near.view(ownerId, "get_comments", {
    post_type: "Task",
    post_id: task_id,
  }) ?? [];
const comments = props.isPreview ? [] : commentsUnordered.reverse();

const containsLike = props.isPreview
  ? false
  : task.likes.find((l) => l.author_id == context.accountId);
const likeBtnClass = containsLike ? "bi bi-heart-fill" : "bi bi-heart";
const containsComment = props.isPreview
  ? false
  : comments.find((c) => c.author_id == context.accountId);
const commentBtnClass = containsComment ? "bi bi-chat-fill" : "bi bi-chat";

const buttonsFooter = props.isPreview ? null : (
  <div class="row">
    <div class="row">
      <div class="col-2">
        <a
          class="card-link"
          data-bs-toggle="collapse"
          href={`#collapseSubmissionEditor${task_id}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapseSubmissionEditor${task_id}`}
        >
          <div class="bi bi-rocket"> Submit</div>
        </a>
      </div>
      <div class="col-2" onClick={onLike}>
        <a class={likeBtnClass} role="button">
          {" "}
          Like ({task.likes.length ?? 0})
        </a>
      </div>
      <div class="col-3">
        <a
          class="card-link"
          data-bs-toggle="collapse"
          href={`#collapseCommentEditorTask${task_id}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapseCommentEditorTask${task_id}`}
        >
          <i class={commentBtnClass}> </i> Comment ({comments.length ?? 0})
        </a>
      </div>
    </div>
    <div class="collapse" id={`collapseSubmissionEditor${task_id}`}>
      <Widget src={`${ownerId}/widget/SubmissionEditor`} props={{ task_id }} />
    </div>
    <div class="collapse" id={`collapseCommentEditorTask${task_id}`}>
      <Widget
        src={`${ownerId}/widget/CommentEditor`}
        props={{ comment: { post_type: "Task", post_id: task_id } }}
      />
    </div>
  </div>
);

const submissionsList = props.isPreview ? null : (
  <div class="row">
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

const commentsList =
  props.isPreview || comments.length == 0 ? null : (
    <div class="row">
      <div class="row">
        <div class="col-4">
          <a
            class="card-link"
            data-bs-toggle="collapse"
            href={`#collapseCommentsListTask${task_id}`}
            role="button"
            aria-expanded="false"
            aria-controls={`collapseCommentsListTask${task_id}`}
          >
            <i class="bi bi-arrows-angle-expand"> </i> Expand Comments
          </a>
        </div>
      </div>
      <div class="collapse" id={`collapseCommentsListTask${task_id}`}>
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
  <Card className="card my-2 border-primary">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4">
            <Widget
              src={`gov.near/widget/ProjectLine`}
              props={{ accountId: task.author_id }}
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
            <i class="bi bi-lightbulb"> </i>Task: {task.name}
          </div>
        </div>
      </h5>
      <Markdown class="card-text" text={task.description}></Markdown>
      {buttonsFooter}
      {submissionsList}
      {commentsList}
    </div>
  </Card>
);
