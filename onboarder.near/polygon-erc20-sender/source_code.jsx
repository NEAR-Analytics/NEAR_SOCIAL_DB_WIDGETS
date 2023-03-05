const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender)
  return <Web3Connect connectLabel="Connect with Web3 to Polygon Mainnet" />;

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(erc20Abi.body);

initState({
  token: "",
  tokenDecimals: "",
  sendTo: "",
  sender,
  senderBalance: "0",
  receiverBalance: "0",
  receiver: "",
  amount: "1",
});
const ethTokens = {
  "Select Token": "",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
};
// polygon tokens
const tokens = {
  "Select Token": "",
  USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  QUICK: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
  AAVE: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
  LINK: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
  WETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  WMATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  WBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  UNI: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
  SUSHI: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
  GHST: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
  TEL: "0xdf7837de1f2fa4631d716cf2502f8b230f1dcc32",
  BAL: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
  BUSD: "0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
  DG: "0xef938b6da8576a896f6E0321ef80996F4890f9c4",
  MANA: "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4",
};

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setSendTo = (sendTo) => {
  const receiver = Ethers.resolveName(sendTo);
  State.update({ sendTo, receiver: receiver ?? "" });
  refreshBalances();
};

const setToken = (token) => {
  State.update({ token });
  getTokenDecimals();
};

const getTokenBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      refreshBalances();
    });
};

const refreshBalances = () => {
  getTokenBalance(state.sender).then((value) => {
    State.update({ senderBalance: value });
  });

  getTokenBalance(state.receiver).then((value) => {
    State.update({ receiverBalance: value });
  });
};

const sendTokens = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

return (
  <>
    <h3>💸 Send ERC-20 tokens</h3>
    <div class="row">
      <div class="mb-3 col-lg-6">
        <label for="selectToken">Select token</label>
        <select
          class="form-select"
          id="selectToken"
          onChange={(e) => {
            setToken(e.target.value);
          }}
        >
          {tokensMenuItems}
        </select>
      </div>
      <div class="mb-3 col-lg-6">
        <label for="amount" class="form-label">
          Enter the amount
        </label>
        <input
          value={state.amount}
          class="form-control"
          id="amount"
          placeholder=""
          onChange={(e) => State.update({ amount: e.target.value })}
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="send-to" class="form-label">
        Recepient address
      </label>
      <input
        value={state.sendTo}
        class="form-control"
        id="send-to"
        placeholder="vitalik.eth"
        onChange={(e) => setSendTo(e.target.value)}
      />
      {state.receiver && (
        <div class="text-secondary mt-3">Resolved to {state.receiver}</div>
      )}
      {state.receiverBalance != "0" && (
        <div class="text-secondary mt-3">
          Receiver's balance: {state.receiverBalance}
        </div>
      )}

      {state.senderBalance != "0" && (
        <div class="text-secondary mt-3">
          Sender's balance: {state.senderBalance}
        </div>
      )}
    </div>

    <div class="mb-3">
      <button onClick={sendTokens}>Send</button>
    </div>
  </>
);
