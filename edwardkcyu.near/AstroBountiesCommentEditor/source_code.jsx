const myAccountId = props.accountId ?? context.accountId;
if (!myAccountId) {
  return "Please sign in with NEAR wallet ";
}

const bountyId = props.bountyId;
if (!bountyId) {
  return "Please provide a bounty id";
}

State.init({ message: "" });

const data =
  Social.get(`*/astrosocial/bounties/${bountyId}/comments`, "final") || {};

const accounts = Object.keys(data);

let myComments = [];
const allComments = accounts.reduce((acc, accountId) => {
  const accountData = data[accountId];

  const comments = JSON.parse(
    accountData.astrosocial.bounties[bountyId].comments
  );

  const enrichedComments = comments.map((comment) => {
    const createdAt = new Date(comment.createdAt);

    return {
      ...comment,
      accountId,
    };
  });

  if (accountId === myAccountId) {
    myComments = enrichedComments;
  }

  return acc.concat(enrichedComments);
}, []);
allComments.sort((a, b) => {
  if (a.createdAt < b.createdAt) return -1;
  if (a.createdAt > b.createdAt) return 1;
  return 0;
});

const sanitizedBountyId = props.bountyId.replaceAll(".", "");
return (
  <div>
    <div>
      <a
        class="card-link"
        data-bs-toggle="collapse"
        href={`#collapseCommentEditorComment-${sanitizedBountyId}`}
        role="button"
        aria-expanded="false"
        aria-controls={`collapseCommentEditorComment-${sanitizedBountyId}`}
      >
        <i class={commentBtnClass}> </i> Comment ({allComments.length ?? 0})
      </a>
    </div>

    <div
      class="collapse"
      id={`collapseCommentEditorComment-${sanitizedBountyId}`}
    >
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
            bounties: {
              [bountyId]: {
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
