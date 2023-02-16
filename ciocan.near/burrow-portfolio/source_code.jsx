let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const toAPY = (v) => Math.round(v * 100) / 100;

const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};

const { assets, rewards, account } = state;

const hasData = assets.length > 0 && rewards.length > 0 && account;

const onLoad = (data) => {
  State.update(data);
};

const suppliedAssets = hasData
  ? account.supplied.map((suppliedAsset) => {
      const asset = assets.find((a) => a.token_id === suppliedAsset.token_id);
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;
      const deposited = Number(shrinkToken(suppliedAsset.balance, decimals));
      const usd = (deposited * asset.price.usd).toFixed(2);

      return (
        <tr>
          <td>{asset.metadata.symbol}</td>
          <td class="text-end">{toAPY(totalApy)}%</td>
          <td class="text-end">{deposited.toFixed(6)}</td>
          <td class="text-end">${usd}</td>
        </tr>
      );
    })
  : undefined;

const borrowedAssets = hasData
  ? account.borrowed.map((borrowedAsset) => {
      const asset = assets.find((a) => a.token_id === borrowedAsset.token_id);
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;
      const borrowed = Number(shrinkToken(borrowedAsset.balance, decimals));
      const usd = (borrowed * asset.price.usd).toFixed(2);

      return (
        <tr>
          <td>{asset.metadata.symbol}</td>
          <td class="text-end">{toAPY(totalApy)}%</td>
          <td class="text-end">{borrowed.toFixed(6)}</td>
          <td class="text-end">${usd}</td>
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
        <tr
          style={{
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <th scope="col">Deposited Assets</th>
          <th scope="col" class="text-end">
            APY
          </th>
          <th scope="col" class="text-end">
            Deposited
          </th>
          <th scope="col" class="text-end">
            $
          </th>
        </tr>
      </thead>
      <tbody>{suppliedAssets}</tbody>
    </table>

    <table class="table">
      <thead>
        <tr
          style={{
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <th scope="col">Borrowed Assets</th>
          <th scope="col" class="text-end">
            APY
          </th>
          <th scope="col" class="text-end">
            Deposited
          </th>
          <th scope="col" class="text-end">
            $
          </th>
        </tr>
      </thead>
      <tbody>{borrowedAssets}</tbody>
    </table>
  </div>
);
