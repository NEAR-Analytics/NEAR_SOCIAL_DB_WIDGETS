const accountId = props.accountId ?? context.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

let inner = (
  <>
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        style: { width: "1.5em", height: "1.5em", marginRight: "0.1em" },
        profile,
        accountId,
        className: "d-inline-block",
        imageClassName: "rounded w-100 h-100 align-top",
      }}
    />
    {!hideName && name}
    {!hideAccountId && <span className="text-muted ms-1">@{accountId}</span>}
  </>
);

inner = link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="link-dark text-truncate d-inline-flex"
  >
    {inner}
  </a>
) : (
  <span className="text-truncate d-inline-flex">{inner}</span>
);

if (props.tooltip === true) {
  return (
    <Widget
      src="mob.near/widget/Profile.OverlayTrigger"
      props={{ accountId, children: inner }}
    />
  );
}
if (tooltip) {
  inner = (
    <OverlayTrigger placement="auto" overlay={<Tooltip>{tooltip}</Tooltip>}>
      {inner}
    </OverlayTrigger>
  );
}

return inner;
