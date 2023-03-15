const accountId = props.accountId || context.accountId;

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
      last_transfer_timestamp
      tokenId: token_id
      contractId: nft_contract_id
      baseUri: base_uri
      metadataId: metadata_id
      title
      minter
      media
      price
      document: reference_blob(path: "$.document")
      animationUrl: reference_blob(path: "$.animation_url")
    }

    tokensCount: mb_views_nft_owned_tokens_aggregate(
      where: {
        owner: { _eq: "${accountId}"  }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`,
  }),
});

const finalData = data?.body?.data;

if (!finalData) {
  return <></>;
}

return (
  <>
    {state ? (
      <div>
        {state.contractId}:{state.tokenId}
      </div>
    ) : null}

    <div className="d-flex flex-wrap gap-2 justify-content-center">
      {finalData.tokens.map((nft, index) => (
        <div
          key={`${nft.contractId}-${nft.tokenId}-${index}`}
          role="button"
          style={{ width: "15%" }}
          onClick={() => {
            State.update({ contractId: nft.contractId, tokenId: nft.tokenId });
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
              alt: `NFT ${contractId} ${nft.token_id}`,
            }}
          />
        </div>
      ))}
    </div>
  </>
);
