const user = "frichard5.near";
const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/contract-analysis/metrics/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const amountsFormatter = (amounts) => {
  let tds = [];
  Object.keys(amounts).forEach((k) => {
    tds.push(<td>{amounts[k]}</td>);
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
  txs: [],
  offset: 0,
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

const rows = [];

return <div>{GenericTable}</div>;
