const Container = styled.div`
    width:100%;
    .box_tabel{
      border-radius: 12px;
      background: #1A2E33;
      padding:20px;
    }
    .title {
        font-weight: 700;
        font-size: 18px;
        color:#fff;
    }
    .title_top {
      font-weight: 700;
      font-size: 20px;
      color:#fff;
    }
    .table{
        margin:0;
        border-bottom:2px solid rgba(48, 67, 82, 0.5);
    }
    .table thead tr{
        height:50px;
        border:hidden;
    }
    .table tbody tr{
        height:50px;
    }
    .table th{
        color: #7E8A93;
        font-size:14px;
        vertical-align: middle;
    }
    .table td{
        color: #fff;
        font-size:14px;
        vertical-align: middle;
        border: none;
    }
    .mt_16{
      margin-top:16px;
    }
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
    .text_grey_color{
      color:#7E8A93;
    }
    .text_green_color{
      color:#78FF9E;
    }
    .text_red_color{
      color:#FF6BA9;
    }
    .ml_4_ne{
        margin-left:-4px;
    }
    .mr_10{
      margin-right:10px;
    }
    .topArea{
        padding:0 25px 38px 25px;
    }
    .flexContainer{
        display:flex;
        align-items:center;
        margin-top:12px;
    }
    .block{
        display:flex;
        flex-direction:column;
        border-right:2px solid rgba(48, 67, 82, 0.5);
        padding-right:30px;
        margin-right:30px;
    }
    .block .t{
        font-size:14px;
        color:#7E8A93;
    }
    .block .v{
        font-weight: 700;
        font-size: 26px;
        color:#fff;
    }
    .noBorder {
        border:none!important;
    }
    .mt_26{
        margin-top:26px;
    }
    .flex_center{
      display:flex;
      align-items:center;
    }

    .claim_button{
      display:flex;
      align-items:center;
      justify-content:center;
      height:26px;
      background: #304352;
      border-radius: 6px;
      margin-left:16px;
      font-size:12px;
      color:#fff;
      cursor:pointer;
      padding:0 12px 0 12px;
    }
`;
const wnearbase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRYhbWYTUtjVxjH/9fRaFBaK3Q0ahCE3HTR0kWLL0g72nEh6NaAL+BivkIXHUpblWr9Ai78CIKgQqC1xYJNVnWwdiFCF9OS4CRRM2o7TRyw+XWRJk2uebuJ/uFC7jnP89xfzrnPOee5hmwIqJc0LOmxpA8keSW1SnpD0p+SLiT9JumZpF1Je4Zh3Nh5RiUQHcAKEMWeov/5td8FRBPwFZCwCWFVAvgCaKwWxAsc1ghh1RHwrl2QR8DlHYNk9BcwWinIMJC8J5CMEsDH5UDeAa7uGSSjC8DMfb6RA9Ik6WdJ79ma09r0q6R+wzBeS1JdTsdnhUACgYA8Ho8cDofGx8d1fn5u62mrq6tyuVwyTVPBYNDa/b6kT/NaSK8jBdPX4/EgKXsNDQ1xfX1d0Tz4/f48X9M0C5n9DTzMhVkpFjA3WOaam5srCxKPx+ns7LzlW0TLGZB6IGIHRhIrK0X5AZiZmSnoV0RRoF7AaKmguYFmZ2ezv+vq6tja2iros7m5iSSamppYWlqqBAZgRMA3lcJEo1Gmpqay9y0tLRwe5i/SZ2dntLe309bWxt7eHuFwuFKYrwX8UClMLBYjkUjQ19eXbevp6SEa/X//9Pl89Pb2cnx8DGAH5jsBf9iBATg5OaGrqyvbPjg4SDKZJBQKMTo6yunpadbfBsxzkd4rbMEAHBwc0NzcnO3z+XykUqlb/jZgrgTcVAMDsLGxgWEY2f7l5eVaYG6qHpmM5ufns/2GYbC+vl4tzJWA32uBSaVSTE9PZ22cTif7+/vVwDwX8H01MJFIhJGRESKRyK0Mc7vdRCIRuzDf1il9eLalo6MjDQwMqLu7Wx0dHXI6ndre3pbb7ZYkhcNhTUxMKJFI2An7TMBjOyOzu7tLa2srLpeLeDyeZ2vNsMnJSUKhUKUjM2xrb1pYWMDhcCAJv99f0N6aYdY9qoheAA8k2d+1nzx5Uuofsri4WHSDLaKl7GQB7RQ5z1iDud1uLi9Ln9WtGVYG5hXwdt7bA3xZyNI0zbx1ZGdnpyRIRslkkv7+/jwQr9dbyPTprVcZaKRAnRQIBDBNE5fLxdraWkUgGcViMcbGxmhoaMDr9RIMBq0mB4CjYG6RLtzuq16y6iXgKZnspAu4WsvZckoAH5UEyQEaAM7vCeSCcgVcASAT+OWOQQ4oNzUlgBqBz0mXE7XoFfCUYi+rTaiHwDLpldKOXgBLWNeRIjLKm+RBPZD0SNInkj5U+svVW5LelHQl6aXSX672Jf0o6SfDMP6pNP6/QZPF1Du0/sIAAAAASUVORK5CYII=";
let accountId = context.accountId;
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const toAPY = (v) => Math.round(v * 100) / 100;
const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};
// get all assets data from burrow contracts
const { assets, rewards, account, balances, yourSuppliedUSD, yourBurrowedUSD } =
  state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
