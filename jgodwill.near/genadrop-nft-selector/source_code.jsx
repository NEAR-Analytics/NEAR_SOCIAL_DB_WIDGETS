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

const finalData = data?.body?.data;

if (finalData) {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      You own no NFT yet. You can mint an NFT on 💧
      <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
        GenaDrop
      </a>
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ authors: [props.ownerId], dep: true }}
      />
    </div>
  );
}

return (
  <>
    <div
      className="d-flex flex-wrap gap-2 justify-content-center"
      style={{
        height: "334px",
        overflow: "auto",
      }}
    >
      {finalData.tokens.map((nft, index) => (
        <div
          key={`${nft.contractId}-${nft.tokenId}-${index}`}
          role="button"
          style={{ width: "15%", aspectRatio: "1/1" }}
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
              },
              className: "",
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
              alt: `NFT ${nft.contractId} ${nft.tokenId}`,
            }}
          />
        </div>
      ))}
    </div>
  </>
);
