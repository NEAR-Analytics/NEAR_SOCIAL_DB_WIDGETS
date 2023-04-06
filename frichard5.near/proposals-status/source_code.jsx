const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/status/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  proposalsStatus: [],
});

const order = [
  { proposal_type: 0 },
  { InProgress: 1 },
  { Approved: 2 },
  { Rejected: 3 },
  { Expired: 4 },
];
const columns = state.proposalsStatus.reduce((acc, pS) => {
  Object.keys(pS).forEach((k) => {
    if (!acc.find((c) => c.id === k)) {
      acc.push({
        id: k,
        label: k === "proposal_type" ? "Type" : k,
      });
    }
  });
  return acc;
}, []);
const orderedColumns = columns.sort((a, b) => order[a.id] - order[b.id]);

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `Status stats`,
      columns: orderedColumns,
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
