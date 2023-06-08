const apiUrl = " https://api.indexer.xyz/graphql";
const apiKey = "Krqwh4b.bae381951d6050d351945c0c750f1510";
const apiUser = "Banyan";

const headers = {
  "x-api-key": apiKey,
  "x-api-user": apiUser,
  "Content-Type": "application/json",
};

const query = {
  query: `query fetchCollectionItems(
    $where: nfts_bool_exp!
    $order_by: [nfts_order_by!]
    $offset: Int
    $limit: Int!
  ) {
    sui {
      nfts(
        where: $where
        order_by: $order_by
        offset: $offset
        limit: $limit
      ) {
        id
        token_id
        token_id_index
        name
        media_url
        media_type
        ranking
        owner
        burned
        staked
        listings(
          where: { listed: { _eq: true } }
          order_by: { price: asc }
        ) {
          id
          price
          block_time
          seller
          market_name
        }
        topBid: bids(
          where: { status: { _eq: "active" } }
          order_by: { price: desc }
          limit: 1
        ) {
          id
          bidder
          price
        }
        lastSale: actions(
          where: { type: { _in: ["buy", "accept-collection-bid", "accept-bid"] } }
          order_by: { block_time: desc }
          limit: 1
        ) {
          price
        }
      }
    }
  }`,
  variables: {
    where: {
      collection: {
        slug: {
          _eq: "0xee496a0cc04d06a345982ba6697c90c619020de9e274408c7819f787ff66e1a1",
        },
      },
      _or: [
        {
          _not: {
            listings: {
              listed: {
                _eq: true,
              },
            },
          },
        },
        {
          listings: {
            listed: {
              _eq: true,
            },
          },
        },
      ],
    },
    order_by: [
      {
        listings_aggregate: {
          min: {
            price: "asc_nulls_last",
          },
        },
      },
      {
        ranking: "asc",
      },
    ],
    limit: 3,
  },
};

function fetchData() {
  let nfts;
  fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(query),
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the API response data
      // console.log(data.data.sui)
      nfts = data.data.sui.nfts;
      console.log(nfts);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

function suiFrensExplore() {
  return (
    <div className="container-fluid">
      <div className="w-100">
        <div>
          Find, Buy and Sell SuiFrens NFTs on <br />
          SUI
        </div>
        <div>
          <input type="search" placeholder="Search NFTs" />
          <button type="submit">search</button>
        </div>
      </div>
    </div>
  );
}

function main() {
  // Call the fetchData function
  let nfts = fetchData();
  // Do something with the nfts data
  for (let nft of nfts) {
    console.log(nft.name);
  }

  // Return the suiFrensExplore function
  return suiFrensExplore();
}
