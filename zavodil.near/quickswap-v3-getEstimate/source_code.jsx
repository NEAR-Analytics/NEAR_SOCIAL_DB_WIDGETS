const { tokenIn, tokenOut, amountIn, tokenOutDecimals, loadRes } = props;

State.init({ res: { tokenIn, tokenOut, amountIn } });

const middlePool =
  props.middlePool ?? "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";

const useMiddlePool = tokenIn !== middlePool && tokenOut !== middlePool;

const optionDirectSwap = {
  name: "directSwap",
  path: [tokenIn, tokenOut],
};

const optionMiddlePoolSwap = {
  name: "middlePoolSwap",
  path: [tokenIn, middlePool, tokenOut],
};

const swapOptions = useMiddlePool
  ? [optionDirectSwap, optionMiddlePoolSwap]
  : [optionDirectSwap];

if (state.res.amountIn !== amountIn) {
  const resetObject = { amountIn };
  swapOptions.map((option) => (resetObject[option.name] = undefined));

  console.log("resetObject", resetObject);
  State.update({
    res: Object.assign(state.res ?? {}, resetObject),
  });
}

const quoterContractId =
  props.quoterContractId ?? "0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D";
const sqrtPriceLimitX96 = props.sqrtPriceLimitX96 ?? 0;

const quoterABI =
  props.quoterABI ??
  "https://gist.githubusercontent.com/zavodil/6a6e93e079deb3f8992e3d28d1ff0d78/raw/c6693b2ea41605ec215c912bfa82d67bad90258b/zkevm-quoter-abi.json";

const quoterContractJson = fetch(quoterABI);
if (!quoterContractJson.ok) {
  return "Loading";
}

const getEstimate = (path, name) => {
  const abi = JSON.parse(quoterContractJson.body);
  const iface = new ethers.utils.Interface(abi);

  const pathBytes = "0x" + path.map((address) => address.substr(2)).join("");

  const inputs = [pathBytes, amountIn];

  const encodedData = iface.encodeFunctionData("quoteExactInput", inputs);

  Ethers.provider()
    .call({
      to: quoterContractId,
      data: encodedData,
    })
    .then((data) => {
      const decodedData = iface.decodeFunctionResult("quoteExactInput", data);

      // decodedData = [amountOut, fee]
      const amountOut = decodedData[0];
      const fee = decodedData[1];

      const estimate = Big(amountOut.toString())
        .div(Big(10).pow(tokenOutDecimals))
        .toFixed(18);

      State.update({
        res: Object.assign(state.res ?? {}, {
          [name]: { estimate, path, fee },
        }),
      });
    });
};

swapOptions.map((option) => {
  if (state.res[option.name] === undefined) {
    getEstimate(option.path, option.name);
  }
});

const allDataReceived = swapOptions.reduce(
  (accumulator, option) => accumulator && state.res[option.name] !== undefined,
  true
);

if (state.res !== undefined && allDataReceived) {
  if (props.debug) {
    console.log("res", state.res);
    if (typeof loadRes !== "function") {
      loadRes = (res) => {
        return <div>{JSON.stringify(res)}</div>;
      };
    }
  }

  if (typeof loadRes === "function") {
    let res = state.res;

    res.estimate = 0;
    res.path = "";

    swapOptions.map((option) => {
      let estimate = parseFloat(state.res[option.name].estimate);
      if (res.estimate < estimate) {
        res.estimate = estimate;
        res.path = state.res[option.name].path;
        res.fee = state.res[option.name].fee;
      }
    });

    return loadRes(res);
  }
}
