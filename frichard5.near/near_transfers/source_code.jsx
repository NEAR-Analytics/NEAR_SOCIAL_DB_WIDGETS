const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/account/near-transfer/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  txs: [],
});
let transactions = [];
const fetchTransfers = (offset) => {
  const nearTransfers = fetch(apiUrl + `?offset=${offset}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  //State.update({ txs: [...state.txs, nearTransfers.body] });
  nearTransfers.body && transactions.push(...nearTransfers.body);
  if (nearTransfers.body.length === 50) {
    fetchTransfers(offset + 50);
  }
};
fetchTransfers(0);
console.log(transactions);
const rows = [];

return <div>Hello World</div>;
