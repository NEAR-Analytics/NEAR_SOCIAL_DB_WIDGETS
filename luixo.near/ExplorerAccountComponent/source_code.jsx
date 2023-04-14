const accountId = props.accountId;
if (!accountId) {
  return "No account ID";
}
const isBeta = props.beta === undefined ? true : props.beta;
return (
  <Widget
    src="luixo.near/widget/ExplorerIframeComponent"
    props={{
      url: `${isBeta ? "beta/" : ""}accounts/${accountId}`,
      query: { language: props.language, embedded: true },
      network: props.network,
    }}
  />
);
