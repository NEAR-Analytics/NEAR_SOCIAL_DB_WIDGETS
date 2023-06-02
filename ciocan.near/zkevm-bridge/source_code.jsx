const tokens = [
  // eth testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x4701Aa9471d7bfAc765D87dcb1Ea6BB23AD32733",
    chainId: 5,
    symbol: "MATIC",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xd35cceead182dcee0f148ebac9447da2c4d449c4",
    chainId: 5,
    symbol: "USDC",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0xD7E55eB808693D5Ff81a3391c59886C7E0449f35",
    chainId: 5,
    symbol: "DAI",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    chainId: 5,
    symbol: "UNI",
    decimals: 18,
    logoURI: "",
  },
  // eth mainnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    chainId: 1,
    symbol: "MATIC",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    chainId: 1,
    logoURI: "",
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainId: 1,
    symbol: "USDT",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    chainId: 1,
    symbol: "WBTC",
    decimals: 8,
    logoURI: "",
  },
  // zkevm testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1442,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x8Ba0a934ef4C24e475C78072cCa3Ed306c1aBaDD",
    chainId: 1442,
    symbol: "USDC",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0x378588D64A464d61c646e5e86F4DA5277e65802C",
    chainId: 1442,
    symbol: "UNI",
    decimals: 18,
    logoURI: "",
  },
  // zkevm assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1101,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xa2036f0538221a77A3937F1379699f44945018d0",
    chainId: 1101,
    symbol: "MATIC",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    chainId: 1101,
    symbol: "USDC",
    decimals: 18,
    logoURI: "",
  },
];

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

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const handleBridge = (networkId, amount, token) => {
  console.log("handleBridge", networkId, amount);

  const amountBig = ethers.utils.parseUnits(amount, token.decimals);
  const permitData = "0x";

  console.log(amountBig);

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
};

const onConfirm = (props) => {
  console.log(props);
  const { amount, token, network } = props;
  const networkId = network === "ethereum" ? 1 : 0;
  handleBridge(networkId, amount, token);
};

return (
  <div>
    <Widget
      src="ciocan.near/widget/zkevm-bridge-ui"
      props={{ onConfirm, tokens }}
    />
  </div>
);
