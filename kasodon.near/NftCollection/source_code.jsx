const accountId = props.accountId || context.accountId;
const contractId = props.contractId;

if (!contractId) {
  return `Missing prop "contractId"`;
}

if (!accountId) {
  return `Missing prop "accountId"`;
}

const nfts = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  from_index: "0",
  limit: 200,
});

if (!nfts) {
  return "";
}

return (
  <>
    {nfts.map((nft) => (
      <div className="nft-single">
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: { tokenId: nft.token_id, contractId },
            style: {},
            className: "nft-image",
            fallbackUrl: "https://freesvg.org/img/ftfile-broken.png",
            alt: `NFT ${contractId} ${nft.token_id}`,
          }}
        />
        <a
          className="text-decoration-none"
          href={`#mob.near/widget/NftImage?tokenId=${nft.token_id}&contractId=${contractId}`}
        >
          View Details
        </a>
      </div>
    ))}
  </>
);
