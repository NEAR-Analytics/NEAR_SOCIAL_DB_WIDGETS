//ProfileLine
const accountId = props.accountId ?? context.accountId;
const link = props.link ?? true;
const profileImageTooltipItems = props.profileImageTooltipItems ?? [];

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const inner = (
  <>
    <div className="flex align-center">
      <Widget
        src="roshaan.near/widget/ProfileImage"
        props={{
          style: { width: "3em", height: "3em" },
          profile,
          tooltip: true,
          tooltipItems: profileImageTooltipItems,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded w-100 h-100 align-top",
        }}
      />
      <span>
        {profile.name || ""}
        <span className="text-muted">@{accountId}</span>
      </span>
    </div>
  </>
);

return link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="link-dark text-truncate"
    style={{ textDecoration: "none" }}
  >
    {inner}
  </a>
) : (
  <span className="text-truncate">{inner}</span>
);
