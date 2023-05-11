const ownerId = "manzanal.near";
const accountId = context.accountId;
const tokenName = "NEAR";
const wrapTokenName = "WNEAR";
const wnearContract = "wrap.near";
const wrapMethod = "near_deposit";
const unwrapMethod = "near_withdraw";
const YOCTO = 1000000000000000000000000;
const GAS = "200000000000000";
const NEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;
const imgWrapTokenSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="32"
    height="32"
    viewBox="0 0 52.000000 52.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)"
      fill="#000000"
      stroke="none"
    >
      <path d="M190 511 c-46 -15 -85 -39 -116 -73 -54 -57 -69 -95 -69 -178 0 -83 15 -121 69 -178 53 -57 101 -77 186 -77 57 0 84 5 115 22 47 25 95 74 121 123 26 49 26 171 0 220 -26 49 -74 98 -121 122 -43 22 -144 33 -185 19z m80 -211 l120 -80 0 -41 c0 -22 -4 -39 -9 -37 -5 2 -63 37 -129 78 l-121 75 -1 43 c0 23 5 42 10 42 6 0 64 -36 130 -80z m120 20 c0 -33 -3 -60 -6 -60 -12 0 -84 44 -84 51 0 8 72 68 83 69 4 0 7 -27 7 -60z m-210 -82 c22 -13 40 -26 40 -29 0 -7 -76 -69 -84 -69 -3 0 -6 27 -6 60 0 33 2 60 6 60 3 0 23 -10 44 -22z" />
    </g>
  </svg>
);
const imgTokenSvg = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="white"></circle>
    <g clip-path="url(#clip0000000003)">
      <path
        d="M20.8422 8.84471L17.4978 13.776C17.4501 13.847 17.43 13.9328 17.4411 14.0174C17.4522 14.102 17.4938 14.1798 17.5582 14.2363C17.6225 14.2928 17.7053 14.3243 17.7913 14.3249C17.8772 14.3254 17.9604 14.2951 18.0256 14.2395L21.3178 11.4036C21.3371 11.3865 21.361 11.3753 21.3866 11.3714C21.4122 11.3675 21.4383 11.3711 21.4619 11.3818C21.4855 11.3924 21.5054 11.4096 21.5193 11.4314C21.5331 11.4531 21.5403 11.4783 21.54 11.504V20.3824C21.54 20.4095 21.5316 20.4361 21.5158 20.4583C21.5001 20.4806 21.4779 20.4975 21.4522 20.5068C21.4265 20.516 21.3985 20.5172 21.3721 20.5102C21.3456 20.5031 21.322 20.4882 21.3044 20.4673L11.3533 8.63726C11.1933 8.44956 10.994 8.29873 10.7693 8.19525C10.5446 8.09178 10.2999 8.03815 10.0522 8.03809H9.70444C9.2524 8.03809 8.81887 8.21642 8.49922 8.53386C8.17957 8.8513 8 9.28185 8 9.73078V22.2351C8 22.684 8.17957 23.1145 8.49922 23.432C8.81887 23.7494 9.2524 23.9277 9.70444 23.9277V23.9277C9.99591 23.9278 10.2825 23.8537 10.537 23.7125C10.7914 23.5713 11.0051 23.3677 11.1578 23.1211L14.5022 18.1898C14.5499 18.1188 14.57 18.033 14.5589 17.9484C14.5478 17.8638 14.5062 17.7861 14.4418 17.7295C14.3775 17.673 14.2947 17.6415 14.2087 17.641C14.1228 17.6404 14.0396 17.6707 13.9744 17.7264L10.6822 20.5622C10.6629 20.5794 10.639 20.5906 10.6134 20.5944C10.5878 20.5983 10.5617 20.5947 10.5381 20.5841C10.5145 20.5734 10.4946 20.5562 10.4807 20.5345C10.4669 20.5128 10.4597 20.4875 10.46 20.4618V11.5813C10.46 11.5541 10.4684 11.5276 10.4842 11.5053C10.4999 11.483 10.5221 11.4661 10.5478 11.4568C10.5735 11.4476 10.6015 11.4464 10.6279 11.4534C10.6544 11.4605 10.678 11.4755 10.6956 11.4963L20.6456 23.3286C20.8056 23.5163 21.0049 23.6671 21.2296 23.7706C21.4543 23.874 21.699 23.9277 21.9467 23.9277H22.2944C22.5184 23.9279 22.7401 23.8842 22.947 23.7992C23.154 23.7142 23.342 23.5895 23.5004 23.4324C23.6588 23.2752 23.7844 23.0885 23.8702 22.8831C23.9559 22.6776 24 22.4574 24 22.2351V9.73078C24 9.28185 23.8204 8.8513 23.5008 8.53386C23.1811 8.21642 22.7476 8.03809 22.2956 8.03809C22.0041 8.03801 21.7175 8.11211 21.4631 8.25332C21.2086 8.39453 20.9949 8.59814 20.8422 8.84471V8.84471Z"
        fill="black"
      ></path>
    </g>
    <defs>
      <clipPath id="clip00033">
        <rect
          width="16"
          height="16"
          fill="black"
          transform="translate(8 7.9834)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

