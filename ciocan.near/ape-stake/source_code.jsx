console.log("state", state);

const tokenDecimals = 18;

const chainId = state.chainId || 5;

Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId });
  });

const chainData = {
  // mainnet
  1: {
    stakingContractAddress: "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9",
    coinContractAddress: "0x4d224452801aced8b2f0aebe155379bb5d594381",
  },
  // testnet (goerli)
  5: {
    stakingContractAddress: "0xeF37717B1807a253c6D140Aca0141404D23c26D4",
    coinContractAddress: "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
  },
};

const coinContractAddress = chainData[chainId].coinContractAddress;
const stakingContractAddress = chainData[chainId].stakingContractAddress;

const coinContractAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  // Write Functions
  "function approve(address spender, uint256 amount) nonpayable returns (bool)",
];

// FETCH APESTAKE ABI
const apeStakingAbi = fetch(
  "https://raw.githubusercontent.com/apestakeui/ui/main/src/ApeCoinStakingAbi.json"
);
if (!apeStakingAbi.ok) {
  return "Loading";
}

const stakingContractAbi = JSON.parse(apeStakingAbi.body).abi;

const ifaceCoin = new ethers.utils.Interface(coinContractAbi);
const ifaceStaking = new ethers.utils.Interface(stakingContractAbi);

const getApeBalance = (receiver) => {
  const encodedData = ifaceCoin.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: coinContractAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = ifaceCoin.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getStakedTotal = (receiver) => {
  const encodedData = ifaceStaking.encodeFunctionData("stakedTotal", [
    receiver,
  ]);

  return Ethers.provider()
    .call({
      to: stakingContractAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = ifaceStaking.decodeFunctionResult(
        "stakedTotal",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

// DETECT SENDER
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

// FETCH SENDER BALANCE
if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({
        balance: Big(balance).div(Big(10).pow(tokenDecimals)).toFixed(2),
      });
    });
}

// FETCH SENDER APE BALANCE
if (state.apeBalance === undefined && state.sender) {
  getApeBalance(state.sender).then((apeBalance) => {
    State.update({ apeBalance });
  });
}

// FETCH ALLOWANCE
const getTokenAllowance = (receiver) => {
  const encodedData = ifaceCoin.encodeFunctionData("allowance", [
    receiver,
    stakingContractAddress,
  ]);

  return Ethers.provider()
    .call({
      to: coinContractAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = ifaceCoin.decodeFunctionResult(
        "allowance",
        rawBalance
      )[0];

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2);
    });
};

// FETCH ALLOWANCE
if (state.sender && state.allowance == undefined) {
  getTokenAllowance(state.sender).then((allowance) => {
    State.update({ allowance });
  });
}

// FETCH TOTAL STAKED
if (state.stakedTotal === undefined && state.sender) {
  getStakedTotal(state.sender).then((stakedTotal) => {
    State.update({ stakedTotal });
  });
}

// APPROVE TOKEN
const approveToken = () => {
  const erc20 = new ethers.Contract(
    coinContractAddress,
    ifaceCoin,
    Ethers.provider().getSigner()
  );

  const allowanceBig = ethers.utils.parseUnits(
    state.allowanceUpdate,
    tokenDecimals
  );

  erc20
    .approve(stakingContractAddress, allowanceBig)
    .then((transactionHash) => transactionHash.wait())
    .then((receipt) => {
      console.log("receipt", receipt);
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleStake = () => {
  if (!Number(state.allowance)) {
    if (!state.allowanceUpdate) return;
    approveToken();
    return;
  }

  if (!state.amount) return;

  const amountBig = ethers.utils.parseUnits(state.amount, tokenDecimals);
  const signer = Ethers.provider().getSigner();

  const apeStakeContract = new ethers.Contract(
    stakingContractAddress,
    ifaceStaking,
    signer
  );

  apeStakeContract.depositSelfApeCoin(amountBig, { gasLimit: 3e6 });
};

const handleValueChange = (e) => {
  State.update({ amount: e.target.value });
};

const handleAllowanceChange = (e) => {
  State.update({ allowanceUpdate: e.target.value });
};

return (
  <div className="container mt-4" style={{ maxWidth: "600px" }}>
    <div className="row">
      <div className="col">
        <div>
          <div className="container border py-2 mb-3">
            <div>APE: {state.apeBalance}</div>
            <div>Staked total: {state.stakedTotal}</div>
          </div>
          <div className="container border py-4 mb-3 d-grid gap-3">
            <input type="number" onChange={handleValueChange} />
            {!Number(state.allowance) && (
              <div class="alert alert-warning" role="alert">
                <h6>Insufficient allowance</h6>
                <input onChange={handleAllowanceChange} />
              </div>
            )}
            <button onClick={handleStake}>Stake APECOIN</button>
          </div>
        </div>
      </div>
      <div className="col">
        <Web3Connect className="w3" connectLabel="Connect with Web3" />
      </div>
    </div>
  </div>
);
