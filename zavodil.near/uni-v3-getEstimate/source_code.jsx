const { tokenIn, tokenOut, amountIn, tokenOutDecimals, loadRes } = props;

const quoterContractId =
  props.quoterContractId ?? "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
const fee = props.fee ?? 500; // 0.05%
const sqrtPriceLimitX96 = props.sqrtPriceLimitX96 ?? 0;

const quoterContractJson = fetch(
  "https://gist.githubusercontent.com/zavodil/7d6038c55d69f4813afab660f5fa64c7/raw/101c7ded26cb586536a433f8ede3c038720e6b0d/Quoter.json"
);
if (!quoterContractJson.ok) {
  return "Loading";
}

const abi = JSON.parse(quoterContractJson.body).abi;

const iface = new ethers.utils.Interface(abi);

const inputs = [tokenIn, tokenOut, fee, amountIn, sqrtPriceLimitX96];

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

    const estimate = Big(decodedData.toString())
      .div(Big(10).pow(tokenOutDecimals))
      .toFixed(2);

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
