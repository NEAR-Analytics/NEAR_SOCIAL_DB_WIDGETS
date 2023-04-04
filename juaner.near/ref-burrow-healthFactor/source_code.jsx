let MAX_RATIO = 10_000;
let accountId = context.accountId;
let B = Big();
B.DP = 60; // set precision to 60 decimals
const { assets, rewards, account } = state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
const onLoad = (data) => {
  State.update(data);
};
const expandToken = (value, decimals) => {
  return B(value).mul(B(10).pow(decimals));
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
function getAdjustedSum(type, account) {
  if (!assets || !account || account[type].length == 0) return B(1);
  return account[type]
    .map((assetInAccount) => {
      const asset = assets.find((a) => a.token_id === assetInAccount.token_id);

      const price = asset.price
        ? B(asset.price.multiplier).div(B(10).pow(asset.price.decimals))
        : B(0);

      const pricedBalance = B(assetInAccount.balance)
        .div(expandToken(1, asset.config.extra_decimals))
        .mul(price);

      return type === "borrowed"
        ? pricedBalance
            .div(asset.config.volatility_ratio)
            .mul(MAX_RATIO)
            .toFixed()
        : pricedBalance
            .mul(asset.config.volatility_ratio)
            .div(MAX_RATIO)
            .toFixed();
    })
    .reduce((sum, cur) => B(sum).plus(B(cur)).toFixed());
}
function getHealthFactor() {
  const healthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);
  return Number(healthFactor) < MAX_RATIO ? healthFactor : MAX_RATIO;
}
const adjustedCollateralSum = getAdjustedSum("collateral", account);
const adjustedBorrowedSum = getAdjustedSum("borrowed", account);
let healthFactor;
if (account && assets) {
  healthFactor = getHealthFactor();
}
return (
  <div>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {healthFactor || "-"}%
  </div>
);
