const user = "frichard5.near";
const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/account/near-transfer/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const columns = [
  {
    id: "timestamp",
    label: "date",
  },
  {
    id: "sender",
    label: "sender",
  },
  {
    id: "receiver",
    label: "receiver",
  },
  {
    id: "amount",
    label: "amount",
  },
  {
    id: "transaction_id",
  },
];

State.init({
  txs: [],
});

const GenericTable = (
  <Widget
    src={`${user}/widget/generic_table`}
    props={{ columns, elements: state.txs }}
  />
);

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

const rows = [];

return <div>{GenericTable}</div>;
