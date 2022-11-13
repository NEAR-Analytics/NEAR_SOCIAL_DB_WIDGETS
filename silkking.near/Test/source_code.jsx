// Returns the account Id from the logged person
const accountId = context.accountId;

const data = Social.keys(`${accountId}/post/poll_question`, "final", {
  return_type: "History",
});

return (
  <div>
    {JSON.stringify(data)}
    <CommitButton
      data={{
        post: {
          entry: {
            question: entry.question,
            yes: entry.yes,
            no: entry.no + 1,
          },
        },
      }}
    >
      No
    </CommitButton>
  </div>
);
