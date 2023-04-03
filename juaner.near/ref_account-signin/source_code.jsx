let accountId = context.accountId;

if (accountId) return <div />;

return (
  <div>
    <a href="#">Please sign in with NEAR wallet</a>
  </div>
);
