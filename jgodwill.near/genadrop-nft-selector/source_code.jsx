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
  width: 25%;
  aspect-ratio: 1/1;
  height: 25%;
  transition: all 0.4s ease-in-out;
  border: 1.41429px solid rgba(28,27,28,.1);
  border-radius: 10px;
  outline:none;
  background:transparent;
  opacity:0.9;
  object-fit: cover;
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
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 20px;
  width:100%;
  padding: 1rem;
`;

const Heading = styled.p`
  margin: 10px auto 10px auto;
  font-size: 1em;
  color:#0f1d40;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
`;

const finalData = data?.body?.data;

if (!finalData) {
  return (
    <div className="d-flex vh-100 flex-wrap gap-2 justify-content-center align-items-center flex-column">
      <Heading className="text-center fs-2 fw-bold">
        You own no NFT yet.
      </Heading>
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
    <Heading className="text-center fs-2 fw-bold">
      Select the NFT you want to list
    </Heading>
    <NFTs className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
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
