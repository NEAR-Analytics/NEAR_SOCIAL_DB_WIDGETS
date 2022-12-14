const accountId = context.accountId || props.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const linkTree = Social.get(`${accountId}/profile/linktree/*`);

if (linkTree === null) {
  return "Loading...";
}

const followBtn = () => {
  let twitterAccount = linkTree["twitter"];
  let accountLink = `https://twitter.com/${twitterAccount}`;
  let innerText = `Follow @${twitterAccount}`;

  return (
    <a class="twitter-follow-button" href={accountLink}>
      {innerText}
    </a>
  );
};
