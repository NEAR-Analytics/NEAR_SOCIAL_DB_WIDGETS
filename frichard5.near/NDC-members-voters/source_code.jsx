const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/votes/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const fetchVotersByProposal = () => {
  const voters = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  voters.body &&
    State.update({
      voters: voters.body,
    });
};
!state.voters && fetchVotersByProposal();

console.log("VOTERS", state.voters);

return <div>Hello voters</div>;
