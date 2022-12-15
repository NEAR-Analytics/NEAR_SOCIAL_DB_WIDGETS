const { questionRef, answeredBy } = props;

const votes = Social.index("genie", "vote");
const upvotes = votes.filter((v) => v.value.value === 1).length;
const downvotes = votes.filter((v) => v.value.value === -1).length;

return (
  <div className="d-flex flex-column gap-1">
    {JSON.stringify(votes)}
    <div>Upvotes: {upvotes}</div>
    <div>Downvotes: {downvotes}</div>
    <div className="d-flex flex-row gap-1">
      <CommitButton
        data={{
          index: {
            genie: JSON.stringify({
              key: "vote",
              value: {
                questionRef,
                answeredBy,
                dir: 1,
              },
            }),
          },
        }}
      >
        Upvote
      </CommitButton>
      <CommitButton
        data={{
          index: {
            genie: JSON.stringify({
              key: "vote",
              value: {
                questionRef,
                answeredBy,
                dir: -1,
              },
            }),
          },
        }}
      >
        Downvote
      </CommitButton>
    </div>
  </div>
);
