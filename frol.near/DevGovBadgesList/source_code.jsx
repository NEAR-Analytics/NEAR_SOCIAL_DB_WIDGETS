const accountId = props.accountId || context.accountId;
const style = props.style || { width: "1.5em", height: "1.5em" };
const nearDevGovBadgesContractId = "devgov-badges.frol.near";

const ownedBadges = Near.view(
  nearDevGovBadgesContractId,
  "nft_tokens_for_owner",
  {
    account_id: accountId,
  }
);

if (!ownedBadges) {
  return <>Loading...</>;
}

return (
  <>
    {ownedBadges.map(({ token_id: tokenId, metadata }) => (
      <a
        href={`#/devgov-badges.frol.near/widget/DevGovBadgeDetails?tokenId=${tokenId}`}
        title={`NEAR DevGov Badge - ${metadata.title}`}
      >
        <Widget
          src="mob.near/widget/Image"
          props={{
            style,
            image: { ipfs_cid: metadata.media },
            alt: `NEAR DevGov Badge - ${metadata.title}`,
          }}
        />
      </a>
    ))}
  </>
);
