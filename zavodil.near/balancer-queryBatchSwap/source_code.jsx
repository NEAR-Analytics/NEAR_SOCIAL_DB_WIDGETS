const {
  tokenIn,
  inputAsset,
  tokenOut,
  outputAsset,
  amountIn,
  sender,
  loadRes,
} = props;

const quoterContractId = props.quoterContractId;
const quoterABI =
  props.quoterABI ??
  "https://raw.githubusercontent.com/gerrrg/balancer-tutorials/master/abis/Vault.json";

const quoterContractJson = fetch(quoterABI);
if (!quoterContractJson.ok) {
  return "Loading";
}

const abi = JSON.parse(quoterContractJson.body);

// prepare data

const USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
const WBTC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
const WMATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
const USDT = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
const DAI = "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063";

// [asset1, asset2, asset3...], pool1
const pools = [
  [
    [WMATIC, WETH, USDC],
    "0x0297e37f1873d2dab4487aa67cd56b58e2f27875000100000000000000000002",
  ],
  [
    [WETH, USDC, WBTC],
    "0x03cd191f589d12b0582a99808cf19851e468e6b500010000000000000000000a",
  ],
  [
    [USDC, DAI, USDT],
    "0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000012",
  ],
  [
    [WETH, USDC, DAI, WBTC, WMATIC],
    "0x945f337307ea76fdaa2590d083423850f64e247f000100000000000000000b98",
  ],
  [
    [USDT, WMATIC],
    "0xab7b5e989641afc86daf1bc2cd0ab21285c23f36000100000000000000000a80",
  ],
];

const finalPool = pools
  .filter(
    (poolData) =>
      poolData[0].includes(tokenIn) && poolData[0].includes(tokenOut)
  )
  .map((poolData) => poolData[1]);

if (!finalPool.length) {
  return console.log("Pool not found");
}

const assets = [tokenIn, tokenOut];

const funds = [sender, false, sender, false];

const swap_steps = [
  {
    poolId: finalPool[1],
    assetIn: tokenIn,
    assetOut: tokenOut,
    amount: amountIn,
  },
];

const token_data = {};
token_data[tokenIn] = {
  symbol: inputAsset.metadata.symbol,
  decimals: inputAsset.metadata.decimals,
  limit: "0",
};
token_data[tokenOut] = {
  symbol: outputAsset.metadata.symbol,
  decimals: outputAsset.metadata.decimals,
  limit: "0",
};

var token_addresses = Object.keys(token_data);
const token_indices = {};
for (var i = 0; i < token_addresses.length; i++) {
  token_indices[token_addresses[i]] = i;
}

const swap_steps_struct = [];
for (const step of swap_steps) {
  const swap_step_struct = [
    step["poolId"],
    token_indices[step["assetIn"]],
    token_indices[step["assetOut"]],
    step["amount"],
    "0x",
  ];
  swap_steps_struct.push(swap_step_struct);
}

const swap_kind = 0;

const iface = new ethers.utils.Interface(abi);
const encodedData = iface.encodeFunctionData("queryBatchSwap", [
  swap_kind,
  swap_steps_struct,
  assets,
  funds,
]);

Ethers.provider()
  .call({
    to: quoterContractId,
    data: encodedData,
  })
  .then((data) => {
    const decodedData = iface.decodeFunctionResult("queryBatchSwap", data);

    const estimate1 = Big(decodedData[0][1].toString())
      .div(Big(10).pow(outputAsset.metadata.decimals))
      .toFixed(18);

    const estimate0 = Big(decodedData[0][0].toString())
      .div(Big(10).pow(outputAsset.metadata.decimals))
      .toFixed(18);

    let estimate = 0;
    if (typeof estimate0 == "string" && estimate0[0] == "-") {
      estimate = estimate0.substring(1);
    } else if (typeof estimate1 == "string" && estimate1[0] == "-") {
      estimate = estimate1.substring(1);
    }

    State.update({
      res: {
        estimate,
        tokenIn,
        tokenOut,
        pool: finalPool[0],
      },
    });
  });

if (state.res !== undefined) {
  if (props.debug) {
    console.log("res", state.res);
    return <pre>{JSON.stringify(state.res)}</pre>;
  }

  if (typeof loadRes === "function") {
    loadRes(state.res);
  }
}
