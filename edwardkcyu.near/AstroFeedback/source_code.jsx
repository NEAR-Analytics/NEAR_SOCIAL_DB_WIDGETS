const myAccountId = props.accountId ?? context.accountId;
if (!myAccountId) {
  return "Please sign in with NEAR wallet ";
}

State.init({ message: "" });

const data = Social.get(`*/astrosocial/feedback/comments`, "final") || {};

const accounts = Object.keys(data);

let myComments = [];
const allComments = accounts.reduce((acc, accountId) => {
  const accountData = data[accountId];

  const comments = JSON.parse(accountData.astrosocial.feedback.comments);

  const enrichedComment = comments.map((comment) => {
    const createdAt = new Date(comment.createdAt);

    return {
      ...comment,
      createdAt: `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`,
      accountId,
    };
  });

  if (accountId === myAccountId) {
    myComments = enrichedComment;
  }

  return acc.concat(enrichedComment);
}, []);

allComments.sort((a, b) => {
  if (a.createdAt < b.createdAt) return -1;
  if (a.createdAt > b.createdAt) return 1;
  return 0;
});

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
        <i class={commentBtnClass}> </i> Feedback ({allComments.length ?? 0})
      </a>
    </div>

    <div class="collapse" id={`collapseCommentEditorComment-${bountyId}`}>
      <div>
        <ul>
          {allComments.map((comment) => (
            <li>
              {comment.createdAt}
              <b>{comment.accountId}: </b> {comment.message}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <textarea
          cols="50"
          rows="5"
          value={state.message}
          onChange={(event) => {
            State.update({ message: event.target.value });
          }}
        />
      </div>
      <CommitButton
        data={{
          astrosocial: {
            feedback: {
              comments: [
                ...myComments,
                {
                  message: state.message,
                  createdAt: new Date().getTime(),
                },
              ],
            },
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
