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

const apiUrl = "https://api.pikespeak.ai/global/contract-ranking";
const publicApiKey = "d0400196772a48f99c73151cb738f2ab";

const contractsRanking = fetch(apiUrl, {
  mode: "cors",
  headers: {
    "api-key": "d0400196772a48f99c73151cb738f2ab",
  },
});

let allRows = [];
for (let i = 0; i < contractsRanking.body.length; i++) {
  const cR = contractsRanking.body[i];
  console.log(cR, i);
  allRows.push(
    <tr>
      <td style={tdStyle}>{i + 1}</td>
      <td style={tdStyle}>
        <a
          style={linkStyle}
          href={`http://pikespeak.ai/wallet-explorer/${cR.contract_address}`}
          target="_blank"
        >
          {cR.contract_address}
        </a>
      </td>
      <td style={tdStyle}>
        {parseInt(cR.mean_active_users_7d).toLocaleString()}
      </td>
      <td style={tdStyle}>{parseInt(cR.new_users_7d).toLocaleString()}</td>
      <td style={tdStyle}>${parseInt(cR.usd_flow_in_7d).toLocaleString()}</td>
      <td style={tdStyle}>${parseInt(cR.usd_flow_out_7d).toLocaleString()}</td>
    </tr>
  );
}

return (
  <div>
    <div style={bgStyle}></div>
    <div style={wStyle}>
      <h2 style={{ paddingTop: "25px", paddingBottom: "25px" }}>
        NEAR Most Active Contracts - last 7 days
      </h2>
      <p>
        Powered By:{" "}
        <a style={linkStyle} href="https://pikespeak.ai" target="_blank">
          pikespeak.ai
        </a>
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={theadStyle}>#</th>
            <th style={theadStyle}>Contract</th>
            <th style={theadStyle}>AVERAGE ACTIVE USERS</th>
            <th style={theadStyle}>NEW USERS</th>
            <th style={theadStyle}>INFLOW</th>
            <th style={theadStyle}>OUTFLOW</th>
          </tr>
        </thead>
        <tbody>{allRows}</tbody>
      </table>
    </div>
  </div>
);
