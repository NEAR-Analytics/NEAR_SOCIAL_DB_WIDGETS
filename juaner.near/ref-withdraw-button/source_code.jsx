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
const handleWithdraw = () => {
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
  const suppliedBalance = accountSuppliedAsset?.balance || 0;
  const decreaseCollateralAmount = decimalMax(
    expandedAmount.sub(suppliedBalance).toFixed(),
    0
  );
  const withdrawAction = {
    Withdraw: {
      token_id,
      max_amount: expandedAmount.toFixed(),
    },
  };
  const transactions = [];
  if (decreaseCollateralAmount.gt(0)) {
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
                  amount: decreaseCollateralAmount.toFixed(0),
                },
              },
              withdrawAction,
            ],
          },
        }),
      },
    });
  } else {
    transactions.push({
      contractName: ORACLE_CONTRACT,
      methodName: "oracle_call",
      gas: expandToken(100, 12),
      deposit: new Big("1").toFixed(),
      args: {
        receiver_id: BURROW_CONTRACT,
        msg: JSON.stringify({
          Execute: { actions: [withdrawAction] },
        }),
      },
    });
  }
  const isNEAR = token_id == "wrap.near";
  if (isNEAR && expandedAmount.gt(10)) {
    transactions.push({
      contractName: token_id,
      methodName: "near_withdraw",
      args: { amount: expandedAmount.sub(10).toFixed(0) },
    });
  }
  if (
    !(storageToken && storageToken.total != "0") &&
    !NO_STORAGE_DEPOSIT_CONTRACTS.includes(token_id)
  ) {
    transactions.unshift({
      contractName: token_id,
      methodName: "storage_deposit",
      deposit: expandToken(0.25, 24).toFixed(),
    });
  }

  Near.call(transactions);
};
return (
  <div
    class={`greenButton mt_25 ${Number(amount) ? "" : "disabled"}`}
    onClick={handleWithdraw}
  >
    Withdraw
  </div>
);
