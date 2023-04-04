const user = "frichard5.near";
const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/contract-analysis/metrics/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const amountsFormatter = (prop) => {
  return (data) => {
    let tds = [];
    Object.keys(data[prop]).forEach((k) => {
      tds.push(
        <td>
          {data[prop][k]} {k}
        </td>
      );
    });
    return tds;
  };
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
    formatter: amountsFormatter("amounts_in"),
  },
  {
    id: "amounts_out",
    label: "amount out",
    formatter: amountsFormatter("amounts_out"),
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
    displayedTxs: state.txs.slice(currentOffset, resPerPage + currentOffset),
  });
};

const previousPage = () => {
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedTxs: state.txs.slice(currentOffset, resPerPage + currentOffset),
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
      txs: nearTransfers.body.reverse(),
      displayedTxs: nearTransfers.body.slice(0, resPerPage),
    });
};
!state.displayedTxs.length && fetchTransfers();

return <div>{GenericTable}</div>;
