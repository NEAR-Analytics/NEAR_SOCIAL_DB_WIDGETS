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
`;
const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
`;
const Modal = styled.div`
  background-color:#1A2E33;
  border-radius:12px;
  position:fixed;
  z-index:1002;
  width:30rem;
  max-width: 95vw;
  max-height: 80vh;
  padding:10px 0 20px 0;
  animation:anishow 0.3s forwards ease-out;
  left:50%;
  top:50%;
  @keyframes anishow {
    from {
      opacity: 0;
      transform:translate(-50%,-70%);
    }
    to {
      opacity: 1;
      transform:translate(-50%,-50%);
    }
  }
    .modal-header{
      display:flex;
      align-items:center;
      justify-content:start;
      color:#fff;
      font-weight: 700;
      font-size: 18px;
      padding:12px 20px;
      margin-bottom:16px;
      border-bottom:2px solid rgba(48, 67, 82, 0.5);
    } 
    .modal-header .title{
       font-weight: 700;
       font-size: 18px;
       color:#fff;
    }
    .modal-header .btn-close{
      position:absolute;
      right:28px;
      margin:0;
    }
    .modal-body {
        padding:0 16px;
    }
    .modal-body .tab{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:30px;
    }
    .modal-body .tab span{
      display:flex;
      align-items:center;
      justify-content:center;
      width:50%;
      height:40px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 18px;
      cursor:pointer;
      color:#fff;
    }
    .modal-body .tab span.active{
      background: #304352;
    }
   .btn-close-custom{
      position:absolute;
      right:28px;
      width:12px;
      height:12px;
      cursor:pointer;
    }
`;
/** base tool start  */
let accountId = context.accountId;
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const wnearbase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRYhbWYTUtjVxjH/9fRaFBaK3Q0ahCE3HTR0kWLL0g72nEh6NaAL+BivkIXHUpblWr9Ai78CIKgQqC1xYJNVnWwdiFCF9OS4CRRM2o7TRyw+XWRJk2uebuJ/uFC7jnP89xfzrnPOee5hmwIqJc0LOmxpA8keSW1SnpD0p+SLiT9JumZpF1Je4Zh3Nh5RiUQHcAKEMWeov/5td8FRBPwFZCwCWFVAvgCaKwWxAsc1ghh1RHwrl2QR8DlHYNk9BcwWinIMJC8J5CMEsDH5UDeAa7uGSSjC8DMfb6RA9Ik6WdJ79ma09r0q6R+wzBeS1JdTsdnhUACgYA8Ho8cDofGx8d1fn5u62mrq6tyuVwyTVPBYNDa/b6kT/NaSK8jBdPX4/EgKXsNDQ1xfX1d0Tz4/f48X9M0C5n9DTzMhVkpFjA3WOaam5srCxKPx+ns7LzlW0TLGZB6IGIHRhIrK0X5AZiZmSnoV0RRoF7AaKmguYFmZ2ezv+vq6tja2iros7m5iSSamppYWlqqBAZgRMA3lcJEo1Gmpqay9y0tLRwe5i/SZ2dntLe309bWxt7eHuFwuFKYrwX8UClMLBYjkUjQ19eXbevp6SEa/X//9Pl89Pb2cnx8DGAH5jsBf9iBATg5OaGrqyvbPjg4SDKZJBQKMTo6yunpadbfBsxzkd4rbMEAHBwc0NzcnO3z+XykUqlb/jZgrgTcVAMDsLGxgWEY2f7l5eVaYG6qHpmM5ufns/2GYbC+vl4tzJWA32uBSaVSTE9PZ22cTif7+/vVwDwX8H01MJFIhJGRESKRyK0Mc7vdRCIRuzDf1il9eLalo6MjDQwMqLu7Wx0dHXI6ndre3pbb7ZYkhcNhTUxMKJFI2An7TMBjOyOzu7tLa2srLpeLeDyeZ2vNsMnJSUKhUKUjM2xrb1pYWMDhcCAJv99f0N6aYdY9qoheAA8k2d+1nzx5Uuofsri4WHSDLaKl7GQB7RQ5z1iDud1uLi9Ln9WtGVYG5hXwdt7bA3xZyNI0zbx1ZGdnpyRIRslkkv7+/jwQr9dbyPTprVcZaKRAnRQIBDBNE5fLxdraWkUgGcViMcbGxmhoaMDr9RIMBq0mB4CjYG6RLtzuq16y6iXgKZnspAu4WsvZckoAH5UEyQEaAM7vCeSCcgVcASAT+OWOQQ4oNzUlgBqBz0mXE7XoFfCUYi+rTaiHwDLpldKOXgBLWNeRIjLKm+RBPZD0SNInkj5U+svVW5LelHQl6aXSX672Jf0o6SfDMP6pNP6/QZPF1Du0/sIAAAAASUVORK5CYII=";
const closeButtonBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAERSURBVHgBtdjLDYMwEEXRUSqhY+gg0xElUAIlvOAAwkEEPJ93JVaM47OJsCyyBaBbnhFrvZAreyzPvDxT2fv8stte1L2FVPnt014H6g+GhrrA/KJuMOmoG8zeWIZmPBdGNWC+lcEBbblRrZhi2Rdo4wIzyoDR88J0lBvDQIUxmag0TAYqHRNB0TAeFNgYB4qPSUapZBZEqTByolSYGVEqxl5iD6RZe2j/a9dxTp5ODAcVxOSikjA5KANGQTzkmTHVGg4KgQ9lOgoJX+00FBKPEGEUCOcZNwrEw5UZhfUWgoJxoHppHFQJ1oiay+DIxhhQ09N1jEpyN6gJD3dEKqQuUAemGtpR5XpmEHI4bl3GGvMBHUHk6KgoFgEAAAAASUVORK5CYII=";
let MAX_RATIO = 10_000;
let B = Big();
B.DP = 60; // set precision to 60 decimals
const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals));
};
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
const { showModal, closeModal, selectedTokenId, selectedTokenMeta } = props;
const {
  assets,
  rewards,
  balances,
  account,
  amount,
  hasError,
  hasHFError,
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
const [availableBalance, availableBalance$, remainBalance] =
  computeAdjustMaxAmount();
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/** modal */}
    <Modal style={{ display: showModal ? "block" : "none" }}>
      <div class="modal-header">
        <div class="title">Adjust Collateral</div>
        <img
          class="btn-close-custom"
          src={closeButtonBase64}
          onClick={closeModal}
        />
      </div>
      <div class="modal-body">
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
      </div>
    </Modal>
    <Backdrop
      style={{ display: showModal ? "block" : "none" }}
      onClick={closeModal}
    ></Backdrop>
  </Container>
);