const rewardsMap = rewards
  ? rewards.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
const assetsMap = assets
  ? assets.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
const onLoad = (data) => {
  State.update(data);
};
// get unclaimed rewards
const unclaimedRewardsMap = account
  ? account.farms?.reduce((prev, curr) => {
      for (const reward of curr.rewards) {
        const t = prev[reward.reward_token_id];
        if (t) {
          prev[reward.reward_token_id] = Big(t)
            .plus(Big(reward.unclaimed_amount))
            .toFixed();
        } else {
          prev[reward.reward_token_id] = Big(reward.unclaimed_amount).toFixed();
        }
      }
      return prev;
    }, {})
  : {};

const unclaimedRewards = Object.keys(unclaimedRewardsMap).map((id) => {
  const asset = assets.find((a) => a.token_id === id);
  const decimals = asset.metadata.decimals + asset.config.extra_decimals;
  return {
    id,
    unclaimed: shrinkToken(unclaimedRewardsMap[id], decimals, 4),
    symbol: asset.metadata.symbol,
    icon: asset.metadata.icon,
  };
});

const handleClaimAll = () => {
  Near.call({
    contractName: "contract.main.burrow.near",
    methodName: "account_farm_claim_all",
  });
};
const depositedAssets = hasData
  ? new Set([
      ...account.supplied.map((a) => a.token_id),
      ...account.collateral.map((a) => a.token_id),
    ])
  : new Set();
// get portfolio deposited assets
let total_supplied_usd = Big(0);
const suppliedAssets = hasData
  ? [...depositedAssets].map((depositedTokenId) => {
      const asset = assets.find((a) => a.token_id === depositedTokenId);

      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;

      const supplied = account.supplied.find(
        (s) => s.token_id === depositedTokenId
      );

      const depositedBalance = supplied
        ? Number(shrinkToken(supplied.balance, decimals))
        : 0;

      const collateral = account.collateral.find(
        (c) => c.token_id === depositedTokenId
      );

      const collateralBalance = collateral
        ? Number(shrinkToken(collateral.balance, decimals))
        : 0;

      const totalBalance = depositedBalance + collateralBalance;
      const usd = totalBalance * asset.price.usd;
      total_supplied_usd = total_supplied_usd.plus(usd);

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
            {totalBalance.toFixed(4)}
            <span class="text_grey_color">(${usd.toFixed(2)})</span>
          </td>
        </tr>
      );
    })
  : undefined;

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
            {borrowed.toFixed(4)}
            <span class="text_grey_color">(${usd.toFixed(2)})</span>
          </td>
        </tr>
      );
    })
  : undefined;

if (total_supplied_usd.gt(0)) {
  State.update({
    yourSuppliedUSD: total_supplied_usd.lt(0.01)
      ? "<$0.01"
      : "$" + total_supplied_usd.toFixed(2),
  });
}
if (total_burrowed_usd.gt(0)) {
  State.update({
    yourBurrowedUSD: total_burrowed_usd.lt(0.01)
      ? "<$0.01"
      : "$" + total_burrowed_usd.toFixed(2),
  });
}
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* Your Lending */}
    <div class="topArea">
      <div class="title_top">Yous</div>
      <div class="flexContainer">
        <div class="block">
          <label class="t">Supplied</label>
          <span class="v">{yourSuppliedUSD || "$0"}</span>
        </div>
        <div class="block noBorder">
          <label class="t">Borrowed</label>
          <span class="v">{yourBurrowedUSD || "$0"}</span>
        </div>
      </div>
      <div class="block mt_26 noBorder">
        <label class="t">Unclaimed Rewards</label>
        <div>
          <div class="flex_center">
            {unclaimedRewards.length > 0 ? (
              <>
                {unclaimedRewards.map((reward) => (
                  <div class="flex_center">
                    <span class="v mr_10">{reward.unclaimed}</span>
                    <img src={reward.icon} class="rewardIcon"></img>
                  </div>
                ))}
                <div class="claim_button" onClick={handleClaimAll}>
                  Claim
                </div>
              </>
            ) : (
              <span class="v mr_10">0</span>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* supply area */}
    <div class="box_tabel">
      {/*yours */}
      <div class="title">You Supplied</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="25%">
              Assets
            </th>
            <th scope="col" class="text-start" width="25%">
              Supply APY
            </th>
            <th scope="col" class="text-start">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>{suppliedAssets}</tbody>
      </table>
      {/*market */}
      <Widget src="juaner.near/widget/ref-market-supply-assets" />
    </div>
    {/* burrow area */}
    <div class="box_tabel mt_16">
      {/* yours */}
      <div class="title">You Borrowed</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="25%">
              Assets
            </th>
            <th scope="col" class="text-start" width="25%">
              Borrow APY
            </th>
            <th scope="col" class="text-start">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>{borrowedAssets}</tbody>
      </table>
      {/*market */}
      <Widget src="juaner.near/widget/ref-market-burrow-assets" />
    </div>
  </Container>
);
