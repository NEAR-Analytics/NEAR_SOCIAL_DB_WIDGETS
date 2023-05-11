const ownerId = "manzanal.near";
const tokenName = "ETH";
const wrapTokenName = "WETH";
const wethAddress =
  props.wethAddress || "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const tokenDecimals = 18;
const wethAbiUrl =
  props.wethAbiUrl ||
  "https://api.etherscan.io/api?module=contract&action=getabi&address=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&format=raw";
const wethAbi = fetch(wethAbiUrl);

if (!wethAbi.ok) {
  return "Loading";
}
const wethAbiBody = wethAbi.body;
const signer = Ethers.provider() ? Ethers.provider().getSigner() : null;
const wethContract = new ethers.Contract(wethAddress, wethAbiBody, signer);

State.init({
  signerAddress: null,
});

const getSignerAddress = () => {
  signer.getAddress().then((signerAddress) => {
    State.update({ signerAddress });
  });
};
getSignerAddress();

const imgWrapTokenSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g fill="none" fill-rule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <g fill="#FFF" fill-rule="nonzero">
        <path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
        <path d="M16.498 4L9 16.22l7.498-3.35z" />
        <path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
        <path d="M16.498 27.995v-6.028L9 17.616z" />
        <path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
        <path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
      </g>
    </g>
  </svg>
);
const imgTokenSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.2"
    viewBox="0 0 21 21"
    width="35"
    height="35"
  >
    <path
      fill-rule="evenodd"
      d="m10.7 21c-5.8 0-10.5-4.7-10.5-10.5 0-5.8 4.7-10.5 10.5-10.5 5.7 0 10.4 4.7 10.4 10.5 0 5.8-4.7 10.5-10.4 10.5zm3.9-9.6l-4.1 2.4-4-2.4 4 5.8zm0-0.8l-4-6.8-4 6.8 4 2.3z"
    />
  </svg>
);

const parseToUnitsFn = (amount) => {
  const tokenDecimals = 18;
  return ethers.utils.parseUnits(amount, tokenDecimals);
};

const formatUnitsFn = (amount) => {
  const tokenDecimals = 18;
  return ethers.utils.formatUnits(amount, tokenDecimals);
};
const isValidAmountFn = (amount) => {
  if (!amount) return false;
  if (isNaN(Number(amount))) return false;
  if (amount === "") return false;
  if (amount < 0) return false;
  return true;
};
const isSignedIn = () => !!state.signerAddress;

const getEthBalance = (signerAddress, updateStateCb) => {
  Ethers.provider()
    .getBalance(signerAddress)
    .then((balance) => updateStateCb(formatUnitsFn(balance)));
};

const getWEthBalance = (signerAddress, updateStateCb) => {
  wethContract
    .balanceOf(signerAddress)
    .then((balance) => updateStateCb(formatUnitsFn(balance)));
};

const wrapFn = (amountIn) => {
  const amount = parseToUnitsFn(amountIn);

  wethContract.deposit({ value: amount });
};
const unwrapFn = (amountIn) => {
  const amount = parseToUnitsFn(amountIn);

  wethContract.withdraw(amount);
};
if (!state.signerAddress) return "Loading...";
return (
  <Widget
    src={`${ownerId}/widget/AbstractWrapper`}
    props={{
      tokenName,
      wrapTokenName,
      imgTokenSvg,
      imgWrapTokenSvg,
      getTokenBalanceFn: getEthBalance,
      getWrapTokenBalanceFn: getWEthBalance,
      parseToUnitsFn,
      formatUnitsFn,
      isValidAmountFn,
      wrapFn,
      unwrapFn,
      isSignedIn,
      signerAddress: state.signerAddress,
    }}
  />
);
