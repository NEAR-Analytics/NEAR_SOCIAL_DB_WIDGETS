const Container = styled.div`
  .tokenIcon{
      width: 26px;
      height: 26px;
      border-radius:100px;
      margin-right:4px;
    }
.rewardIcon{
      width: 16px;
      height: 16px;
      border-radius:100px;
  }
  .flex-end{
      display:flex;
      align-items:center;
      justify-content:end;
      height:50px;
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
      justify-content:center;
      color:#fff;
      font-weight: 700;
      font-size: 18px;
      padding:12px;
      margin-bottom:16px;
      border-bottom:2px solid rgba(48, 67, 82, 0.5);
    } 
    .modal-header .btn-close{
      position:absolute;
      right:28px;
      margin:0;
    }
    .modal-body {
        padding:0 10px;
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
const toAPY = (v) => Math.round(v * 100) / 100;
const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};
const wnearbase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRYhbWYTUtjVxjH/9fRaFBaK3Q0ahCE3HTR0kWLL0g72nEh6NaAL+BivkIXHUpblWr9Ai78CIKgQqC1xYJNVnWwdiFCF9OS4CRRM2o7TRyw+XWRJk2uebuJ/uFC7jnP89xfzrnPOee5hmwIqJc0LOmxpA8keSW1SnpD0p+SLiT9JumZpF1Je4Zh3Nh5RiUQHcAKEMWeov/5td8FRBPwFZCwCWFVAvgCaKwWxAsc1ghh1RHwrl2QR8DlHYNk9BcwWinIMJC8J5CMEsDH5UDeAa7uGSSjC8DMfb6RA9Ik6WdJ79ma09r0q6R+wzBeS1JdTsdnhUACgYA8Ho8cDofGx8d1fn5u62mrq6tyuVwyTVPBYNDa/b6kT/NaSK8jBdPX4/EgKXsNDQ1xfX1d0Tz4/f48X9M0C5n9DTzMhVkpFjA3WOaam5srCxKPx+ns7LzlW0TLGZB6IGIHRhIrK0X5AZiZmSnoV0RRoF7AaKmguYFmZ2ezv+vq6tja2iros7m5iSSamppYWlqqBAZgRMA3lcJEo1Gmpqay9y0tLRwe5i/SZ2dntLe309bWxt7eHuFwuFKYrwX8UClMLBYjkUjQ19eXbevp6SEa/X//9Pl89Pb2cnx8DGAH5jsBf9iBATg5OaGrqyvbPjg4SDKZJBQKMTo6yunpadbfBsxzkd4rbMEAHBwc0NzcnO3z+XykUqlb/jZgrgTcVAMDsLGxgWEY2f7l5eVaYG6qHpmM5ufns/2GYbC+vl4tzJWA32uBSaVSTE9PZ22cTif7+/vVwDwX8H01MJFIhJGRESKRyK0Mc7vdRCIRuzDf1il9eLalo6MjDQwMqLu7Wx0dHXI6ndre3pbb7ZYkhcNhTUxMKJFI2An7TMBjOyOzu7tLa2srLpeLeDyeZ2vNsMnJSUKhUKUjM2xrb1pYWMDhcCAJv99f0N6aYdY9qoheAA8k2d+1nzx5Uuofsri4WHSDLaKl7GQB7RQ5z1iDud1uLi9Ln9WtGVYG5hXwdt7bA3xZyNI0zbx1ZGdnpyRIRslkkv7+/jwQr9dbyPTprVcZaKRAnRQIBDBNE5fLxdraWkUgGcViMcbGxmhoaMDr9RIMBq0mB4CjYG6RLtzuq16y6iXgKZnspAu4WsvZckoAH5UEyQEaAM7vCeSCcgVcASAT+OWOQQ4oNzUlgBqBz0mXE7XoFfCUYi+rTaiHwDLpldKOXgBLWNeRIjLKm+RBPZD0SNInkj5U+svVW5LelHQl6aXSX672Jf0o6SfDMP6pNP6/QZPF1Du0/sIAAAAASUVORK5CYII=";
const closeButtonBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAERSURBVHgBtdjLDYMwEEXRUSqhY+gg0xElUAIlvOAAwkEEPJ93JVaM47OJsCyyBaBbnhFrvZAreyzPvDxT2fv8stte1L2FVPnt014H6g+GhrrA/KJuMOmoG8zeWIZmPBdGNWC+lcEBbblRrZhi2Rdo4wIzyoDR88J0lBvDQIUxmag0TAYqHRNB0TAeFNgYB4qPSUapZBZEqTByolSYGVEqxl5iD6RZe2j/a9dxTp5ODAcVxOSikjA5KANGQTzkmTHVGg4KgQ9lOgoJX+00FBKPEGEUCOcZNwrEw5UZhfUWgoJxoHppHFQJ1oiay+DIxhhQ09N1jEpyN6gJD3dEKqQuUAemGtpR5XpmEHI4bl3GGvMBHUHk6KgoFgEAAAAASUVORK5CYII=";
const {
  assets,
  rewards,
  account,
  balances,
  showModal,
  selectedTokenId,
  selectedTokenMeta,
} = state;
const { onLoadState } = props;
function changeSelectedToken(asset, type) {
  const { token_id, metadata } = asset;
  State.update({
    selectedTokenId: token_id,
    selectedTokenMeta: metadata,
    type,
    showModal: true,
  });
}
function closeModal() {
  State.update({
    showModal: false,
  });
}
const onLoad = (data) => {
  State.update(data);
};

const hasData = assets.length > 0 && rewards.length > 0 && account;
function getPortfolioRewards(type, token_id) {
  const targetFarm = account.farms.find((farm) => {
    return farm["farm_id"][type] == token_id;
  });
  if (targetFarm) {
    const asset = assets.find((a) => a.token_id == token_id);
    const rewards = targetFarm["rewards"] || [];
    const totalRewards =
      type == "Supplied" ? asset.farms[0].rewards : asset.farms[1].rewards;
    const result = rewards.map((reward) => {
      const { reward_token_id } = reward;
      const assetDecimals =
        asset.metadata.decimals + asset.config.extra_decimals;
      const rewardAsset = assets.find((a) => a.token_id == reward_token_id);
      const rewardTokenDecimals =
        rewardAsset.metadata.decimals + rewardAsset.config.extra_decimals;

      const boostedShares = Number(
        shrinkToken(reward.boosted_shares, assetDecimals)
      );
      const totalBoostedShares = Number(
        shrinkToken(totalRewards[reward_token_id].boosted_shares, assetDecimals)
      );
      const totalRewardsPerDay = Number(
        shrinkToken(
          totalRewards[reward_token_id].reward_per_day,
          rewardTokenDecimals
        )
      );
      const rewardPerDay =
        (boostedShares / totalBoostedShares) * totalRewardsPerDay || 0;
      return { rewardPerDay, metadata: asset.metadata };
    });
    return result;
  }
  return [];
}
// get portfolio borrowed assets
let total_burrowed_usd = Big(0);
const borrowedAssets = hasData
  ? account.borrowed.map((borrowedAsset) => {
      const asset = assets.find((a) => a.token_id === borrowedAsset.token_id);
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBaseBorrow;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;
      const borrowed = Number(shrinkToken(borrowedAsset.balance, decimals));
      const usd = borrowed * asset.price.usd;
      total_burrowed_usd = total_burrowed_usd.plus(usd);
      const rewardsList =
        getPortfolioRewards("Supplied", borrowedAsset.token_id) || [];
      return (
        <tr>
          <td>
            <img
              src={asset.metadata.icon || wnearbase64}
              class="tokenIcon"
            ></img>
            {asset.metadata.symbol}
          </td>
          <td class="text-start">{toAPY(totalApy)}%</td>
          <td class="text-start">
            {rewardsList.length == 0
              ? "-"
              : rewardsList.map((reward) => {
                  const { rewardPerDay, metadata } = reward;
                  return (
                    <div class="flex_center">
                      {Big(rewardPerDay).toFixed(4)}
                      <img
                        class="rewardIcon ml_5"
                        src={metadata.icon || wnearbase64}
                      />
                    </div>
                  );
                })}
          </td>
          <td class="text-start">
            {borrowed.toFixed(4)}
            <span class="text_grey_color">(${usd.toFixed(2)})</span>
          </td>
          <td class="flex-end">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  changeSelectedToken(asset, "burrow");
                },
                buttonType: "solid",
                actionName: "Repay",
                hoverOn: true,
              }}
            />
          </td>
        </tr>
      );
    })
  : undefined;
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <div class="title">You Borrowed</div>
    <table class="table click">
      <thead>
        <tr>
          <th scope="col" width="20%">
            Assets
          </th>
          <th scope="col" class="text-start" width="20%">
            Borrow APY
          </th>
          <th scope="col" class="text-start" width="20%">
            Rewards
          </th>
          <th scope="col" class="text-start" width="15%">
            Borrowed
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{borrowedAssets}</tbody>
    </table>
    {/** modal */}
    <Modal style={{ display: showModal ? "block" : "none" }}>
      <div class="modal-header">
        <div class="flex_center">
          <img class="tokenIcon" src={selectedTokenMeta.icon || wnearbase64} />
          {selectedTokenMeta.symbol}
        </div>
        <img
          class="btn-close-custom"
          src={closeButtonBase64}
          onClick={closeModal}
        />
      </div>
      <div class="modal-body">
        <div class="tab">
          <span
            onClick={() => {
              changeTab("borrow");
            }}
            class={`${tabName != "repay" ? "active" : ""}`}
          >
            Borrow
          </span>
          <span
            onClick={() => {
              changeTab("repay");
            }}
            class={`${tabName == "repay" ? "active" : ""}`}
          >
            Repay
          </span>
        </div>
        {tabName == "repay" ? (
          <Widget
            src="juaner.near/widget/ref-market-burrow-repay"
            props={{ selectedTokenId, selectedTokenMeta, showModal }}
          />
        ) : (
          <Widget
            src="juaner.near/widget/ref-market-burrow-burrow"
            props={{ selectedTokenId, showModal }}
          />
        )}
      </div>
    </Modal>
    <Backdrop
      style={{ display: showModal ? "block" : "none" }}
      onClick={closeModal}
    ></Backdrop>
  </Container>
);
