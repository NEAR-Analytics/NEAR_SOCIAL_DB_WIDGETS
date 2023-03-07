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
  lineHeight: "14px",
};

const linkStyle = {
  margin: "0px",
  textDecoration: "underline rgba(1, 199, 251, 0.4)",
  color: "rgb(1, 199, 251)",
  fontWeight: 600,
};

const apiUrl =
  "https://api.flipsidecrypto.com/api/v2/queries/fe213752-a832-4f0b-a08a-52e85ae53798/data/latest";

let parasActivity = fetch(apiUrl, {
  subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

function numberWithCommas(x) {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let allRows = [];
for (let i = 0; i < parasActivity.body.length; i++) {
  console.log(parasActivity.body.length);
  const pA = parasActivity.body[i];
  const txDate = pA.EVENT_TIMESTAMP;
  allRows.push(
    <tr>
      <td style={tdStyle}>{pA.NFT_NAME}</td>
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
            Flipsidecrypto
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

    <div class="row">
      <div class="col-sm-3">
        <div
          class="card text-white bg-success mb-3"
          style={{ maxWidth: "15rem" }}
        >
          <div class="card-body">
            <h6 class="card-title">Average Cost of Mat</h6>
            <p class="card-text fs-4">$1,336</p>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card text-white bg-danger mb-3"
          style={{ maxWidth: "15rem" }}
        >
          <div class="card-body">
            <h6 class="card-title">Total Cost of Mat</h6>
            <p class="card-text fs-4">$400,000 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
