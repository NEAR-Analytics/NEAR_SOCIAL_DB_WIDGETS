const accountId = context.accountId || null;

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
    query MyQuery($accountId: String){
          mb_views_nft_tokens(
                    where: {nft_contract_id: {_eq: "nft.harmonic1.near"}, owner: {_eq: $accountId}}
                    limit: 50
                    ) {
                    title
                    description
                    nft_contract_id
                    media
                    token_id
            }
        }
`,
    variables: {
      accountId: accountId,
    },
  }),
});

if (!data.ok) {
  return "Loading";
}

const size = "10em";

const containerStyle = {
  maxWidth: "500px",
  margin: "0 auto",
  padding: "2rem",
  backgroundColor: "#f5f5f5",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "0.5rem",
};

return data !== null && accountId !== null ? (
  <>
    <div style={containerStyle}>
      <h1>NFT Viewer</h1>
      <p style={labelStyle}>Your NFTs from nft.harmonic1.near Contract.</p>
      <div className="d-flex gap-4 flex-wrap">
        {data.body.data?.mb_views_nft_tokens.map((listing, i) => {
          return (
            <div className="my-3 d-flex flex-column gap-1">
              <Widget
                src="mob.near/widget/NftImage"
                props={{
                  nft: {
                    tokenId: listing.token_id,
                    contractId: listing.nft_contract_id,
                  },
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
                  thumbnail: "thumbnail",
                  className: "",
                  fallbackUrl:
                    "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                }}
              />
              {listing.title}
            </div>
          );
        })}
      </div>
    </div>
  </>
) : (
  <div style={containerStyle}>
    <h1>NFT Viewer</h1>
    <p style={labelStyle}>
      Loading... <br />
      (If you are not logged in, please do.)
    </p>
  </div>
);
