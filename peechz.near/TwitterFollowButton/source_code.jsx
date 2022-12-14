const accountId = context.accountId || props.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const linkTree = Social.get(`${accountId}/profile/linktree/*`);

if (linkTree === null) {
  return "Loading...";
}

const twitterAccount = linkTree["twitter"];
const accountLink = `https://twitter.com/${twitterAccount}?ref_src=twsrc%5Etfw`;
const innerText = `Follow @${twitterAccount}`;

return (
  <a
    class="twitter-follow-button"
    src="https://platform.twitter.com/widgets.js"
    href={accountLink}
    data-size="large"
  >
    {innerText}
  </a>
);
