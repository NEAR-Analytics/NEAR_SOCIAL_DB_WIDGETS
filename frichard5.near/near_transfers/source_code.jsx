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
  offset: 0,
});

const test = () => {
  console.log("HEYEYEYYE");
  State.update({ offset: state.offset + 50 });
};

const GenericTable = (
  <Widget
    src={`${user}/widget/generic_table`}
    props={{ columns, elements: state.txs, test }}
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
  nearTransfers.body && State.update({ txs: nearTransfers.body });
};
fetchTransfers(offset);

const rows = [];

return <div>{GenericTable}</div>;
