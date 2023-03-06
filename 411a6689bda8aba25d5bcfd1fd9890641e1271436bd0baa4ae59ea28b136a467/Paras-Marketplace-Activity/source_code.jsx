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
  overflow: "spAoll",
  background: "black",
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
      <td style={tdStyle}>{i + 1}</td>
      <td style={tdStyle}>{txDate}</td>
      <td style={tdStyle}>
        <a
          style={linkStyle}
          href={`https://nearblocks.io/txns/${pA.TX_HASH}`}
          target="_blank"
        >
          {pA.ACTION}
        </a>
      </td>

      <td style={tdStyle}>{numberWithCommas(parseInt(pA.AMOUNT))}</td>
      <td style={tdStyle}>{pA.CREATED_BY}</td>
      <td style={tdStyle}>{pA.SOLD_TO}</td>
      <td style={tdStyle}>{pA.NFT_NAME}</td>
    </tr>
  );
}

return (
  <div>
    <div style={bgStyle}></div>
    <div style={wStyle}>
      <h2 style={{ paddingTop: "25px", paddingBottom: "25px" }}>
        Paras Marketplace Activity - last 7 days
      </h2>
      <p>
        Powered By:{""}
        <a
          style={linkStyle}
          href="https://flipsidecrypto.xyz/edit/queries/fe213752-a832-4f0b-a08a-52e85ae53798"
          target="_blank"
        >
          flipsidecrypto
        </a>
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={theadStyle}>#</th>
            <th style={theadStyle}>ACTIVITY TIMESTAMP</th>
            <th style={theadStyle}>ACTION</th>
            <th style={theadStyle}>AMOUNT</th>
            <th style={theadStyle}>CREATED BY</th>
            <th style={theadStyle}>SOLD TO</th>
            <th style={theadStyle}>NFT NAME</th>
          </tr>
        </thead>
        <tbody>{allRows}</tbody>
      </table>
    </div>
  </div>
);
