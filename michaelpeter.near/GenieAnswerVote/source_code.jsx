const { questionRef, answeredBy } = props;

const votes = Social.index("genie", `vote/${questionRef}/${answeredBy}`) || [];
const upvotes = votes.filter((v) => v.value.dir === 1).length;
const downvotes = votes.filter((v) => v.value.dir === -1).length;

return (
  <div className="d-flex flex-column gap-1">
    {JSON.stringify(votes)}
    <div>Upvotes: {upvotes}</div>
    <div>Downvotes: {downvotes}</div>
    <div
      className="d-flex flex-row"
      style={{
        width: "8rem",
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: ".5rem",
      }}
    >
      <CommitButton
        className="btn btn-outline-dark col-8"
        style={{
          borderRadius: 0,
          borderRight: "1px solid black",
          borderLeft: "0",
          borderTop: "0",
          borderBottom: "0",
        }}
        data={{
          index: {
            genie: JSON.stringify({
              key: `vote/${questionRef}/${answeredBy}`,
              value: {
                questionRef,
                answeredBy,
                dir: 1,
              },
            }),
          },
        }}
      >
        <i className="bi bi-arrow-up-short" />
        {upvotes}
      </CommitButton>
      <CommitButton
        className="btn btn-outline-dark border-none border-0 col"
        style={{ borderRadius: 0 }}
        data={{
          index: {
            genie: JSON.stringify({
              key: `vote/${questionRef}/${answeredBy}`,
              value: {
                questionRef,
                answeredBy,
                dir: -1,
              },
            }),
          },
        }}
      >
        <i className="bi bi-arrow-down-short" />
        {/*downvotes*/}
      </CommitButton>
    </div>
  </div>
);