const parseToUnitsFn = (amount) => {
  let by1e6 = Math.round(Number(amount) * 1e6).toString();
  let yoctosText = by1e6 + "0".repeat(NEAR_DECIMALS - 6);
  return yoctosText;
};

const formatUnitsFn = (amount) => {
  if (!amount) return 0;
  if (amount.indexOf(".") !== -1) {
    console.log("a yocto string can't have a decimal point: " + amount);
    return null;
  }
  const token_decimals = NEAR_DECIMALS;
  const decimals = 5;
  let negative = false;
  if (amount.startsWith("-")) {
    negative = true;
    amount = amount.slice(1);
  }
  let padded = amount.padStart(token_decimals + 1, "0");
  const decimalPointPosition = -token_decimals + decimals;
  let nearsText =
    padded.slice(0, -token_decimals) +
    "." +
    padded.slice(-token_decimals, decimalPointPosition);
  return Number(nearsText) * (negative ? -1 : 1);
};
const isValidAmountFn = (amount) => {
  if (!amount) return false;
  if (isNaN(Number(amount))) return false;
  if (amount === "") return false;
  if (amount < 0) return false;
  return true;
};
const isSignedIn = () => !!context.accountId;
const getNearBalance = (accountId, updateStateCallback) => {
  const account = fetch("https://rpc.mainnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  });
  const { amount, storage_usage } = account.body.result;
  const COMMON_MIN_BALANCE = 0.005;
  if (!amount) return "-";
  const availableBalance = Big(amount || 0).minus(
    Big(storage_usage).mul(Big(10).pow(19))
  );
  const balance = availableBalance
    .div(Big(10).pow(NEAR_DECIMALS))
    .minus(COMMON_MIN_BALANCE);
  const result = balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
  updateStateCallback(result);
  return result;
};

const getWnearBalance = (account_id, updateStateCallback) => {
  const balanceAmount = Near.view(wnearContract, "ft_balance_of", {
    account_id,
  });
  const result = formatUnitsFn(balanceAmount);
  updateStateCallback(result);
  return result;
};
const wrapFn = (amount) => {
  return Near.call(wnearContract, wrapMethod, {}, GAS, parseToUnitsFn(amount));
};
const unwrapFn = (amount) => {
  return Near.call(
    wnearContract,
    unwrapMethod,
    {
      amount: parseToUnitsFn(amount),
    },
    GAS,
    1
  );
};

return (
  <Widget
    src={`${ownerId}/widget/AbstractWrapper`}
    props={{
      tokenName,
      wrapTokenName,
      imgTokenSvg,
      imgWrapTokenSvg,
      getTokenBalanceFn: getNearBalance,
      getWrapTokenBalanceFn: getWnearBalance,
      parseToUnitsFn,
      formatUnitsFn,
      isValidAmountFn,
      wrapFn,
      unwrapFn,
      isSignedIn,
    }}
  />
);
