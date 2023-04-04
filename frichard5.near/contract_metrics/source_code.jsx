const user = "frichard5.near";
const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/contract-analysis/metrics/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const amountsFormatter = (amounts) => {
  let tds = [];
  Object.keys(amounts).forEach((k) => {
    tds.push(
      <td>
        {amounts[k]} {k}
      </td>
    );
  });
  return tds;
};

const columns = [
  {
    id: "day",
    label: "date",
  },
  {
    id: "unique_users",
    label: "unique users",
  },
  {
    id: "new_users",
    label: "new users",
  },
  {
    id: "amounts_in",
    label: "amount in",
    formatter: amountsFormatter,
  },
  {
    id: "amounts_out",
    label: "amount out",
    formatter: amountsFormatter,
  },
];

const resPerPage = 10;

State.init({
  displayedTxs: [],
  txs: [],
  offset: 0,
});

const nextPage = () => {
  const currentOffset = state.offset + resPerPage;
  State.update({
    offset: currentOffset,
    displayedTxs: nearTransfers.body.slice(currentOffset, resPerPage - 1),
  });
};

const previousPage = () => {
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedTxs: nearTransfers.body.slice(currentOffset, resPerPage - 1),
  });
};

const GenericTable = (
  <Widget
    src={`${user}/widget/generic_table`}
    props={{
      title: "Contract metrics",
      columns,
      data: state.displayedTxs,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

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
  nearTransfers.body &&
    State.update({
      txs: nearTransfers.body,
      displayedTxs: nearTransfers.body.slice(0, resPerPage - 1),
    });
};
fetchTransfers();

return <div>{GenericTable}</div>;
