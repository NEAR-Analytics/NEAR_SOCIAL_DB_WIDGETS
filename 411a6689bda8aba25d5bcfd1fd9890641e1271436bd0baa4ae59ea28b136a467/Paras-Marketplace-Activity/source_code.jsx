const bgStyle = {
  background:
    "radial-gradient(64.28% 58.47% at 27.26% 59.61%,rgba(67,118,254,.55) 0,rgba(67,118,254,0) 100%)",
  filter: "blur(95px)",
  pointerEvents: "none",
  position: "absolute",
  transform: "matrix(-1,0,0,-1,0,0)",
  zIndex: 0,
  width: "100%",
  height: "100%",
};

const wStyle = {
  maxHeight: "800px",
  overflow: "scroll",
  background: "blue",
  color: "white",
  padding: "0 25px 25px 25px",
};

const tableStyle = {
  display: "table",
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0px",
  fontSize: "14px",
};

const tdStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  padding: "16px",
  maxWidth: "130px",
  borderBottom: "1px solid rgb(81, 81, 81)",
};

const theadStyle = {
  position: "sticky",
  top: 0,
  background: "rgb(13, 15, 36)",
  padding: "16px",
  textAlign: "left",
  lineHeight: "12px",
};

const linkStyle = {
  margin: "0px",
  textDecoration: "underline rgba(1, 199, 251, 0.4)",
  color: "rgb(1, 199, 251)",
  fontWeight: 500,
};

const apiUrl1 =
  "https://api.flipsidecrypto.com/api/v2/queries/fe213752-a832-4f0b-a08a-52e85ae53798/data/latest";

const apiUrl2 =
  "https://api.flipsidecrypto.com/api/v2/queries/a371f03d-ccdf-4e58-81cb-1c1aaff87b27/data/latest";

