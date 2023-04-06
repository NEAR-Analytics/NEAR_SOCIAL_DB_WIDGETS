const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/status/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  proposalsStatus: [],
});

const columns = [
  {
    id: "status",
    label: "Status",
  },
  {
    id: "count",
    label: "Count",
  },
];

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `${account} proposals`,
      columns,
      data: state.proposalsStatus,
    }}
  />
);

const fetchTransfers = () => {
  const proposalsStatus = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  proposalsStatus.body &&
    State.update({ proposalsStatus: proposalsStatus.body });
};
fetchTransfers();

return <>{GenericTable}</>;
