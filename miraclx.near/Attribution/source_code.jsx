let accountId = props.accountId ?? "miraclx.near";
let nameOnly = props.nameOnly ?? false;

return (
  <span class="text-muted">
    {nameOnly ? <></> : <> By</>}
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      class="text-muted text-truncate"
    >
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId,
          hideAccountId: true,
          tooltip: true,
          link: false,
        }}
      />
    </a>
  </span>
);
