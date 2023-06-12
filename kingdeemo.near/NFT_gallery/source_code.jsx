const apiUrl = " https://api.indexer.xyz/graphql";
const apiKey = "Krqwh4b.bae381951d6050d351945c0c750f1510";
const apiUser = "Banyan";

initState({ nfts: null });

const headers = {
  "x-api-key": apiKey,
  "x-api-user": apiUser,
  "Content-Type": "application/json",
};

const query = {
  query: `query MyQuery {
    aptos {
      nfts(limit: 3) {
        id
        name
        owner
        media_url
        rarity
      }
    }
  }`,
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
        nfts(limit: 3) {
          id
          name
          owner
          media_url
          rarity
        }
      }
    }`,
    }),
  });
  if (response.body.errors[0].message) {
    console.log("ERROR MESSAGE: ", response.body.errors[0].message);
  } else {
    State.update({ nfts: response.body.data.aptos.nfts });
    // console.log("Body: ", response.body.data.aptos.nfts);
    return state.nfts;
  }
}

fetchData();

return (
  <div>
    {state.nfts.map((nft) => (
      <img src={nft.media_url} />
    ))}
  </div>
);
