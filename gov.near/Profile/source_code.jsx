const ownerId = "gov.near";
const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${ownerId}/profile`);

const name = "NEAR Global";
const image = profile.image;
const tags = Object.keys(profile.tags ?? {});

return (
  <div className="profile">
    <div className="profile-info">
      <a
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        className="text-decoration-none link-dark"
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            accountId,
            className: "float-start me-2",
          }}
        />
        <div className="profile-name">
          <span className="fw-bold">{name || "< Profile Name >"}</span>
          <small>
            <span className="font-monospace m-1">@{ownerId}</span>
          </small>
        </div>
      </a>
    </div>
    <div className="profile-tags text-muted ">
      <Widget src="gov.near/widget/JoinStats" props={{ ownerId }} />
    </div>
  </div>
);
