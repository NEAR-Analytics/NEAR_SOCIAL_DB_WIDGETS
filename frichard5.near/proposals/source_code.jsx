const account = props.account || "foundation.near";
const ftList = props.ftList;
const apiUrl = `https://api.pikespeak.ai/daos/proposals/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const forgeUrl = (apiUrl, params) =>
  apiUrl +
  Object.keys(params).reduce(
    (paramString, p) => paramString + `${p}=${params[p]}&`,
    "?"
  );

State.init({
  params: {
    offset: 0,
  },
});

const fetchTransfers = (params) => {
  const proposals = fetch(forgeUrl(apiUrl, params), {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  proposals.body && State.update({ proposals: proposals.body });
};
fetchTransfers(tate.params);
console.log("PROPOSALS", state.proposals);
return <div>Hello World</div>;
