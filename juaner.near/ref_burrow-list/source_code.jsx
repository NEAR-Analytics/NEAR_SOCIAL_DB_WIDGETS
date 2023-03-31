const toAPY = (v) => Math.round(v * 100) / 100;

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

const { assets, rewards } = state;

const hasData = assets.length > 0 && rewards.length > 0;

const onLoad = (data) => {
  State.update(data);
};

const allAssets = hasData
  ? assets.map((asset) => {
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const depositApy = r.apyBase + r.apyRewardTvl + r.apyReward;
      const borrowApy = r.apyBaseBorrow;
      const liquidity = nFormat(asset.availableLiquidity, 2);
      return (
        <tr>
          <td>{asset.metadata.symbol}</td>
          <td class="text-end">{toAPY(depositApy)}%</td>
          <td class="text-end">{toAPY(borrowApy)}%</td>
          <td class="text-end">{liquidity}</td>
        </tr>
      );
    })
  : undefined;

return (
  <div>
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <table class="table">
      <thead>
        <tr
          style={{
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <th scope="col">Asset</th>
          <th scope="col" class="text-end">
            APY
          </th>
          <th scope="col" class="text-end">
            APY (borrow)
          </th>
          <th scope="col" class="text-end">
            Liquidity
          </th>
        </tr>
      </thead>
      <tbody>{allAssets}</tbody>
    </table>
  </div>
);
