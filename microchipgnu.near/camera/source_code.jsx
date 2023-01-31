const proxyMinter = "proxy2.minsta.near";
const nftContractId = "minsta.mintbase1.near";

let posts = Array.from(Array(10).keys());

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query FetchFeedMintedThings($accountId: String!, $contractAddress: String) {
    token: mb_views_nft_tokens(
      where: {
        minter: { _eq: $accountId }
        nft_contract_id: { _eq: $contractAddress }
        burned_timestamp: { _is_null: true }
      }
      order_by: { minted_timestamp: desc }
    ) {
      id: token_id
      createdAt: minted_timestamp
      media
      title
      description
      metadata_id
    }
  }
`,
    variables: {
      accountId: proxyMinter,
      contractAddress: nftContractId,
    },
  }),
});

console.log(data.body.data.token);

if (data?.body?.data?.token) {
  posts = data?.body?.data?.token;
}

return (
  <div class="bg-black text-white p-2 rounded container-fluid">
    <div class="w-full d-flex justify-content-center py-4">
      <div class="text-center">
        <p>Minsta</p>

        <input type="file" name="picture" accept="image/*" capture="user" />
      </div>
    </div>
    <div class="container-fluid d-flex flex-wrap justify-content-center gap-2">
      {posts.map((post) => {
        return (
          <div
            class="col-md-4 col-sm-6 px-1"
            style={{ width: "150px", height: "150px" }}
          >
            <img src={post.media} class="img-fluid" />
          </div>
        );
      })}
    </div>
  </div>
);
