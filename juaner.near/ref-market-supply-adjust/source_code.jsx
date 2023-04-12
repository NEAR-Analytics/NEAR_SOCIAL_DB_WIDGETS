const Container = styled.div`
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
// const selectedTokenId =
//   "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near";
const {
  rewards,
  balances,
  account,
  amount,
  hasError,
  hasHFError,
  assets,
  cfButtonStatus,
  newHealthFactor,
} = state;
const hasData = assets.length > 0 && rewards.length > 0;
if (!showModal) {
  State.update({
    amount: "",
    hasError: false,
    hasHFError: false,
  });
}
/** base tool end */
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const onLoad = (data) => {
  State.update(data);
};
/** logic start*/
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
const handleAmount = (value) => {
  const amount = Number(value);
  const [newHF, hFErrorStatus] = recomputeHealthFactor(selectedTokenId, amount);
  State.update({
    amount,
    selectedTokenId,
    hasError: false,
    newHealthFactor: newHF,
    hasHFError: hFErrorStatus,
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
  const amountDecimal = expandToken(amount || 0, decimals);
  const newBalance = amountDecimal.toFixed();
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
  let hFErrorStatus = false;
  if (Number(newHealthFactor) >= 0 && Number(newHealthFactor) <= 105) {
    hFErrorStatus = true;
  }
  const newHealthFactorAmount =
    Number(newHealthFactor) < MAX_RATIO ? newHealthFactor : MAX_RATIO;
  return [newHealthFactorAmount, hFErrorStatus];
};
function computeAdjustMaxAmount() {
  if (!assets || !selectedTokenId || !account) return "0";
  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const { metadata, config } = asset;
  const decimals = metadata.decimals + config.extra_decimals;
  const assetPrice = asset.price.usd || 0;
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
  const availableBalance = B(supplied).plus(collateral).toFixed();
  const availableBalance$ = B(assetPrice).mul(availableBalance).toFixed(2);
  return [availableBalance, availableBalance$, collateral];
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
const [availableBalance, availableBalance$, remainBalance] =
  computeAdjustMaxAmount();
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <div class="content">
      <Widget
        src="juaner.near/widget/ref-input-box"
        props={{
          handleAmount,
          balance: availableBalance,
          balance$: availableBalance$,
        }}
      />
      {hasError && (
        <p class="alert alert-danger mt-10" role="alert">
          Amount greater than available
        </p>
      )}
      {hasHFError && (
        <p class="alert alert-danger mt-10" role="alert">
          Your health factor will be dangerously low and you're at risk of
          liquidation
        </p>
      )}
      {/*<div class="flex-center mt-15">
        <span class="checkButton active">25%</span>
        <span class="checkButton">50%</span>
        <span class="checkButton">75%</span>
        <span class="checkButton">100%</span>
      </div>*/}
      <div class="template mt_25">
        <span class="title">Health Factor</span>
        <span class="value">
          {newHealthFactor ? newHealthFactor : healthFactor}%
        </span>
      </div>
      <div class="template mt_25">
        <span class="title">Amount designated as collateral</span>
        <span class="value">{amount || remainBalance || "-"}</span>
      </div>
      <Widget
        src="juaner.near/widget/ref-adjust-button"
        props={{
          onLoad,
          selectedTokenId,
          amount,
          hasError,
          hasHFError,
          account,
          onLoad,
          assets,
          availableBalance,
        }}
      />
    </div>
  </Container>
);
