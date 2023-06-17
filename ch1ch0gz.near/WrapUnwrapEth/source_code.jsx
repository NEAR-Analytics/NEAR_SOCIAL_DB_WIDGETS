const sender = Ethers.send("eth_requestAccounts", [])[0];
if (state.chainId === undefined && ethers !== undefined && sender) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (
  state.chainId !== undefined &&
  state.chainId !== 1 &&
  state.chainId !== 11155111
) {
  return <p>Switch to Ethereum Mainnet </p>;
} else {
  if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;
}

initState({
  ethAmount: "",
  wethAmount: "",
});

const weth = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const wethAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
];
if (!wethAbi) {
  return "Loading";
}

const iface = new ethers.utils.Interface(wethAbi);

const wrapEth = (ethAmount) => {
  if (!ethAmount) {
    return console.log("Amount is missing");
  }

  let amount = state.ethAmount.toString();
  const wethContract = new ethers.Contract(
    weth,
    wethAbi,
    Ethers.provider().getSigner()
  );
  wethContract.deposit({ value: amount });
};

const unWrapEth = (wethAmount) => {
  if (!wethAmount) {
    return console.log("Amount is missing");
  }
  let amount = state.wethAmount.toString();
  const wethContract = new ethers.Contract(
    weth,
    wethAbi,
    Ethers.provider().getSigner()
  );
  wethContract.withdraw(amount);
};

return (
  <>
    <h3>Send ERC-20 tokens</h3>
    <div class="mb-3">
      <label>Enter the amount</label>
      <input
        value={ethAmount}
        placeholder=""
        onChange={(event) => State.update({ ethAmount: event.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={() => wrapEth(state.ethAmount)}>Wrap</button>
    </div>
    <p></p>
    <div class="mb-3">
      <label>Enter the amount</label>
      <input
        value={wethAmount}
        placeholder=""
        onChange={(event) => State.update({ wethAmount: event.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={() => unWrapEth(state.wethAmount)}>UnWrap</button>
    </div>
  </>
);
