const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/status-by-day/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  proposalsByMonth: [],
});

const fetchTransfers = () => {
  const proposalsByMonth = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  proposalsByMonth.body &&
    State.update({ proposalsByMonth: proposalsByMonth.body });
};
fetchTransfers();

console.log(state.proposalsByMonth);

return <div>Hello World</div>;
