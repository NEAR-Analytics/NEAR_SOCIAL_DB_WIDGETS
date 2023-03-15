State.init({
  ownedCollections: [],
  name: "eric",
  ownedNFTs: {},
  selectedContractId: "",
  selectedTokenId: "",
});

const accountId = context.accountId;
async function getCollections() {
  asyncFetch(
    `https://near-get-account-collection.onrender.com/fetch?accountId=${context.accountId}`
  ).then((res) => {
    const collections = res.body;
    State.update({
      ownedCollections: collections,
    });
    let collectionMetadatas = [];
    for (const collection of collections) {
      try {
        const metadata = Near.view(collection, "nft_metadata", {});
        const ownedTokens = Near.view(collection, "nft_tokens_for_owner", {
          account_id: context.accountId,
        });

        State.update({
          ownedNFTs: {
            ...state.ownedNFTs,
            [collection]: {
              metadata,
              ownedTokens,
            },
          },
        });
      } catch (e) {}
    }
  });
}
function parseImageUrl(tokenMedia, baseURI) {
  if (!tokenMedia || !baseURI) return;
  if (!baseURI.endsWith("/")) {
    baseURI = baseURI + "/";
  }

  if (tokenMedia.includes("://")) {
    return tokenMedia;
  }

  return baseURI + tokenMedia;
}

function selectNFT(contractId, tokenId) {
  console.log(contractId);
  console.log(tokenId);
  State.update({
    selectedContractId: contractId,
    selectedTokenId: tokenId,
  });
}
return (
  <div>
    <button onClick={getCollections}>Fetch Tokens</button>
    <p>Selected Contract ID: {state.selectedContractId}</p>
    <p> Selected Token ID : {state.selectedTokenId}</p>
    <div>
      {Object.keys(state.ownedNFTs)
        .filter((collection) => !!state.ownedNFTs[collection].metadata)
        .filter(
          (collection) => state.ownedNFTs[collection].ownedTokens.length > 0
        )
        .map((collection) => {
          return (
            <div>
              {state.ownedNFTs[collection].metadata.name}
              <br />
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                {state.ownedNFTs[collection].ownedTokens.map((token) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={parseImageUrl(
                          token.metadata.media,
                          state.ownedNFTs[collection].metadata.base_uri
                        )}
                        style={{
                          height: "100px",
                          cursor: "pointer",
                        }}
                        onClick={() => selectNFT(collection, token.token_id)}
                      />
                      <p>{token.token_id}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  </div>
);
