const stakingContractAddress = "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9";
const apeContractAddress = "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
const stakingContractAbi = fetch(
  "https://api.etherscan.io/api?module=contract&action=getabi&address=0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9&format=raw"
);
const apeContractAbi = fetch(
  "https://api.etherscan.io/api?module=contract&action=getabi&address=0x4d224452801aced8b2f0aebe155379bb5d594381&format=raw"
);
const tokenDecimals = 18;

if (!stakingContractAbi.ok || !apeContractAbi.ok) return "Loading...";

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

const apeStakingContract = new ethers.Contract(
  stakingContractAddress,
  stakingContractAbi.body,
  Ethers.provider()
);

console.log("staking contract initated");

const apeContract = new ethers.Contract(
  apeContractAddress,
  apeContractAbi.body,
  Ethers.provider()
);

console.log("ape contract initated");

const getStakedBalance = (receiver) => {
  console.log("getStakedBalance");
  return apeStakingContract.getApeCoinStake(receiver);
};

const getApeBalance = (receiver) => {
  console.log("getApeBalance");
  return apeContract.balanceOf(receiver);
};

if (state.stakedBalance === undefined && state.sender) {
  console.log("getting staked balance");
  getStakedBalance(state.sender).then((stakedBalance) => {
    const balance = Big(stakedBalance[2].toString())
      .div(Big(10).pow(tokenDecimals))
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    State.update({ stakedBalance: balance });
  });
}

if (state.apeBalance === undefined && state.sender) {
  console.log("getting ape balance");
  getApeBalance(state.sender).then((apeBalance) => {
    const balance = Big(apeBalance.toString())
      .div(Big(10).pow(tokenDecimals))
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    State.update({ apeBalance: balance });
  });
}

const submitApe = (amount, receiver) => {
  console.log(amount);
  return;
};

return (
  <div>
    <h3>Staking</h3>
    <div>Staked APE: {state.stakedBalance} $APE</div>
    <div>Wallet Balance: {state.apeBalance} $APE</div>
    <div>
      <input
        value={state.stkApe}
        onChange={(e) => State.update({ stkApe: e.target.value })}
        placeholder="Amount"
      />
    </div>
    <button onClick={() => submitApe(state.stkApe, state.sender)}>
      STAKE & DEPOSIT
    </button>
  </div>
);
