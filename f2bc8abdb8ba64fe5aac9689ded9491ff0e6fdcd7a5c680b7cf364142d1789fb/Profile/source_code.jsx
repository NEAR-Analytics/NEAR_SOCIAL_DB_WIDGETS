const accountId = props.userMakingQuestion ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;

function makeAccountIdShorter(accountId) {
  if (accountId.length > 12) {
    return accountId.slice(0, 12) + "...";
  }
  return accountId;
}

return (
  <div className="profile d-inline-block">
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
        <div
          className="profile-name text-truncate"
          style={{ fontWeight: "500" }}
        >
          {name || "No-name profile"}
        </div>
        <div className="profile-links d-flex">
          <div className="d-inline-block profile-account text-secondary text-truncate">
            @{makeAccountIdShorter(accountId)}
          </div>
        </div>
      </div>
    </a>
  </div>
);
