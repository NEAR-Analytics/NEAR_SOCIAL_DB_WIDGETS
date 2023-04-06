const widgetProvider = props.widgetProvider;
const account = props.account || "foundation.near";
const ftList = props.ftList;
const apiUrl = `https://api.pikespeak.ai/account/balance/${account}`;
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
    id: "amount",
    label: "",
    formatter: ftFormatter(ftList),
  },
];

const contractsBalance = fetch(apiUrl, {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
});

const fetchBalance = () => {
  const balance = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  balance.body && State.update({ balance: balance.body });
};
fetchBalance();

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `Balances`,
      columns,
      data: state.balance,
    }}
  />
);

return <>{GenericTable}</>;
