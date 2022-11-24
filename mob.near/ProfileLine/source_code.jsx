const accountId = props.accountId ?? context.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name || "No-name profile";
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

let inner = (
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
    {name}
    {!hideAccountId && <span className="text-muted">@{accountId}</span>}
  </>
);

inner = link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="link-dark text-truncate"
  >
    {inner}
  </a>
) : (
  <span className="text-truncate">{inner}</span>
);

if (tooltip) {
  inner = (
    <OverlayTrigger placement="auto" overlay={<Tooltip>{tooltip}</Tooltip>}>
      {inner}
    </OverlayTrigger>
  );
}

return inner;
