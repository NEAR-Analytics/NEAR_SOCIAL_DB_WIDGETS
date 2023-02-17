const accountId = props.accountId || context.accountId;

if (!accountId) {
  return "";
}

const data = fetch(
  `https://api.kitwallet.app/account/${accountId}/likelyNFTsFromBlock`
);

let allNfts = [];
let accountHasNfts = null;

if (data.body?.list) {
  allNfts = [];

  data.body.list.forEach((contractId, i) => {
    const nfts = Near.view(contractId, "nft_tokens_for_owner", {
      account_id: accountId,
      from_index: "0",
      limit: 200,
    });

    console.log(nfts, 1);

    if (nfts?.length > 0) {
      accountHasNfts = true;

      nfts.forEach((nft) => {
        allNfts.push({
          ...nft,
          contractId,
        });
      });
    } else if (i + 1 === data.body.list.length) {
      accountHasNfts = accountHasNfts ? true : false;
    }
  });
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

if (accountHasNfts === false) {
  return <Text>This account doesn&apos;t have any NFTs yet.</Text>;
}

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
