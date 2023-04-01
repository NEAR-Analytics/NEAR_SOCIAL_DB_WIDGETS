const Container = styled.div`
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
    .table.click tbody tr{
      cursor:pointer;
    }
     .table.click tbody tr:hover{
        background: rgba(0, 0, 0, 0.1);
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
    .text_red_color{
      color:#FF6BA9;
    }
    .ml_4_ne{
        margin-left:-4px;
    }
`;
let accountId = context.accountId;
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const nFormat = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
const wnearbase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRYhbWYTUtjVxjH/9fRaFBaK3Q0ahCE3HTR0kWLL0g72nEh6NaAL+BivkIXHUpblWr9Ai78CIKgQqC1xYJNVnWwdiFCF9OS4CRRM2o7TRyw+XWRJk2uebuJ/uFC7jnP89xfzrnPOee5hmwIqJc0LOmxpA8keSW1SnpD0p+SLiT9JumZpF1Je4Zh3Nh5RiUQHcAKEMWeov/5td8FRBPwFZCwCWFVAvgCaKwWxAsc1ghh1RHwrl2QR8DlHYNk9BcwWinIMJC8J5CMEsDH5UDeAa7uGSSjC8DMfb6RA9Ik6WdJ79ma09r0q6R+wzBeS1JdTsdnhUACgYA8Ho8cDofGx8d1fn5u62mrq6tyuVwyTVPBYNDa/b6kT/NaSK8jBdPX4/EgKXsNDQ1xfX1d0Tz4/f48X9M0C5n9DTzMhVkpFjA3WOaam5srCxKPx+ns7LzlW0TLGZB6IGIHRhIrK0X5AZiZmSnoV0RRoF7AaKmguYFmZ2ezv+vq6tja2iros7m5iSSamppYWlqqBAZgRMA3lcJEo1Gmpqay9y0tLRwe5i/SZ2dntLe309bWxt7eHuFwuFKYrwX8UClMLBYjkUjQ19eXbevp6SEa/X//9Pl89Pb2cnx8DGAH5jsBf9iBATg5OaGrqyvbPjg4SDKZJBQKMTo6yunpadbfBsxzkd4rbMEAHBwc0NzcnO3z+XykUqlb/jZgrgTcVAMDsLGxgWEY2f7l5eVaYG6qHpmM5ufns/2GYbC+vl4tzJWA32uBSaVSTE9PZ22cTif7+/vVwDwX8H01MJFIhJGRESKRyK0Mc7vdRCIRuzDf1il9eLalo6MjDQwMqLu7Wx0dHXI6ndre3pbb7ZYkhcNhTUxMKJFI2An7TMBjOyOzu7tLa2srLpeLeDyeZ2vNsMnJSUKhUKUjM2xrb1pYWMDhcCAJv99f0N6aYdY9qoheAA8k2d+1nzx5Uuofsri4WHSDLaKl7GQB7RQ5z1iDud1uLi9Ln9WtGVYG5hXwdt7bA3xZyNI0zbx1ZGdnpyRIRslkkv7+/jwQr9dbyPTprVcZaKRAnRQIBDBNE5fLxdraWkUgGcViMcbGxmhoaMDr9RIMBq0mB4CjYG6RLtzuq16y6iXgKZnspAu4WsvZckoAH5UEyQEaAM7vCeSCcgVcASAT+OWOQQ4oNzUlgBqBz0mXE7XoFfCUYi+rTaiHwDLpldKOXgBLWNeRIjLKm+RBPZD0SNInkj5U+svVW5LelHQl6aXSX672Jf0o6SfDMP6pNP6/QZPF1Du0/sIAAAAASUVORK5CYII=";
const toAPY = (v) => Math.round(v * 100) / 100;
// get all assets data from burrow contracts
const { assets, rewards, account, balances, yourSuppliedUSD, yourBurrowedUSD } =
  state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
const onLoad = (data) => {
  State.update(data);
};
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
// get market can burrow assets
const can_burrow_assets = assets && assets.filter((a) => a.config.can_borrow);
const market_burrow_assets =
  can_burrow_assets &&
  can_burrow_assets.map((asset) => {
    const { token_id, metadata } = asset;
    const r = rewards.find((a) => a.token_id === asset.token_id);
    const borrowApy = r.apyBaseBorrow;
    const liquidity = nFormat(asset.availableLiquidity, 2);
    const hasRewards = rewardsMap[token_id] && assetsMap[token_id];
    const rewardMap = hasRewards && rewardsMap[token_id];
    const rewardTokens = rewardMap && rewardMap.rewardTokensBorrow;
    const rewardTokensImg =
      rewardTokens &&
      rewardTokens.map((token_id, index) => {
        const metadata = assetsMap[token_id].metadata;
        return (
          <img
            class={`rewardIcon ${index > 0 ? "ml_4_ne" : ""}`}
            src={metadata.icon}
          ></img>
        );
      });
    return (
      <tr>
        <td>
          <img src={metadata.icon || wnearbase64} class="tokenIcon"></img>
          {metadata.symbol}
        </td>
        <td>{toAPY(borrowApy)}%</td>
        <td>{rewardTokensImg}</td>
        <td class="text-end">{liquidity}</td>
      </tr>
    );
  });
console.log("000000000000-market_burrow_assets", can_burrow_assets);

return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* market */}
    <div class="fw-bold text-white mt-3">
      <span class="text_red_color">Borrow</span> Market
    </div>
    <table class="table click">
      <thead>
        <tr>
          <th scope="col" width="25%">
            Assets
          </th>
          <th scope="col" class="text-start" width="25%">
            APY
          </th>
          <th scope="col" class="text-start" width="25%">
            Rewards
          </th>
          <th scope="col" class="text-end">
            Total Liquidity
          </th>
        </tr>
      </thead>
      <tbody>{market_burrow_assets}</tbody>
    </table>
  </Container>
);
