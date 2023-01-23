const accountId = props.accountId ?? context.accountId;

return (
  <div>
    <h3>Awards by NEAR Developer Governance</h3>
    <Widget
      src="neardevgov.near/widget/BadgesList"
      props={{
        accountId,
        mode: "normal",
      }}
    />
  </div>
);
