const provider = Ethers.provider();
const sender = Ethers.listAccounts()[0];

if (!sender) {
  return <Web3Connect />;
}

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
const tokenList = fetch(
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/tokenlist.json"
);
if (!erc20Abi.ok || !tokenList.ok) {
  return "Loading";
}

const tokens = JSON.parse(tokenList.body);

return (
  <div>
    {tokens.tokens.map((token, i) => (
      <Widget src="ethden.near/widget/TokenWithBalance" props={{ token }} />
    ))}
  </div>
);
