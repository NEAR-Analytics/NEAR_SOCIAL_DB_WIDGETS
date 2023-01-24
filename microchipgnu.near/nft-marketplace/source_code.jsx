const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query MyQuery {
        mb_store_minters(limit: 10) {
          minter_id
        }
      }`,
  }),
});

if (!data.ok) {
  return "Loading";
}

return data !== null ? <div>Marketplace</div> : <p>loading...</p>;
