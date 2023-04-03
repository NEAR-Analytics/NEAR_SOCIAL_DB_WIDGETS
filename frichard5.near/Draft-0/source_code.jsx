const apiUrl =
  "https://api.pikespeak.ai/account/balance/marketing.sputnik-dao.near";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const contractsBalance = fetch(apiUrl, {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
});

console.log(contractsBalance);
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
  <table>
    <tr>
      <th>Token</th>
      <th>Amount</th>
    </tr>
    {rows}
  </table>
);
