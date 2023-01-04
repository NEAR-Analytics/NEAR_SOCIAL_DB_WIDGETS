State.init({ profile: {} });

if (state.profile == {}) {
  return "Loading";
}

let profile = Social.getr(`${props.accountId}/profile`);
if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

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
        <div className="d-flex">
          <div
            className="profile-image d-inline-block"
            styke={{ width: "3em", height: "3em" }}
          >
            <img
              className="rounded w-100 h-100"
              src="https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm"
              alt={accountId}
              style={{ objectFit: "cover", aspectRatio: "1", height: "48px" }}
            />
          </div>
          <span>{accountId}</span>
        </div>
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
