const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

return (
  <a
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
    className="text-decoration-none link-dark text-truncate"
  >
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        style: { width: "1.5em", height: "1.5em" },
        profile,
        accountId,
        className: "d-inline-block",
        imageClassName: "rounded w-100 h-100 align-top",
      }}
    />
    {profile.name || "No-name profile"}
    <span className="text-secondary">@{accountId}</span>
  </a>
);
