let accountId = context.accountId;

if (accountId) return <div />;

return (
  <div>
    <a>Please sign in with NEAR wallet</a>
  </div>
);
