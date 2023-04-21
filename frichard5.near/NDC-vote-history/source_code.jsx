const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/votes-history/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const fetchVoteHistory = () => {
  const voteHistory = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  voteHistory.body &&
    State.update({
      votes: voteHistory.body,
    });
};
!state.votes && fetchVoteHistory();

return <div>vote history</div>;
