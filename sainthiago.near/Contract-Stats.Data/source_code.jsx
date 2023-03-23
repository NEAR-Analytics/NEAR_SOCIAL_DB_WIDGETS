const contractId = props.contractId;
var loadingData = props.loadingData || false;
var floor = props.floor;
var owners = props.owners;
var nfts = props.nfts;
var minters = props.minters;
var volume = props.volume;

if (!contractId) {
  return <></>;
}

const statsQuery = JSON.stringify({
  query: `
  query getContractStats($contractId: String!){
    nfts: nft_tokens_aggregate( where: {nft_contracts: {id: {_eq: $contractId}}}) {
      aggregate {
        count
      }
    }

    owners: nft_tokens_aggregate(distinct_on: owner, where: {nft_contracts: {id: {_eq: $contractId}}}) {
        aggregate {
          count
        }
    }

    floor: nft_listings(order_by: {price: asc}, where: {unlisted_at: {_is_null: true}, invalidated_at: {_is_null: true}, accepted_at: {_is_null: true}, nft_contracts: { id: {_eq: $contractId}}}, limit: 10) {
      price
    }   

    minters: mb_store_minters_aggregate(where: {nft_contract_id: {_eq: $contractId}}) {
        aggregate {
        count
        }
    }   
    volume: nft_earnings_aggregate(where: {nft_contract_id: {_eq: $contractId}, _and: {approval_id: {_is_null: false}}}) {
        aggregate {
            sum {
            amount
            }
        }
    }}
`,
  variables: {
    contractId: contractId,
  },
});

function getContractStats() {
  loadingData = true;

  asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: statsQuery,
  }).then((res) => {
    loadingData = false;
    floor = ((res?.body?.data["floor"]?.price[0] || 0) / 1e24).toFixed(2);
    owners = res?.body?.data["owners"]?.aggregate?.count || 0;
    volume = (
      (res?.body?.data["volume"]?.aggregate?.sum?.amount || 0) / 1e24
    ).toFixed(2);
    nfts = res?.body?.data["nfts"]?.aggregate?.count || 0;
    minters = res?.body?.data["minters"]?.aggregate?.count || 0;
  });
}

return <></>;
