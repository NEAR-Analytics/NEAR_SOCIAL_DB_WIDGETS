const myAccountId = props.accountId ?? context.accountId;
if (!myAccountId) {
  return "Please sign in with NEAR wallet ";
}

const bountyId = (props.bountyId || "").replaceAll(".", "");
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

  if (accountId === myAccountId) {
    myComments = comments;
  }

  console.log({ acc, accountId, comments, accountData, myComments });

  return acc.concat(comments);
}, []);

console.log({ bountyId, comments, data, allComments, myComments, accounts });

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
        <i class={commentBtnClass}> </i> Comment ({allComments.length ?? 0})
      </a>
    </div>

    <div class="collapse" id={`collapseCommentEditorComment-${bountyId}`}>
      <div>
        <ul>
          {allComments.map((comment) => (
            <li>
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
            bounties: {
              [bountyId]: {
                comments: [
                  ...myComments,
                  {
                    accountId,
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
