const accountId = props.accountId ?? context.accountId;

return (
  <div>
    <h3>Awards by NEAR Developer Governance</h3>
    <Widget
      src="frol.near/widget/DevGovBadgesList"
      props={{
        accountId,
        mode: "normal",
      }}
    />
  </div>
);
