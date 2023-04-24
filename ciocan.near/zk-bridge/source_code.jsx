const sender = Ethers.send("eth_requestAccounts", [])[0];

const clone = (o) => JSON.parse(JSON.stringify(o));

const { deposit, withdraw } = state;
const tab = !state.tab || state.tab === "deposit" ? "deposit" : "withdraw";

const zkAbi = fetch(
  "https://gist.githubusercontent.com/kcole16/3aa22a29b14ea6a1a7377b38463697ef/raw/c8a7249231ac00c7c3c9f1dc6188fbf28c262cb5/abi.json"
);

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (!zkAbi.ok || !erc20Abi.ok) {
  return "";
}

const iface = new ethers.utils.Interface(zkAbi.body);

const chainId = state.chainId || "testnet";

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId: chainId === 5 ? "testnet" : "mainnet" });
    });
}

// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
const contracts = {
  mainnet: {
    bridge: {
      L1ERC20BridgeProxy: "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063",
    },
    weth: {
      deposit: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // l1 token
      withdraw: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", // l2 token
    },
    usdc: {
      deposit: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // l1 token
      withdraw: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // l2 token
    },
  },
  testnet: {
    bridge: {
      L1ERC20BridgeProxy: "0x927DdFcc55164a59E0F33918D13a2D559bC10ce7",
    },
    weth: {
      deposit: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      withdraw: "", // not found yet
    },
    usdc: {
      deposit: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      withdraw: "", // not found yet
    },
  },
};

const l2TxGasLimit = "900000";
const l2TxGasPerPubdataByte = "800";
const tokenDecimals = 18;

const onAction = (data) => {
  if (!data.amount) return;
  if (data.action === "deposit") handleDeposit(data);
  if (data.action === "withdraw") handleWithdraw(data);
};

const handleDeposit = (data) => {
  console.log("handleDeposit", data);
  State.update({ isLoading: true, log: undefined, explorerLink: undefined });
  const l1Token = contracts[chainId][data.assetId].deposit;
  const amountBig = ethers.utils.parseUnits(data.amount, tokenDecimals);

  const encodedData = iface.encodeFunctionData(
    "deposit(address,address,uint256,uint256,uint256,address)",
    [sender, l1Token, amountBig, l2TxGasLimit, l2TxGasPerPubdataByte, sender]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[chainId].bridge.L1ERC20BridgeProxy,
      data: encodedData,
      value: amountBig,
      gasLimit: ethers.BigNumber.from("500000"),
    })
    .then(() => handleApprove(data))
    .catch((e) => {
      console.error("deposit error:", e);
      State.update({ isLoading: false });
    });
};

const handleApprove = (data) => {
  console.log("handleApprove", data);
  const contract = new ethers.Contract(
    contracts[chainId][data.assetId].deposit,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  const amountBig = ethers.utils.parseUnits(data.amount, tokenDecimals);

  contract
    .approve(contracts[chainId].bridge.L1ERC20BridgeProxy, amountBig)
    .then((tx) => {
      console.log("approved: ", tx);
      State.update({
        log: "The TX hash is: " + tx.hash,
        explorerLink: "https://etherscan.io/tx/" + tx.hash,
        isLoading: false,
      });
    })
    .catch((e) => {
      console.error("approve error:", e);
      State.update({ isLoading: false });
    });
};

const handleWithdraw = (data) => {
  console.log("handleWithdraw", data);
};

const getTokenBalance = (sender, tokenAddress, callback) => {
  if (!sender) return;
  const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
  const iface = new ethers.utils.Interface(erc20Abi);
  const encodedData = iface.encodeFunctionData("balanceOf", [sender]);
  Ethers.provider()
    .call({
      to: tokenAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      if (callback) callback(balance);
    });
};

// FETCH SENDER ETH BALANCE
if (sender) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      console.log(
        "balance of eth:",
        Big(balance).div(Big(10).pow(tokenDecimals)).toFixed(4)
      );
    });
}

initState({
  isLoading: false,
  deposit: {
    network: {
      id: "l1",
      name: "Ethereum",
    },
    assets: [
      {
        id: "weth",
        name: "wETH",
        selected: false,
        balance: "0.00",
      },
      {
        id: "usdc",
        name: "USDC",
        selected: true,
        balance: "0.00",
      },
    ],
  },
  withdraw: {
    network: {
      id: "l2",
      name: "zkSync Era",
    },
    assets: [
      {
        id: "weth",
        name: "wETH",
        selected: false,
        balance: "0.00",
      },
      {
        id: "usdc",
        name: "USDC",
        selected: true,
        balance: "0.00",
      },
    ],
  },
  amount: "0.0",
});

// update token balances
getTokenBalance(sender, contracts[chainId].weth.deposit, (balance) => {
  if (!deposit) return;
  const cloned = clone(deposit);
  cloned.assets[0].balance = balance;
  State.update({ deposit: cloned });
});

getTokenBalance(sender, contracts[chainId].usdc.deposit, (balance) => {
  if (!deposit) return;
  const cloned = clone(deposit);
  cloned.assets[1].balance = balance;
  State.update({ assets });
});

const onTabChange = (tab) => {
  console.log("onTabChange", deposit, withdraw, assets);
  State.update({ deposit: withdraw, withdraw: deposit, tab });
};

console.log("tab", tab);

return (
  <Widget
    src="ciocan.near/widget/bridge-ui"
    props={{ ...state, onTabChange, onAction, title: "zkBridge" }}
  />
);
