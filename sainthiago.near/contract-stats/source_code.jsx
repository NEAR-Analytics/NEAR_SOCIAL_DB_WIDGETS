const statsQuery = JSON.stringify({
  query: `
  query getContractStats{
    nfts: nft_tokens_aggregate( where: {nft_contracts: {id: {_eq: "${state.contract}"}}}) {
      aggregate {
        count
      }
    }

    owners: nft_tokens_aggregate(distinct_on: owner, where: {nft_contracts: {id: {_eq: "${state.contract}"}}}) {
        aggregate {
          count
        }
    }

    floor: nft_listings(order_by: {price: asc}, where: {unlisted_at: {_is_null: true}, invalidated_at: {_is_null: true}, accepted_at: {_is_null: true}, nft_contracts: { id: {_eq: "${state.contract}"}}}, limit: 10) {
      price
    }   

    minters: mb_store_minters_aggregate(where: {nft_contract_id: {_eq: "${state.contract}"}}) {
        aggregate {
        count
        }
    }   
    volume: nft_earnings_aggregate(where: {nft_contract_id: {_eq: "${state.contract}"}, _and: {approval_id: {_is_null: false}}}) {
        aggregate {
            sum {
            amount
            }
        }
    }}
`,
});

const getContractStats = () => {
  const stats = fetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: statsQuery,
  });
  State.update({ stats: stats?.body?.data || null });
};

return (
  <>
    <div className="d-flex flex-column align-items-center">
      <input
        type="text"
        onChange={(e) => State.update({ contract: e.target.value })}
        placeholder="📃 Contract Name"
      />
      <div>
        <button
          className="btn btn-outline-secondary border mt-4"
          type="button"
          onClick={getContractStats}
        >
          Check Stats
        </button>
      </div>
    </div>
    {state?.stats ? (
      <div className="container mt-5">
        <div className="row flex-wrap justify-content-center">
          {Object.keys(state.stats || {}).map((key, index) => (
            <div className="col col-6 col-md-4 mb-4">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h6 className="card-title text-uppercase text-muted mb-0">
                        {key}
                      </h6>
                      <span className="h6 font-weight-bold mb-0">
                        {key === "volume"
                          ? `${(
                              (state.stats[key].aggregate?.sum?.amount || 0) /
                              1e24
                            ).toFixed(2)} N`
                          : key === "floor"
                          ? `${(
                              (state.stats[key][0]?.price || 0) / 1e24
                            ).toFixed(2)} N`
                          : state.stats[key].aggregate?.count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : null}
    <div></div>
  </>
);
