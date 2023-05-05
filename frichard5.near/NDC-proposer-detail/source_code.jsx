const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const proposer = props.proposer;
const apiUrl = `https://api.pikespeak.ai/daos/account-proposal-history/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const resPerPage = 10;

const fetchProposerHistory = () => {
  const history = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  history.body &&
    State.update({
      displayedHistory: history.body.slice(0, resPerPage),
      history: history.body,
    });
};

fetchProposerHistory();
console.log("HISTORY", state);
return <div>Hello World</div>;
