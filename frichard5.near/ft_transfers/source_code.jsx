const widgetProvider = props.widgetProvider;
const account = props.account || "foundation.near";
const ftList = props.ftList;
const apiUrl = `https://api.pikespeak.ai/account/ft-transfer/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const ftFormatter = (ftList) => {
  return (data) => {
    return (
      <Widget
        src={`${widgetProvider}/widget/table_ft_formatter`}
        props={{
          ftList,
          ft: data["contract"],
          amount: data["amount"],
        }}
      />
    );
  };
};

const columns = [
  {
    id: "timestamp",
    label: "date",
    formatter: (data) => {
      const milliTimestamp = Math.trunc(
        Number(data["timestamp"]) / Math.pow(10, 6)
      );
      return new Date(Number(milliTimestamp)).toISOString();
    },
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
    formatter: ftFormatter(ftList),
  },
  {
    id: "transaction_id",
    label: "Tx id",
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
    src={`${widgetProvider}/widget/generic_table`}
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