let parasActivity = fetch(apiUrl1, {
  subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

let parasMetrics = fetch(apiUrl2, {
  subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

const pM = parasMetrics.body[0];

function numberWithCommas(x) {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let allRows = [];
for (let i = 0; i < parasActivity.body.length; i++) {
  const pA = parasActivity.body[i];
  const txDate = pA.EVENT_TIMESTAMP;
  allRows.push(
    <tr>
      <td style={tdStyle}>
        <a
          style={linkStyle}
          href={`https://paras.id${pA.CONTRACT_SUFFIX}`}
          target="_blank"
        >
          {pA.NFT_NAME}
        </a>
      </td>
      <td style={tdStyle}>
        <a
          style={linkStyle}
          href={`https://nearblocks.io/txns/${pA.TX_HASH}`}
          target="_blank"
        >
          {pA.ACTION}
        </a>
      </td>
      <td style={tdStyle}>{txDate}</td>
      <td style={tdStyle}>
        {numberWithCommas(parseInt(pA.AMOUNT))}
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png"
          height="20px"
          width="20px"
        ></img>
      </td>
      <td style={tdStyle}>{pA.CREATED_BY}</td>
      <td style={tdStyle}>{pA.SOLD_TO}</td>
    </tr>
  );
}

return (
  <div class="d-grid gap-5" style={{ fontFamily: "Arial" }}>
    <div>
      <div style={bgStyle}></div>
      <div style={wStyle}>
        <h2 style={{ paddingTop: "25px", paddingBottom: "25px" }}>
          Paras Marketplace Activity <span class="fs-6"> Last 7 days</span>
        </h2>
        <p>
          Powered By:{""}
          <img
            src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F1048384174-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LdEnDLYh6Su5z7LbnEZ%252Favatar.png%3Fgeneration%3D1575431493257333%26alt%3Dmedia"
            height="20px"
            width="20px"
          ></img>
          <a
            style={linkStyle}
            href="https://flipsidecrypto.xyz/edit/queries/fe213752-a832-4f0b-a08a-52e85ae53798"
            target="_blank"
          >
            Flipside
          </a>
        </p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={theadStyle}>NFT</th>
              <th style={theadStyle}>ACTION</th>
              <th style={theadStyle}>ACTION TIMESTAMP</th>
              <th style={theadStyle}>AMOUNT</th>
              <th style={theadStyle}>CREATED BY</th>
              <th style={theadStyle}>SOLD TO</th>
            </tr>
          </thead>
          <tbody>{allRows}</tbody>
        </table>
      </div>
    </div>

    <div class="row" style={{ marginTop: "50px" }}>
      <div
        class="card text-white bg-success mb-3"
        style={{ maxWidth: "14rem", marginRight: "10px" }}
      >
        <div class="card-body">
          <p class="card-title" style={{ fontSize: "11px" }}>
            <a
              style={linkStyle}
              href="https://flipsidecrypto.xyz/edit/queries/a371f03d-ccdf-4e58-81cb-1c1aaff87b27"
              target="_blank"
            >
              Total NFTs Sold in 30 Days
            </a>
          </p>
          <p class="card-text fs-4">
            {numberWithCommas(parseInt(pM.TOTAL_NFT_SOLD))}
          </p>
        </div>
      </div>

      <div
        class="card text-white bg-success mb-3"
        style={{ maxWidth: "13rem", marginRight: "10px" }}
      >
        <div class="card-body">
          <p class="card-title" style={{ fontSize: "11px" }}>
            <a
              style={linkStyle}
              href="https://flipsidecrypto.xyz/edit/queries/a371f03d-ccdf-4e58-81cb-1c1aaff87b27"
              target="_blank"
            >
              Total Gross Sales in 30 Days
            </a>
          </p>
          <p class="card-text fs-4">
            $
            {JSON.parse(
              numberWithCommas(parseFloat(pM.TOTAL_GROSS_SALES).toFixed(2))
            )}
          </p>
        </div>
      </div>
      <div
        class="card text-white bg-success mb-3"
        style={{ maxWidth: "14rem", marginRight: "10px" }}
      >
        <div class="card-body">
          <p class="card-title" style={{ fontSize: "11px" }}>
            <a
              style={linkStyle}
              href="https://flipsidecrypto.xyz/edit/queries/a371f03d-ccdf-4e58-81cb-1c1aaff87b27"
              target="_blank"
            >
              Total Sold Collections in 30 Days
            </a>
          </p>
          <p class="card-text fs-4">
            {numberWithCommas(parseInt(pM.TOTAL_SOLD_COLLECTIONS))}
          </p>
        </div>
      </div>
      <div
        class="card text-white bg-success mb-3"
        style={{ maxWidth: "13rem", marginRight: "10px" }}
      >
        <div class="card-body">
          <p class="card-title" style={{ fontSize: "11px" }}>
            <a
              style={linkStyle}
              href="https://flipsidecrypto.xyz/edit/queries/a371f03d-ccdf-4e58-81cb-1c1aaff87b27"
              target="_blank"
            >
              Total NFT Listings in 30 Days
            </a>
          </p>
          <p class="card-text fs-4">
            {numberWithCommas(parseInt(pM.TOTAL_LISTINGS))}
          </p>
        </div>
      </div>
      <div
        class="card text-white bg-success mb-3"
        style={{ maxWidth: "14rem", marginRight: "10px" }}
      >
        <div class="card-body">
          <p class="card-title" style={{ fontSize: "11px" }}>
            <a
              style={linkStyle}
              href="https://flipsidecrypto.xyz/edit/queries/a371f03d-ccdf-4e58-81cb-1c1aaff87b27"
              target="_blank"
            >
              Month-on-Month Sales Growth
            </a>
          </p>
          <p class="card-text fs-4">
            {JSON.parse(
              numberWithCommas(parseFloat(pM.MONTH_ON_MONTH_SALES).toFixed(2))
            )}
            %
          </p>
        </div>
      </div>
    </div>
  </div>
);
