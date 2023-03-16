let accountId = context.accountId;

const url = document.referrer;
console.log("url", url, window.top.location.href, document.location.href);

if (accountId) return <div />;

return (
  <div>
    <a href="https://wallet.near.org/" target="blank">
      Please sign in with NEAR wallet
    </a>
  </div>
);
