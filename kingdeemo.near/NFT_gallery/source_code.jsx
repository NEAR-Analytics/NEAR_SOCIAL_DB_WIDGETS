const apiUrl = "https://api.indexer.xyz/graphql";
const apiKey = "Krqwh4b.bae381951d6050d351945c0c750f1510";
const apiUser = "Banyan";

initState({ nfts: [] });
const headers = {
  "x-api-key": apiKey,
  "x-api-user": apiUser,
  "Content-Type": "application/json",
};

function fetchData() {
  const response = fetch("https://api.indexer.xyz/graphql", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "x-api-user": apiUser,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
      aptos {
        nfts(limit: 18) {
          id
          name
          owner
          media_url
          rarity
          token_id
          collection {
        id
      }
        }
      }
    }`,
    }),
  });

  if (response === null) {
    return "";
  } else {
    State.update({ nfts: response.body.data.aptos.nfts });
    // console.log("Body: ", response.body.data.aptos.nfts);
    return state.nfts;
  }
}

fetchData();

return (
  <div>
    {state.nfts.length > 0 && (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {state.nfts.map((nft) => (
          <a
            href={`#/kingdeemo.near/widget/nft_page?id=${nft.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <img
                src={nft.media_url}
                alt={nft.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "18px", margin: "0 0 10px" }}>
                {nft.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#3f51b5",
                    borderRadius: "20px",
                    color: "#fff",
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "3px 8px",
                    maxWidth: "160px", // Add maxWidth to limit the width
                    overflow: "hidden", // Add overflow to handle long text
                    textOverflow: "ellipsis", // Add textOverflow to show ellipsis for overflowing text
                    whiteSpace: "nowrap", // Add whiteSpace to prevent line breaks
                  }}
                >
                  Owner ID: {nft.owner}
                </span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  maxWidth: "160px", // Add maxWidth to limit the width
                  overflow: "hidden", // Add overflow to handle long text
                  textOverflow: "ellipsis", // Add textOverflow to show ellipsis for overflowing text
                  whiteSpace: "nowrap", // Add whiteSpace to prevent line breaks
                }}
              >
                Token ID: {nft.token_id}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  maxWidth: "160px", // Add maxWidth to limit the width
                  overflow: "hidden", // Add overflow to handle long text
                  textOverflow: "ellipsis", // Add textOverflow to show ellipsis for overflowing text
                  whiteSpace: "nowrap", // Add whiteSpace to prevent line breaks
                }}
              >
                Collection: {nft.collection.id}
              </p>
            </div>
          </a>
        ))}
      </div>
    )}
  </div>
);
