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
  <div style={{ backgroundColor: "black" }}>
    {state.nfts.length > 0 && (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {state.nfts.map((nft) => (
          <a
            href={`#/kingdeemo.near/widget/nft_page?id=${nft.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none color-inherit"
            key={nft.id}
          >
            <div className="bg-black border-white rounded-2xl shadow-md p-4 text-center">
              <img
                src={nft.media_url}
                alt={nft.name}
                className="w-full h-auto rounded-2xl object-cover mb-4"
              />
              <h3 className="text-xl mb-2 text-white">{nft.name}</h3>
              <div className="mb-2">
                <span className="bg-blue-500 rounded-full text-white text-xs font-bold py-1 px-2 max-w-32 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Owner ID: {nft.owner}
                </span>
              </div>
              <p className="text-sm text-white mb-1 max-w-32 overflow-hidden overflow-ellipsis whitespace-nowrap">
                Token ID: {nft.token_id}
              </p>
              <p className="text-sm text-white max-w-32 overflow-hidden overflow-ellipsis whitespace-nowrap">
                Collection: {nft.collection.id}
              </p>
            </div>
          </a>
        ))}
      </div>
    )}
  </div>
);
