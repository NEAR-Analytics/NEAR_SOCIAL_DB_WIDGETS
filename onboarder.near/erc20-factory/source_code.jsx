const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return "Please login first";

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}
const erc20FactoryAbi = fetch(
  "https://raw.githubusercontent.com/codingshot/TokenFactory/master/abi/Factory.abi.json"
);
if (!erc20FactoryAbi.ok) {
  return "factory scam";
}

const erc20Factory = "0x5ad70c187e448b9ca6104cc55619bf9a3a271efd"; // polygon
const iface = new ethers.utils.Interface(erc20Abi.body);
const interface = new ethers.utils.Interface(erc20Abi.body);

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

/**TO DO INIT STATE FOR ECR20 = FACTORY */
initState({
  name: "",
  symbol: "",
  decimals: "",
  sendTo: "",
  sender, // msg.sender
  address, // after deployed this is conrect
  // senderBalance: "0",
  // receiverBalance: "0",
  initialSupply: "",
});

const tokens = {
  "Select Token": "",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
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
/**TO DO: MUST CHANGE COPIED FROM SEND TOKEN */
const mintToken = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};
//

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
    <h3>📩 Mint ERC-20 token (WIP)</h3>
    <div class="mb-3">
      <label for="sender" class="form-label">
        📫 message sender
      </label>
      <input
        value={state.initialSupply}
        class="form-control"
        id="sender"
        placeholder={state.sender}
        onChange={(e) => State.update({ initialSupply: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label for="supply" class="form-label">
        🛠️ Enter New ERC20 Supply
      </label>
      <input
        value={state.initialSupply}
        class="form-control"
        id="supply"
        placeholder=""
        onChange={(e) => State.update({ initialSupply: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label for="decimals" class="form-label">
        🧮 Enter ERC20 Decimals
      </label>
      <input
        value={state.decimals}
        class="form-control"
        id="decimals"
        placeholder=""
        onChange={(e) => State.update({ decimals: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label for="symbol" class="form-label">
        Enter New ERC20 Token Symbol
      </label>
      <input
        value={state.decimals}
        class="form-control"
        id="symbol"
        placeholder="TKN"
        onChange={(e) => State.update({ symbol: e.target.value })}
      />
    </div>

    <div class="mb-3">
      <button onClick={mintToken}>Mint Token (WIP)</button>
    </div>
    <h3>📩 Send ERC-20 tokens (old reference widget)</h3>

    <div class="mb-3">
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
    <div class="mb-3">
      <button onClick={sendTokens}>Send</button>
    </div>
  </>
);
