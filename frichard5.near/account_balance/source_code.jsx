const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/account/balance/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const contractsBalance = fetch(apiUrl, {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
});

const rows = [];

contractsBalance.body &&
  contractsBalance.body.forEach((cB) => {
    rows.push(
      <tr>
        <td>{cB.contract}</td>
        <td>{Number(cB.amount).toFixed(2)}</td>
      </tr>
    );
  });

return (
  <>
    <h2> Balances {props.account}</h2>
    <table>
      <tr>
        <th>Token</th>
        <th>Amount</th>
      </tr>
      {rows}
    </table>
  </>
);
