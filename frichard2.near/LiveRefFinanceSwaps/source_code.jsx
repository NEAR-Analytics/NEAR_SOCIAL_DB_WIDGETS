// CSS
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

const iconStyle = {
  height: "15px",
  width: "15px",
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

// CONSTANTS
const refUrl = "https://api.stats.ref.finance/api/ft";
const apiUrl = "https://api.pikespeak.ai/event-historic/v2.ref-finance.near";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

//UTILS

const getDate24h = () => {
  const d =
    Math.trunc(new Date(Date.now() - 86400 * 1000).getTime() / 10000) * 10000;
  return new Date(d).toISOString();
};

const numberWithCommas = (x) => {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const forgeUrl = (apiUrl, params) =>
  apiUrl +
  Object.keys(params).reduce(
    (paramString, p) => paramString + `${p}=${params[p]}&`,
    "?"
  );
const defaultFt = { icon: "", symbol: "" };
const findFt = (ftAddress, ftList) => {
  if (!ftList) return defaultFt;
  const ft = ftList.body.find((f) => ftAddress === f.token_account_id);
  return ft ? ft : defaultFt;
};

// DATA FETCH
const fetchSwaps = () => {
  const params = {
    timestampStart: getDate24h(),
    filters: "SWAP",
  };
  return fetch(forgeUrl(apiUrl, params), {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
};
let swaps = fetchSwaps();
const ftList = fetch(refUrl);

const refresh = () => {
  swaps = fetchSwaps();
};

let allRows = [];
for (let i = 0; i < swaps.body.length; i++) {
  const swap = swaps.body[i].transaction_view;
  const swapFtIn = findFt(swap.token_in, ftList);
  const swapFtOut = findFt(swap.token_out, ftList);
  const txDate = new Date(Number(swaps.body[i].timestamp)).toISOString();
  allRows.push(
    <tr>
      <td style={tdStyle}>
        <a
          style={linkStyle}
          href={`https://pikespeak.ai/transaction-viewer/${swap.transaction_id}`}
          target="_blank"
        >
          {swap.transaction_id}
        </a>
        <div>{txDate}</div>
      </td>
      <td style={tdStyle}>
        <a
          style={linkStyle}
          href={`http://pikespeak.ai/wallet-explorer/${swap.sender}`}
          target="_blank"
        >
          {swap.sender}
        </a>
      </td>
      <td style={tdStyle}>
        {numberWithCommas(parseInt(swap.amount_in))}
        {swapFtIn.icon ? <img style={iconStyle} src={swapFtIn.icon} /> : ""}
        {swapFtIn.symbol}
      </td>
      <td style={tdStyle}>
        {numberWithCommas(parseInt(swap.amount_out))}
        {swapFtOut.icon ? <img style={iconStyle} src={swapFtOut.icon} /> : ""}
        {swapFtOut.symbol}
      </td>
    </tr>
  );
}

return (
  <div>
    <div style={bgStyle}></div>
    <div style={wStyle}>
      <h2 style={{ paddingTop: "25px", paddingBottom: "25px" }}>
        Live Ref-Finance swap
      </h2>
      <p>
        Powered By:{" "}
        <a style={linkStyle} href="https://pikespeak.ai" target="_blank">
          pikespeak.ai
        </a>
        <button onClick={refresh}>Refresh</button>
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={theadStyle}>txHash</th>
            <th style={theadStyle}>Account</th>
            <th style={theadStyle}>In</th>
            <th style={theadStyle}>Out</th>
          </tr>
        </thead>
        <tbody>{allRows}</tbody>
      </table>
    </div>
  </div>
);
