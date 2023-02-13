const toAPY = (v) => Math.round(v * 100) / 100;

const { assets, rewards } = state;

const hasData = assets.length > 0 && rewards.length > 0;

const onLoad = (data) => {
  State.update(data);
};

const allAssets = hasData
  ? assets.map((asset) => {
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;
      console.log(asset);
      const liquidity = asset.availableLiquidity;
      return (
        <tr>
          <td>{asset.metadata.symbol}</td>
          <td class="text-end">{toAPY(totalApy)}%</td>
          <td class="text-end">{liquidity}</td>
        </tr>
      );
    })
  : undefined;

return (
  <div>
    {!hasData && (
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
    )}
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Asset</th>
          <th scope="col" class="text-end">
            APY
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
