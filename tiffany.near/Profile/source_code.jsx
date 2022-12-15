const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;
const votes = Social.index("genie", `vote/${accountId}`);

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
      <div
        className="profile-info d-inline-flex flex-column gap-1"
        style={{ maxWidth: "30em" }}
      >
        <div className="d-flex flex-row gap-1">
          <div className="profile-name text-truncate">
            {name || "No-name profile"}
          </div>
          <div className="profile-links d-flex">
            <div
              className="d-inline-block profile-account text-secondary text-truncate"
              style={{ maxWidth: "16em" }}
            >
              @{accountId}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row">
          <i class="bi bi-caret-up"></i>
          {votes.length}
        </div>
      </div>{" "}
    </a>
  </div>
);
