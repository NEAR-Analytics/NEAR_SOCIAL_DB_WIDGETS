const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return "Please login first";

const { from, to, assets } = state;

const zkAbi = fetch(
  "https://gist.githubusercontent.com/kcole16/3aa22a29b14ea6a1a7377b38463697ef/raw/c8a7249231ac00c7c3c9f1dc6188fbf28c262cb5/abi.json"
);
if (!zkAbi.ok) {
  return "scam";
}

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(zkAbi.body);

const chainId = state.chainId || "testnet";

Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId: chainId === 5 ? "testnet" : "mainnet" });
  });

console.log("chainId", chainId);

// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
const contracts = {
  mainnet: {
    bridge: {
      L1ERC20BridgeProxy: "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063",
    },
    weth: {
      from: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // l1 token
      to: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", // l2 token
    },
    usdc: {
      from: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      to: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    },
  },
  testnet: {
    bridge: {
      L1ERC20BridgeProxy: "0x927DdFcc55164a59E0F33918D13a2D559bC10ce7",
    },
    weth: {
      from: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      to: "", // not found yet
    },
    usdc: {
      from: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      to: "", // not found yet
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
  const l1Token = contracts[chainId][data.assetId].from;
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
    .then(() => handleApprove(data));
};

const handleApprove = (data) => {
  console.log("handleApprove", data);
  const l1Token = contracts[chainId][data.assetId].l1;
  const contract = new ethers.Contract(
    l1Token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  const amountBig = ethers.utils.parseUnits(data.amount, tokenDecimals);

  contract
    .approve(contracts[chainId].bridge.L1ERC20BridgeProxy, amountBig)
    .then((tx) => {
      console.log(tx);
      State.update({
        log: "The TX hash is: " + tx.hash,
        explorerLink: "https://etherscan.io/tx/" + tx.hash,
      });
    })
    .catch((e) => console.error(e));
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
  from: {
    network: {
      id: "l1",
      value: "Ethereum",
    },
  },
  to: {
    network: {
      id: "l2",
      value: "zkSync Era",
    },
  },
  amount: "0.0",
  assets: [
    {
      id: "weth",
      value: "wETH",
      balance: {
        from: "0.00",
        to: "0.00",
      },
    },
    {
      id: "usdc",
      value: "USDC",
      selected: true,
      balance: {
        from: "0.00",
        to: "0.00",
      },
    },
  ],
});

// update token balances
getTokenBalance(sender, contracts[chainId].weth.from, (balance) => {
  if (!assets) return;
  assets[0].balance.from = balance;
  State.update({ assets });
});

getTokenBalance(sender, contracts[chainId].usdc.from, (balance) => {
  if (!assets) return;
  assets[1].balance.from = balance;
  State.update({ assets });
});

const onTabChange = () => {
  State.update({ from: to, to: from });
};

return (
  <Widget
    src="ciocan.near/widget/bridge-ui"
    props={{ ...state, onTabChange, onAction, title: "zkBridge" }}
  />
);
