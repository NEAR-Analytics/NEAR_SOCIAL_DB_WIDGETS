initState({
  prURL: "https://github.com/aurora-is-near/aurora-engine/pull/739",
  rewardAsset: "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF", //dummy USDC
  rewardAmount: 1000,
  lockPeriod: 5000000,
  debuglogs: "",
});

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

// if (!state.sender) return "Please login first";

//Retrieve ETH balance
if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// const sender = Ethers.send("eth_requestAccounts", [])[0];
// if (!sender) return "Please login first";

// return <p>Account: {sender}</p>;

//CONTRACT INTERACTIONS

//testnet
const bountyContractAddress = "0xb405a96238ca46E9d3268271F87dbBf90E4903Bf";

//Approve spending
const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const approveSpending = () => {
  const erc20 = new ethers.Contract(
    state.rewardAsset,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = 1000000000;

  const output = erc20.approve(bountyContractAddress, amount);

  State.update({ debuglogs: JSON.stringify(output) });
};

//fetch the ABI
const bountyContractAbi = fetch(
  "https://gist.githubusercontent.com/birchmd/f52cc8244be64eca036d9156486307d4/raw/66da5745b22c140bdf4eff848ab4e3aa5f0b666e/BountyProgram.abi.json"
);
if (!bountyContractAbi.ok) {
  return "scam";
}

const bountyObject = new ethers.Contract(
  bountyContractAddress,
  bountyContractAbi.body,
  Ethers.provider().getSigner()
);

const createBounty = () => {
  // State.update({ debuglogs: "starting" });

  const output = bountyObject.createBounty(
    state.prURL,
    state.rewardAsset,
    state.rewardAmount,
    state.lockPeriod
  );

  State.update({ debuglogs: JSON.stringify(output) });
};

//initiate functions with etherjs ? only needed if we do queries
// const iface = new ethers.utils.Interface(bountyContractAbi.body);

// const tokens = {
//   "Select Token": "",
//   USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
//   DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
//   USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
//   MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
// };

//functions for UI
// const tokensMenuItems = Object.keys(tokens).map((token) => (
//   <option value={tokens[token]}>{token}</option>
// ));

// const setToken = (token) => {
//   State.update({ token });
//   getTokenDecimals();
// };

// FETCH CSS
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// RETURN UI
return (
  <Theme>
    <div class="LidoContainer">
      <div onSubmit={handleSubmit}>
        <label htmlFor="name">Task name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter the name of your task"
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter the description of your task"
          required
        />
        <br />
        <div>Address = {state.sender ?? "..."}</div>
        <div>
          Balance = {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH{" "}
        </div>
        <label htmlFor="amount">Bounty amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(event) => setNearAddress(event.target.value)}
          placeholder="0.0"
          required
        />
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
        <br />
        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={approveSpending}
          >
            <span>Approve</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}
        <br />

        {!!state.sender ? (
          <button class="LidoStakeFormSubmitContainer" onClick={createBounty}>
            <span>Submit</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}
      </div>

      <div> {state.debuglogs ?? "the logs will appear here"} </div>
    </div>
  </Theme>
);
