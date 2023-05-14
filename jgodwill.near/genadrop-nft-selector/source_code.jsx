const accountId = props.accountId || context.accountId;
const onChange = props.onChange;

if (!accountId) {
  return <></>;
}

const size = "100%";

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query v2_omnisite_GetOwnedTokens{
    tokens: mb_views_nft_owned_tokens(
      where: {
        owner: { _eq: "${accountId}" }
      }
    ) {
      tokenId: token_id
      contractId: nft_contract_id
      media
    }}
`,
  }),
});

const NFTImageButton = styled.button`
  aspect-ratio: 1/1;
  height: 100px;
  transition: all 0.4s ease-in-out;
  border: 1.41429px solid rgba(28,27,28,.1);
  border-radius: 10px;
  outline:none;
  background:transparent;
  opacity:0.9;
  flex: 1;
  min-width: 100px;
  max-width: 200px;
  object-fit: cover;
  padding:unset;
  overflow:hidden;
  box-shadow: 4px 4px 20px 6px rgba(0,0,0,.2);
  margin: 0 auto;
  &:hover{
    opacity:1;
  }
  &>img{
  transition: all 0.3s ease-in-out;
  }
  &>img:hover{
    transform:scale(1.05);
  }
`;

const NFTs = styled.div`
  display: flex;
  gap: 2rem;
  align-items:center;
  margin-top: 20px;
  width:100%;
  padding: 1rem;
  overflow-y:scroll;
  flex-wrap: wrap;
  height:200px;
`;

const Heading = styled.p`
  margin: 10px auto 10px auto;
  font-size: 1.3em;
  color:#0f1d40;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
`;
const Text = styled.p`
  margin: 10px auto 10px auto;
  font-size: 1em;
  color:#0f1d40;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display", sans-serif;
`;

const finalData = data?.body?.data;

if (!finalData) {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center flex-column">
      <Heading className="text-center fw-bold">You own no NFT yet.</Heading>
      <p>
        You can mint an NFT on 💧
        <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
          GenaDrop
        </a>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [props.ownerId], dep: true }}
        />
      </p>
    </div>
  );
}

return (
  <>
    <Text className="text-center">Select the NFT you want to list</Text>
    <NFTs>
      {finalData.tokens.map((nft, index) => (
        <NFTImageButton
          key={`${nft.contractId}-${nft.tokenId}-${index}`}
          onClick={() => {
            onChange({
              contractId: nft.contractId,
              tokenId: nft.tokenId,
            });
          }}
        >
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              nft: { tokenId: nft.tokenId, contractId: nft.contractId },
              style: {
                width: size,
                height: size,
                objectFit: "cover",
                minWidth: size,
                minHeight: size,
                maxWidth: size,
                maxHeight: size,
                overflowWrap: "break-word",
                borderRadius: "inherit",
              },
              className: "",
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
              alt: `NFT ${nft.contractId} ${nft.tokenId}`,
            }}
          />
        </NFTImageButton>
      ))}
    </NFTs>
  </>
);
