State.init({
  commentTitle: "",
  commentContent: "",
  timestamp: Date.now(),
});

if (!context.accountId) {
  return <p>Please log in to post a comment</p>;
}

const commentRef = `${context.accountId}--${Date.now()}`;
return (
  <div className="d-flex flex-column">
    <div className="d-flex flex-column gap-2">
      Title:
      <input
        type="text"
        className="form-control"
        value={state.commentTitle}
        onChange={(e) => {
          State.update({ commentTitle: e.target.value });
        }}
      />
      Content:
      <textarea
        className="form-control"
        value={state.commentContent}
        style={{ height: "5rem" }}
        onChange={(e) => {
          State.update({ commentContent: e.target.value });
        }}
      />
      <CommitButton
        disabled={!state.commentTitle || !state.commentContent}
        className="btn btn-primary"
        onCommit={() => {
          State.update({ commentContent: "", showCommentForm: false });
        }}
        onClick={() => {
          State.update({ timestamp: Date.now() });
        }}
        data={{
          experimental: {
            genie: {
              comments: {
                [commentRef]: {
                  title: state.commentTitle,
                  content: state.commentContent,
                },
              },
            },
          },
          index: {
            genie: JSON.stringify({
              key: "commented",
              value: commentRef,
            }),
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
