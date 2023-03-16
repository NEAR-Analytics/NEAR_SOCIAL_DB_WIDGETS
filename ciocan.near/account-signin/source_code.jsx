let accountId = context.accountId;

if (accountId) return <div />;

return (
  <div>
    <a href="https://wallet.near.org/" target="blank">
      Please sign in with NEAR wallet
    </a>
  </div>
);
