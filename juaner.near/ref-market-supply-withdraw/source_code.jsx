const Container = styled.div`
    .content input{
      background: #152528;
      border-radius: 12px;
      height: 55px;
      font-size:20px;
      color: #7E8A93;
      padding:0 15px 0 15px;
      border:none;
      margin-bottom:8px;
    }
    .content input:focus{
      outline:none;
    }
 
    .content .balance {
      font-size:12px;
      color:#4B6778;
      margin-left:6px;
    }
    .template{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-left:6px;
    }
    .template .title{
      font-size:14px;
      color:#7E8A93;
    }
    .template .value{
      font-size:14px;
      color:#fff;
    }
    .mt_25{
      margin-top:25px;
    }
    .mt-10{
      margin-top:10px;
    }

    .flex-center{
      display:flex;
      align-items:center;

    }
    .greenButton{
      display:flex;
      align-items:center;
      justify-content:center;
      background: #00FFD1;
      border-radius: 12px;
      height:46px;
      font-weight: 700;
      font-size: 18px;
      color:#000;
      cursor:pointer;
      width:100%;
    }
    .disabled{
      opacity:0.3;
      cursor: not-allowed;
    }
    .checkButton{
       flex-grow:1;
       height: 32px;
       border: 1px solid #304352;
       margin-right:7px;
       display:flex;
       align-items:center;
       justify-content:center;
       color:white;
       border-radius: 6px;
       cursor:pointer;
    }
    .checkButton.active{
        background-color:#304352;
    }
    .mt-15{
        margin-top:15px;
    }
`;
/** base tool start  */
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
const { showModal, selectedTokenId } = props;
const {
  rewards,
  balances,
  account,
  amount,
  hasError,
  assets,
  cfButtonStatus,
  newHealthFactor,
} = state;
const hasData = assets.length > 0 && rewards.length > 0;
if (!showModal) {
  State.update({
    amount: "",
    hasError: false,
  });
}
/** base tool end */
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const onLoad = (data) => {
  State.update(data);
};
/** logic start */
let apy = 0;
let cf = "-";
const getApy = (asset) => {
  if (!asset && !rewards) return 0;
  const r = rewards.find((a) => a.token_id === asset.token_id);
  const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;
  return toAPY(totalApy);
};
if (selectedTokenId && assets) {
  const token = selectedTokenId === "NEAR" ? "wrap.near" : selectedTokenId;
  const asset = assets.find((a) => a.token_id === token);
  apy = getApy(asset);
  cf = asset.config.volatility_ratio / 100;
}

const storageToken = selectedTokenId
  ? Near.view(selectedTokenId, "storage_balance_of", {
      account_id: accountId,
    })
  : null;

const handleAmount = (e) => {
  const amount = Number(e.target.value);
  const newHF = recomputeHealthFactor(selectedTokenId, amount);
  State.update({
    amount: Number(e.target.value),
    selectedTokenId,
    hasError: false,
    newHealthFactor: newHF,
  });
};

/** logic end */
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
const adjustedCollateralSum = getAdjustedSum("collateral", account);
const adjustedBorrowedSum = getAdjustedSum("borrowed", account);

function getHealthFactor() {
  const healthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);
  return Number(healthFactor) < MAX_RATIO ? healthFactor : MAX_RATIO;
}
const healthFactor = getHealthFactor();

