const accountId = props.accountId ?? context.accountId;
const link = props.link ?? true;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const inner = (
  <>
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
  </>
);

return link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="text-decoration-none link-dark text-truncate"
  >
    {inner}
  </a>
) : (
  <span className="text-truncate">{inner}</span>
);
