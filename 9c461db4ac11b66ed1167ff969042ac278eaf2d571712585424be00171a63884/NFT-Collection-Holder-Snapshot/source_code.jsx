const accountId = props.accountId || context.accountId;
initState({
  slug: "asac.near",
  nftData: [],
  holdersData: [],
  currentPage: 0,
  rowsPerPage: 10,
  downloadLink,
});

const prepareHoldersData = () => {
  const holders = {};

  state.nftData.forEach((token) => {
    const owner = token.nft_state.owner;
    const staked_owner = token.nft_state.staked_owner;

    if (owner) {
      if (!holders[owner]) {
        holders[owner] = { count: 0, staked: 0, tokens: [], stakedTokens: [] };
      }
      if (!staked_owner || owner !== staked_owner) {
        holders[owner].count += 1;
        holders[owner].tokens.push(token.token_id);
      }
    }

    if (staked_owner && owner !== staked_owner) {
      if (!holders[staked_owner]) {
        holders[staked_owner] = {
          count: 0,
          staked: 0,
          tokens: [],
          stakedTokens: [],
        };
      }
      holders[staked_owner].staked += 1;
      holders[staked_owner].stakedTokens.push(token.token_id);
    }
  });

  const holdersData = Object.entries(holders)
    .map(([owner, data]) => ({ owner, ...data }))
    .sort((a, b) => b.count + b.staked - (a.count + a.staked));

  State.update({ holdersData });
};

const fetchData = () => {
  State.update({ nftData: [] });
  console.log("fetchData()");
  const { slug } = state;
  console.log(slug);

  let data = fetch("https://byz-multi-chain-01.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "x-api-key": "ChRbeKE.c94220449dbb45973a67a614b1f590be",
      "Content-Type": "application/json",
      "Hasura-Client-Name": "near-social",
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
  near {
    collection(where: {slug: {_eq: "${state.slug}"}}) {
      slug
      nft_metas (order_by: {token_id: asc}) {
        token_id
        nft_state {
          owner
          staked_owner
        }
      }
    }
  }
}
`,
    }),
  });
  if (data) {
    const nftData = data.body.data.near.collection[0].nft_metas;
    console.log("here ---->>>>", nftData);
    State.update({ nftData });
    prepareHoldersData();
  }
};

const exportToCSV = () => {
  const headers = [
    "Holder",
    "Number of Tokens",
    "Number of Staked Tokens",
    "Tokens Held",
    "Tokens Staked",
  ];
  const rows = state.holdersData.map((holder) => [
    holder.owner,
    holder.count,
    holder.staked,
    holder.tokens
      .filter((tokenId) => !holder.stakedTokens.includes(tokenId))
      .join(", "),
    holder.stakedTokens.join(", "),
  ]);
  const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  console.log("blob --->>>", blob);
  const url = URL.createObjectURL(blob);
  console.log("url --->>>", url);
  State.update({ downloadLink: url });
};

const updateSlug = (e) => {
  State.update({ slug: e.target.value });
};

const handlePageChange = (newPage) => {
  State.update({ currentPage: newPage });
};

if (indexer != null) {
  console.log(indexer.body);
}

if (!state.nftData) {
  return "Loading";
}

const size = "10em";

return state.nftData !== null ? (
  <>
    <a href="https://indexer.xyz/" target="_blank" rel="noopener noreferrer">
      <img
        src="https://indexer.xyz/indexer-logo-black.svg"
        alt="Indexer.xyz logo"
        style={{ height: "1.5em", verticalAlign: "middle" }}
      />
    </a>
    <br />
    <br />
    <h1>NFT Collection Holder Snapshot</h1>
    <p>
      Easily fetch, display, and export NFT holder data from any collection on
      the NEAR blockchain. Quickly obtain a snapshot of NFT holders, browse
      through paginated results, and download the data as a CSV file with just a
      few clicks. <br /> <br />
      This app is built by Indexer.xyz
      <br />
    </p>
    <label htmlFor="slugInput">Collection Contract Key:</label>
    <input
      type="text"
      id="slugInput"
      value={state.slug}
      onChange={updateSlug}
    />
    <button onClick={fetchData}>Fetch NFT data</button>
    {state.holdersData.length > 0 && (
      <button onClick={exportToCSV}>Generate CSV download link</button>
    )}
    {state.downloadLink && (
      <a href={state.downloadLink} download="token_snapshots.csv">
        Download CSV
      </a>
    )}
    <div className="d-flex gap-4 flex-wrap">
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Number of Tokens</th>
            <th>Number of Staked Tokens</th>
            <th>Tokens Held</th>
            <th>Tokens Staked</th>
          </tr>
        </thead>
        <tbody>
          {state.holdersData
            .slice(
              state.currentPage * state.rowsPerPage,
              (state.currentPage + 1) * state.rowsPerPage
            )
            .map((holder) => (
              <tr>
                <td style={{ padding: "10px" }}>
                  <a
                    href={`https://www.tradeport.xyz/near/profile/${holder.owner}?tab=collected`}
                    target="_blank"
                    rel="noopener"
                  >
                    {holder.owner.length > 30
                      ? holder.owner.slice(0, 30) + "..."
                      : holder.owner}
                  </a>
                </td>
                <td style={{ padding: "10px" }}>{holder.count}</td>
                <td style={{ padding: "10px" }}>{holder.staked}</td>
                <td style={{ padding: "10px" }}>
                  <div
                    style={{
                      maxHeight: "100px",
                      overflowY: "scroll",
                      width: "300px",
                      border: "1px solid #ccc",
                      padding: "5px",
                    }}
                  >
                    {holder.tokens
                      .filter(
                        (tokenId) => !holder.stakedTokens.includes(tokenId)
                      )
                      .map((tokenId, index, filteredTokens) => (
                        <div key={tokenId} style={{ display: "inline" }}>
                          <a
                            href={`https://www.tradeport.xyz/near/collection/${state.slug}/${tokenId}`}
                            target="_blank"
                            rel="noopener"
                          >
                            {tokenId}
                          </a>
                          {index < filteredTokens.length - 1 && ", "}
                        </div>
                      ))}
                  </div>
                </td>
                <td style={{ padding: "10px" }}>
                  <div
                    style={{
                      maxHeight: "100px",
                      overflowY: "scroll",
                      width: "300px",
                      border: "1px solid #ccc",
                      padding: "5px",
                    }}
                  >
                    {holder.stakedTokens &&
                      holder.stakedTokens.map((tokenId, index) => (
                        <div key={tokenId} style={{ display: "inline" }}>
                          <a
                            href={`https://www.tradeport.xyz/near/collection/${state.slug}/${tokenId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tokenId}
                          </a>
                          {index < holder.stakedTokens.length - 1 && ", "}
                        </div>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button
          disabled={state.currentPage === 0}
          onClick={() => handlePageChange(state.currentPage - 1)}
        >
          Previous
        </button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}>
          Page {state.currentPage + 1} of{" "}
          {Math.ceil(state.nftData.length / state.rowsPerPage)}
        </span>
        <button
          disabled={
            state.currentPage + 1 ===
            Math.ceil(state.nftData.length / state.rowsPerPage)
          }
          onClick={() => handlePageChange(state.currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  </>
) : (
  <p>loading...</p>
);
