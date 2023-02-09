const accountId = context?.accountId;

const proxyMinter = "proxy2.minsta.near";
const nftContractId = "minsta.mintbase1.near";
const mbGraphEndpoint = "https://graph.mintbase.xyz";

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

let posts = [];

const data = fetch(mbGraphEndpoint, {
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
      limit: 3
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

const handleImageUpload = (files) => {
  if (files?.length > 0) {
    State.update({
      img: {
        uploading: true,
        cid: null,
      },
    });
    const body = files[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;

      State.update({
        img: {
          cid,
        },
      });

      handleMint(cid);
    });
  } else {
    State.update({
      img: null,
    });
  }
};

const handleMint = (cid) => {
  const gas = 200000000000000;
  const deposit = 0;

  Near.call([
    {
      contractName: proxyMinter,
      methodName: "mint",
      args: {
        owner_id: accountId,
        metadata: {
          media: ipfsUrl(cid),
        },
        num_to_mint: 1,
        royalty_args: {
          split_between: {
            [accountId]: 10000,
          },
          percentage: 1000,
        },
        split_owners: null,
        nft_contract_id: nftContractId,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

if (data?.body?.data?.token) {
  posts = data?.body?.data?.token;
}

if (posts.length === 0) {
  return "Loading...";
}

return (
  <div class="text-black p-2 container-fluid">
    <div class="container-fluid d-flex flex-wrap justify-content-center gap-2">
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        clickable
        onChange={handleImageUpload}
        style={{
          cursor: "pointer",
        }}
      >
        <div
          class="col-md-4 col-sm-6 px-1 d-flex justify-content-center align-items-center"
          style={{ width: "150px", height: "150px" }}
        >
          {state.img?.uploading ? <>...</> : state.img?.cid ? "Replace" : "+"}
        </div>
      </Files>
      {posts.map((post) => {
        return (
          <div
            class="col-md-4 col-sm-6 px-1 d-flex justify-content-center"
            style={{ width: "150px", height: "150px" }}
          >
            <img src={post.media} class="object-fit-contain w-100" />
          </div>
        );
      })}
      <div
        class="col-md-4 col-sm-6 px-1 d-flex justify-content-center align-items-center"
        style={{ width: "150px", height: "150px" }}
      >
        {`>>>`}
      </div>
    </div>
  </div>
);
