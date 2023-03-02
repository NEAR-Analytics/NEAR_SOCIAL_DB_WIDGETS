return (
  <span>
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{
        ...props,
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
