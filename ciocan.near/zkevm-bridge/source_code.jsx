const BRIDGE_CONTRACT_ADDRESS = "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

const bridgeAbi = [
  {
    inputs: [
      { internalType: "uint32", name: "destinationNetwork", type: "uint32" },
      { internalType: "address", name: "destinationAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "forceUpdateGlobalExitRoot", type: "bool" },
      { internalType: "bytes", name: "permitData", type: "bytes" },
    ],
    name: "bridgeAsset",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

console.log("state", state);

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const handleBridge = (networkId, amount, token) => {
  console.log("handleBridge", networkId, amount);

  const amountBig = ethers.utils.parseUnits(amount, token.decimals);
  const permitData = "0x";

  const encodedData = bridgeIface.encodeFunctionData(
    "bridgeAsset(uint32,address,uint256,address,bool,bytes)",
    [networkId, sender, amountBig, token.address, true, permitData]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: BRIDGE_CONTRACT_ADDRESS,
      data: encodedData,
      value: amountBig,
      gasLimit: ethers.BigNumber.from("500000"),
    })
    .then((tx) => {
      consle.log("tx:", tx);
    })
    .catch((e) => {
      console.log("error:", e);
    });

  //   const bridgeContract = new ethers.Contract(
  //     BRIDGE_CONTRACT_ADDRESS,
  //     bridgeAbi,
  //     Ethers.provider().getSigner()
  //   );

  //   bridgeContract.estimateGas
  //     .bridgeAsset(5, sender, 0, token, true, permitData)
  //     .then((tx) => {
  //       console.log(tx);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   bridgeContract
  //     .bridgeAsset(5, sender, amountBig, token, true, permitData)
  //     .then((tx) => {
  //       console.log(tx);
  //     })
  //     .catch((err) => {
  //       console.log("!!!!", err);
  //     });
};

const onConfirm = (props) => {
  console.log(props);
  const { amount, token, network } = props;
  const networkId = network === "ethereum" ? 0 : 1;
  handleBridge(networkId, amount, token);
};

return (
  <div>
    <Widget src="ciocan.near/widget/zkevm-bridge-ui" props={{ onConfirm }} />
  </div>
);
