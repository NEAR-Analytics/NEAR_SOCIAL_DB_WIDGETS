let profile = Social.getr(`${props.accountId}/profile`);
let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

function makeAccountIdShorter(accountId) {
  if (accountId.length > 12) {
    return accountId.slice(0, 12) + "...";
  }
  return accountId;
}

return (
  <div className="d-flex justify-content-between w-100">
    <div className="d-flex">
      {profile ? (
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            accountId,
            className: "float-start d-inline-block me-2",
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div style={{ marginLeft: "1rem" }}>
        <p
          style={{
            margin: "0",
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
        >
          {profile ? makeAccountIdShorter(profile.name) : "Loading..."}
        </p>
        <p className="text-secondary" style={{ margin: "0" }}>
          {makeAccountIdShorter(props.accountId)}
        </p>
      </div>
    </div>
    {questions ? (
      <p className="text-secondary">Total: {questions.length}</p>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
