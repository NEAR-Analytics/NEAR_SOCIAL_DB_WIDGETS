const accountId = props.accountId || context.accountId;

if (!accountId) {
  return "";
}

const data = fetch(
  `https://api.kitwallet.app/account/${accountId}/likelyNFTsFromBlock`
);

let allNfts = [];

if (data.body?.list) {
  allNfts = [];

  data.body.list.forEach((contractId) => {
    const nfts = Near.view(contractId, "nft_tokens_for_owner", {
      account_id: accountId,
      from_index: "0",
      limit: 200,
    });

    if (nfts) {
      nfts.forEach((nft) => {
        allNfts.push({
          ...nft,
          contractId,
        });
      });
    }
  });
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const Card = styled.a`
  display: block;
  text-decoration: none;
  padding-top: 100%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 12px 16px rgba(16, 24, 40, 0.08), 0px 4px 6px rgba(16, 24, 40, 0.03);

  .nft-thumbnail {
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

return (
  <Wrapper>
    {allNfts.map((nft, i) => (
      <Card
        key={i}
        href={`/#/mob.near/widget/NftImage?tokenId=${nft.token_id}&contractId=${nft.contractId}`}
      >
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: { tokenId: nft.token_id, contractId: nft.contractId },
            className: "nft-thumbnail",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
            alt: `NFT ${nft.contractId} ${nft.token_id}`,
          }}
        />
      </Card>
    ))}
  </Wrapper>
);
