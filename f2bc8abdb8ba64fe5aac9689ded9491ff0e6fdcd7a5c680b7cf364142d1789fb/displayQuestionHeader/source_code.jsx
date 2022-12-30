let profile = Social.getr(`${props.accountId}/profile`);
let amountOfQuestionsByThisUser = 0;

//TODO review this
for (let i = 0; i < props.allUsersQuestions.length; i++) {
  if (props.allUsersQuestions[i].accountId == props.accountId) {
    amountOfQuestionsByThisUser++;
  }
}

function makeAccountIdShorter(accountId) {
  if (accountId.length > 12) {
    return accountId.slice(0, 12) + "...";
  }
  return accountId;
}

return (
  <div className="d-flex justify-content-between w-100">
    <a
      className="d-flex"
      href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      style={{ color: "#010A2D" }}
    >
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
            textDecotarion: "none",
          }}
        >
          {profile ? makeAccountIdShorter(profile.name) : "Loading..."}
        </p>
        <p
          className="text-secondary"
          style={{ margin: "0", textDecotarion: "none" }}
        >
          {makeAccountIdShorter(props.accountId)}
        </p>
      </div>
    </a>
    <p className="text-secondary">Total: {amountOfQuestionsByThisUser}</p>
  </div>
);
