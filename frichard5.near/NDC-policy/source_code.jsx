const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/policy/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const fetchPolicy = () => {
  const policy = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  policy.body &&
    State.update({
      policy: policy.body,
    });
};
!state.policy && fetchPolicy();

console.log("POLICY", state.policy);

return <div>Hello policy</div>;
