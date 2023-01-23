const accountId = props.accountId ?? context.accountId;
const profile = props.profile;

return (
  <span>
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{
        accountId,
        profile,
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
