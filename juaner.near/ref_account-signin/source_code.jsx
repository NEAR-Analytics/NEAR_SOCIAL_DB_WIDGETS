let accountId = context.accountId;

if (accountId) return <div />;

return (
  <div>
    <a href="#" target="blank">
      Please sign in with NEAR wallet
    </a>
  </div>
);
