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
      limit: 30
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

if (data?.body?.data?.token) {
  posts = data?.body?.data?.token;
}

return (
  <div class="bg-black text-white p-2 rounded container-fluid">
    <div class="w-full d-flex justify-content-between py-4 px-4">
      <div
        style={{
          display: "inline-block",
          padding: "6px 6px",
        }}
      >
        Minsta
      </div>

      <div>
        <label
          for="file-upload"
          style={{
            display: "inline-block",
            padding: "6px 6px",
            cursor: "pointer",
          }}
        >
          Camera
        </label>

        <input
          id="file-upload"
          type="file"
          name="picture"
          accept="image/*"
          capture="user"
          style={{ display: "none" }}
        />
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
