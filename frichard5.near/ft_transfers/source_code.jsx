const user = "frichard5.near";
const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/account/ft-transfer/${account}`;
const refUrl = "https://api.stats.ref.finance/api/ft";
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

const resPerPage = 10;

State.init({
  txs: [],
  offset: 0,
  ftList: [],
});

const nextPage = () => {
  State.update({ offset: state.offset + resPerPage });
};

const previousPage = () => {
  State.update({ offset: state.offset - resPerPage });
};

const GenericTable = (
  <Widget
    src={`${user}/widget/generic_table`}
    props={{
      title: "FT transfers",
      columns,
      data: state.txs,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

if (!state.ftList.length) {
  const ftList = fetch(refUrl);
  State.update({ ftList });
}

console.log("FTLIST", state.ftList);

let transactions = [];
const fetchTransfers = (offset) => {
  const nearTransfers = fetch(
    apiUrl + `?offset=${offset}&limit=${resPerPage}`,
    {
      mode: "cors",
      headers: {
        "x-api-key": publicApiKey,
      },
    }
  );
  nearTransfers.body && State.update({ txs: nearTransfers.body });
};
fetchTransfers(state.offset);

return <div>{GenericTable}</div>;
