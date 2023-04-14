const contractId = props.contractId || "rui";
const button = props.button || <button>Check Stats</button>;
const getContractData = props.getContractData;

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
  asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: statsQuery,
  }).then((res) => {
    State.update({
      loading: false,
      floor: ((res?.body?.data["floor"]?.price[0] || 0) / 1e24).toFixed(2),
      owners: res?.body?.data["owners"]?.aggregate?.count || 0,
      volume: (
        (res?.body?.data["volume"]?.aggregate?.sum?.amount || 0) / 1e24
      ).toFixed(2),
      nfts: res?.body?.data["nfts"]?.aggregate?.count || 0,
      minters: res?.body?.data["minters"]?.aggregate?.count || 0,
    });

    getContractData({
      floor: state.floor,
      loading: state.loading,
      minters: state.minters,
      nfts: state.nfts,
      owners: state.owners,
      volume: state.volume,
    });
  });
}

console.log(state);

return (
  <div
    onClick={() => {
      State.update({
        loading: true,
      });
      getContractStats();
    }}
  >
    {button}
  </div>
);
