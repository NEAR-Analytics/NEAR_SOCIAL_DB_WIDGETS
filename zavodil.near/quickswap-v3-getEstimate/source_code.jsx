const { tokenIn, tokenOut, amountIn, tokenOutDecimals, loadRes } = props;

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

const abi = JSON.parse(quoterContractJson.body);

const iface = new ethers.utils.Interface(abi);

const inputs = [tokenIn, tokenOut, amountIn, sqrtPriceLimitX96];

const encodedData = iface.encodeFunctionData("quoteExactInputSingle", inputs);

Ethers.provider()
  .call({
    to: quoterContractId,
    data: encodedData,
  })
  .then((data) => {
    const decodedData = iface.decodeFunctionResult(
      "quoteExactInputSingle",
      data
    );

    // decodedData = [amountOut, fee]
    decodedData = decodedData[0];

    const estimate = Big(decodedData.toString())
      .div(Big(10).pow(tokenOutDecimals))
      .toFixed(18);

    State.update({
      res: {
        estimate,
        tokenIn,
        tokenOut,
        pool: "",
      },
    });
  });

if (state.res !== undefined) {
  if (props.debug) {
    console.log("res", state.res);
    return <div>{JSON.stringify(state.res)}</div>;
  }

  if (typeof loadRes === "function") {
    loadRes(state.res);
  }
}
