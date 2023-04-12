const baseUrls = {
  mainnet: "https://explorer.near.org",
  testnet: "https://explorer.testnet.near.org",
};
const baseUrl = baseUrls[props.network || "testnet"] || baseUrls.testnet;
return (
  <iframe
    className="w-100"
    style={style}
    src={`${baseUrl}/${props.url || ""}`}
  />
);
