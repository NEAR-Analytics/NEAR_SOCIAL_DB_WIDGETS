const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

State.init({ comment: "" });
const bountyId = props.bountyId;

const comments = JSON.parse(
  Social.get(`${accountId}/bounties/${bountyId}/comments`) || "[]"
);

return (
  <div>
    <div>
      <a
        class="card-link"
        data-bs-toggle="collapse"
        href={`#collapseCommentEditorComment-${bountyId}`}
        role="button"
        aria-expanded="false"
        aria-controls={`collapseCommentEditorComment-${bountyId}`}
      >
        <i class={commentBtnClass}> </i> Comment ({comments.length ?? 0})
      </a>
    </div>

    <div class="collapse" id={`collapseCommentEditorComment-${bountyId}`}>
      <div>
        <ul>
          {comments.map((comment) => (
            <li>
              {comment.accountId}: {comment.comment}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <textarea
          cols="50"
          rows="5"
          value={state.comment}
          onChange={(event) => {
            State.update({ comment: event.target.value });
          }}
        />
      </div>
      <CommitButton
        data={{
          bounties: {
            [bountyId]: {
              comments: [...comments, { accountId, comment: state.comment }],
            },
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