const recomputeHealthFactor = (tokenId, amount) => {
  if (!tokenId || !amount || !assets) return null;
  const asset = assets.find((a) => a.token_id === tokenId);
  const decimals = asset.metadata.decimals + asset.config.extra_decimals;
  const accountCollateralAsset = account.collateral.find(
    (a) => a.token_id === tokenId
  );
  const accountSuppliedAsset = account.supplied.find(
    (a) => a.token_id === tokenId
  );
  const collateralBalance = B(accountCollateralAsset?.balance || 0);
  const suppliedBalance = B(accountSuppliedAsset?.balance || 0);
  const amountDecimal = expandToken(amount || 0, decimals);

  const newBalance = decimalMin(
    collateralBalance.toFixed(),
    collateralBalance.plus(suppliedBalance).minus(amountDecimal).toFixed()
  ).toFixed();
  const clonedAccount = clone(account);

  const updatedToken = {
    token_id: tokenId,
    balance: newBalance,
    shares: newBalance,
    apr: "0",
  };

  if (clonedAccount?.collateral.length === 0) {
    clonedAccount.collateral = updatedToken;
  } else if (!accountCollateralAsset) {
    clonedAccount.collateral.push(updatedToken);
  } else {
    clonedAccount.collateral = [
      ...clonedAccount.collateral.filter((a) => a.token_id !== tokenId),
      updatedToken,
    ];
  }
  const adjustedCollateralSum = getAdjustedSum(
    "collateral",
    amount === 0 ? account : clonedAccount
  );
  const adjustedBorrowedSum = getAdjustedSum("borrowed", account);

  const newHealthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);

  return Number(newHealthFactor) < MAX_RATIO ? newHealthFactor : MAX_RATIO;
};
function computeWithdrawMaxAmount() {
  if (!assets || !selectedTokenId || !account) return "0";
  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const { metadata, config } = asset;
  const decimals = metadata.decimals + config.extra_decimals;
  const assetPrice = asset.price
    ? B(asset.price.multiplier).div(B(10).pow(asset.price.decimals))
    : B(0);
  const accountSuppliedAsset = account.supplied.find(
    (a) => a.token_id === selectedTokenId
  );
  const suppliedBalance = new B(accountSuppliedAsset?.balance || 0);
  const supplied = Number(shrinkToken(suppliedBalance.toFixed(), decimals));

  const accountCollateralAsset = account.collateral.find(
    (a) => a.token_id === selectedTokenId
  );
  const collateralBalance = new B(accountCollateralAsset?.balance || 0);
  const collateral = Number(shrinkToken(collateralBalance.toFixed(), decimals));
  let maxAmount = suppliedBalance;
  if (collateralBalance.gt(0)) {
    const adjustedPricedDiff = decimalMax(
      0,
      B(adjustedCollateralSum).sub(adjustedBorrowedSum).toFixed()
    );
    const safeAdjustedPricedDiff = adjustedPricedDiff.mul(999).div(1000);

    const safePricedDiff = safeAdjustedPricedDiff
      .div(asset.config.volatility_ratio)
      .mul(10000);
    const safeDiff = safePricedDiff
      .div(assetPrice)
      .mul(expandToken(1, asset.config.extra_decimals))
      .toFixed(0);
    maxAmount = maxAmount.add(
      decimalMin(safeDiff, collateralBalance.toFixed()).toFixed()
    );
    const { metadata, config } = asset;
    const decimals = metadata.decimals + config.extra_decimals;
    maxAmount = shrinkToken(maxAmount.toFixed(), decimals);
  }
  const remain = Math.abs(
    Math.min(collateral, collateral + supplied - (amount || 0))
  );
  const remainBalance = B(remain).toFixed(4);
  return [maxAmount.toFixed(), remainBalance];
}
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
const [availableBalance, remainBalance] = computeWithdrawMaxAmount();
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <div class="content">
      <input type="number" value={amount} onChange={handleAmount} />
      {selectedTokenId && (
        <span class="balance">Balance: {availableBalance}</span>
      )}
      {hasError && (
        <p class="alert alert-danger mt-10" role="alert">
          Amount greater than available
        </p>
      )}
      {/*<div class="flex-center mt-15">
        <span class="checkButton active">25%</span>
        <span class="checkButton">50%</span>
        <span class="checkButton">75%</span>
        <span class="checkButton">100%</span>
      </div>*/}
      <div class="template mt_25">
        <span class="title">Supply APY</span>
        <span class="value">{apy || "-"}%</span>
      </div>
      <div class="template mt_25">
        <span class="title">Health Factor</span>
        <span class="value">
          {newHealthFactor ? newHealthFactor : healthFactor}%
        </span>
      </div>
      <div class="template mt_25">
        <span class="title">Remaining Collateral</span>
        <span class="value">{remainBalance || "-"}</span>
      </div>
      <Widget
        src="juaner.near/widget/ref-withdraw-button"
        props={{
          onLoad,
          selectedTokenId,
          amount,
          hasError,
          account,
          onLoad,
          assets,
          availableBalance,
          storageToken,
        }}
      />
    </div>
  </Container>
);
