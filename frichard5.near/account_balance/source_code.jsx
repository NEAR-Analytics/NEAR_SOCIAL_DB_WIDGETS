const apiUrl = `https://api.pikespeak.ai/account/balance/${props.account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const contractsBalance = fetch(apiUrl, {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
});

const rows = [];
contractsBalance.body.forEach((cB) => {
  rows.push(
    <tr>
      <td>{cB.contract}</td>
      <td>{cB.amount}</td>
    </tr>
  );
});

return (
  <>
    <h2> Balances </h2>
    <table>
      <tr>
        <th>Token</th>
        <th>Amount</th>
      </tr>
      {rows.length ? rows : "loading..."}
    </table>
  </>
);
