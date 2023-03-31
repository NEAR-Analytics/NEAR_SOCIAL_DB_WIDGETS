let accountId = context.accountId;

if (!accountId) {
  return <Widget src="ciocan.near/widget/account-signin" />;
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

const depositedAssets = hasData
  ? new Set([
      ...account.supplied.map((a) => a.token_id),
      ...account.collateral.map((a) => a.token_id),
    ])
  : new Set();

// get portfolio deposited assets
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

      return (
        <tr>
          <td>{asset.metadata.symbol}</td>
          <td class="text-end">{toAPY(totalApy)}%</td>
          <td class="text-end">{totalBalance.toFixed(4)}</td>
          <td class="text-end">${usd.toFixed(2)}</td>
        </tr>
      );
    })
  : undefined;

// get portfolio borrowed assets
const borrowedAssets = hasData
  ? account.borrowed.map((borrowedAsset) => {
      const asset = assets.find((a) => a.token_id === borrowedAsset.token_id);
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBaseBorrow;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;
      const borrowed = Number(shrinkToken(borrowedAsset.balance, decimals));
      const usd = borrowed * asset.price.usd;

      // if (usd < 0.01) return null;

      return (
        <tr>
          <td>{asset.metadata.symbol}</td>
          <td class="text-end">{toAPY(totalApy)}%</td>
          <td class="text-end">{borrowed.toFixed(4)}</td>
          <td class="text-end">${usd.toFixed(2)}</td>
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
            Borrowed
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
