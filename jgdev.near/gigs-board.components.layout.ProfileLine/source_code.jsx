const accountId = props.accountId ?? context.accountId;

return (
  <span>
    <Widget
      src="components.layout.ProfileLineNew"
      props={{
        ...props,
        accountId,
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
