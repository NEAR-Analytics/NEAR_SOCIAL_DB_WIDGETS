const myAccountId = props.accountId ?? context.accountId;
if (!myAccountId) {
  return "Please sign in with NEAR wallet ";
}

State.init({ message: "" });

const data = Social.get(`*/astrosocial/feedback/v1/comments`, "final") || {};

const accounts = Object.keys(data);

let myComments = [];
const allComments = accounts.reduce((acc, accountId) => {
  const accountData = data[accountId];

  const comments = JSON.parse(accountData.astrosocial.feedback.v1.comments);

  const enrichedComment = comments.map((comment) => {
    return {
      ...comment,
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
        href={`#collapseCommentEditorComment`}
        role="button"
        aria-expanded="false"
        aria-controls={`collapseCommentEditorComment`}
      >
        <i class={commentBtnClass}> </i> Feedback ({allComments.length ?? 0})
      </a>
    </div>

    <div class="collapse" id={`collapseCommentEditorComment`}>
      <div>
        <ul>
          {allComments.map((comment) => {
            const createdAt = new Date(comment.createdAt);
            const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
            return (
              <li>
                {formattedCreatedAt} <b>{comment.accountId}: </b>{" "}
                {comment.message}
              </li>
            );
          })}
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
              v1: {
                comments: [
                  ...myComments,
                  {
                    message: state.message,
                    createdAt: new Date().getTime(),
                  },
                ],
              },
            },
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
