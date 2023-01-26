const accountId = props.accountId ?? context.accountId;
const profile = props.profile;

return (
  <span>
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{
        accountId,
        profile,
        link: `#/neardevgov.near/widget/ProfilePage?accountId=${accountId}`,
      }}
    />
    <Widget
      src="neardevgov.near/widget/BadgesList"
      props={{
        accountId,
        mode: "compact",
      }}
    />
  </span>
);
