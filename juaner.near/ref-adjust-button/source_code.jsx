let BURROW_CONTRACT = "contract.main.burrow.near";
let ORACLE_CONTRACT = "priceoracle.near";
let accountId = context.accountId;
let MAX_RATIO = 10_000;
let B = Big();
B.DP = 60; // set precision to 60 decimals
const NO_STORAGE_DEPOSIT_CONTRACTS = ["aurora", "meta-pool.near"];
const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals));
};
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
const {
  selectedTokenId,
  amount,
  hasError,
  hasHFError,
  account,
  onLoad,
  assets,
  availableBalance,
  storageToken,
} = props;
function decimalMax(a, b) {
  a = new B(a);
  b = new B(b);
  return a.gt(b) ? a : b;
}

function decimalMin(a, b) {
  a = new B(a);
  b = new B(b);
  return a.lt(b) ? a : b;
}
const handleAdjust = () => {
  if (!selectedTokenId || !amount || hasError || !account) return;
  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const { token_id, metadata, config } = asset;
  if (Number(amount) > Number(availableBalance)) {
    onLoad({ hasError: true });
    return;
  }
  const decimals = metadata.decimals + config.extra_decimals;
  const expandedAmount = expandToken(amount, decimals);
  const accountSuppliedAsset = account.supplied.find(
    (a) => a.token_id === tokenId
  );
  const accountCollateralAsset = account.collateral.find(
    (a) => a.token_id === tokenId
  );
  const suppliedBalance = accountSuppliedAsset?.balance || 0;
  const collateralBalance = accountCollateralAsset?.balance || 0;
  const transactions = [];
  if (expandedAmount.gt(collateralBalance)) {
    transactions.push({
      contractName: BURROW_CONTRACT,
      methodName: "execute",
      gas: expandToken(100, 12),
      deposit: new Big("1").toFixed(),
      args: {
        actions: [
          {
            IncreaseCollateral: {
              token_id,
              max_amount: expandedAmount.sub(collateralBalance).toFixed(0),
            },
          },
        ],
      },
    });
  } else if (expandedAmount.lt(collateralBalance)) {
    transactions.push({
      contractName: ORACLE_CONTRACT,
      methodName: "oracle_call",
      gas: expandToken(100, 12),
      deposit: new Big("1").toFixed(),
      args: {
        receiver_id: BURROW_CONTRACT,
        msg: JSON.stringify({
          Execute: {
            actions: [
              {
                DecreaseCollateral: {
                  token_id,
                  max_amount: collateralBalance.sub(expandedAmount).toFixed(0),
                },
              },
            ],
          },
        }),
      },
    });
  }
  Near.call(transactions);
};
return (
  <div
    class={`greenButton mt_25 ${
      Number(amount) && !hasHFError && !hasError ? "" : "disabled"
    }`}
    onClick={handleAdjust}
  >
    Adjust
  </div>
);
