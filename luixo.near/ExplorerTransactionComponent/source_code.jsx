const transactionHash = props.transactionHash;
if (!transactionHash) {
  return "No transaction hash";
}
const isBeta = props.beta === undefined ? true : props.beta;
return (
  <Widget
    src="luixo.near/widget/ExplorerIframeComponent"
    props={{
      url: `${isBeta ? "beta/" : ""}transactions/${transactionHash}`,
      query: { language: props.language, embedded: true },
      network: props.network,
      baseUrl: props.baseUrl,
    }}
  />
);
