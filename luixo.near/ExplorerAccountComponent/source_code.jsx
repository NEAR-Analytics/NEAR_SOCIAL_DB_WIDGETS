const accountId = props.accountId;
if (!accountId) {
  return "No account ID";
}
const params = { language: props.language, embedded: true };
const query = Object.entries(params)
  .filter(([_key, value]) => value !== undefined)
  .map(([key, value]) => `${key}=${value}`)
  .join("&");
const isBeta = props.beta === undefined ? true : props.beta;
return (
  <Widget
    src="luixo.near/widget/ExplorerIframeComponent"
    props={{
      url: `${isBeta ? "beta/" : ""}accounts/${accountId}?${query}`,
      style: { height: props.height },
      network: props.network,
    }}
  />
);
