const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const toAPY = (v) => Math.round(v * 100) / 100;

const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};

const toUsd = (balance, asset) =>
  asset?.price?.usd
    ? Number(
        shrinkToken(
          balance,
          asset.metadata.decimals + asset.config.extra_decimals
        )
      ) * asset.price.usd
    : 0;

const sumReducer = (sum, a) => sum + a;

function power(x, y) {
  if (y === 0) {
    return 1;
  } else if (y % 2 === 0) {
    return power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  } else {
    return x * power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  }
}

function getAssets() {
  const assets = Near.view("contract.main.burrow.near", "get_assets_paged");
  if (!assets) return null;
  const tokenIds = assets?.map(([id]) => id);
  const assetsDetailed = tokenIds.map((token_id) =>
    Near.view("contract.main.burrow.near", "get_asset", { token_id })
  );
  const metadata = tokenIds?.map((token_id) =>
    Near.view(token_id, "ft_metadata")
  );

  const config = Near.view("contract.main.burrow.near", "get_config");
  const prices =
    config && Near.view(config?.["oracle_account_id"], "get_price_data");

  const refPricesResponse = fetch(
    "https://raw.githubusercontent.com/NearDeFi/token-prices/main/ref-prices.json"
  );
  const refPrices = JSON.parse(refPricesResponse.body);

  if (!config || !prices || !refPricesResponse) return null;

  return assetsDetailed?.map((asset, i) => {
    const price = prices?.prices?.find((p) => p.asset_id === asset?.token_id);
    const decimals =
      parseInt(price?.price?.decimals || 0) - parseInt(metadata?.[i].decimals);
    const usd = price?.price?.multiplier / power(10, decimals);

    return {
      ...asset,
      metadata: metadata?.[i],
      price: {
        ...price.price,
        usd: usd ? usd : parseFloat(refPrices?.[asset.token_id]?.price),
      },
    };
  });
}

// ------ rewards ------
const getTotalBalance = (assets, source) =>
  assets
    .map((asset) => {
      const netTvlMultiplier = asset.config.net_tvl_multiplier / 10000;
      return (
        toUsd(asset[source].balance, asset) * netTvlMultiplier +
        (source === "supplied"
          ? toUsd(asset.reserved, asset) * netTvlMultiplier
          : 0)
      );
    })
    .reduce(sumReducer, 0);

const getNetLiquidityAPY = (assets) => {
  const netLiquidityFarm = Near.view(
    "contract.main.burrow.near",
    "get_asset_farm",
    { farm_id: "NetTvl" }
  );

  if (!netLiquidityFarm) return null;

  const totalDailyNetLiquidityRewards = Object.entries(netLiquidityFarm.rewards)
    .map(([rewardTokenId, farm]) => {
      const rewardAsset = assets.find((a) => a.token_id === rewardTokenId);
      const assetDecimals =
        rewardAsset.metadata.decimals + rewardAsset.config.extra_decimals;
      const dailyAmount = Number(
        shrinkToken(farm.reward_per_day, assetDecimals)
      );
      return (
        dailyAmount *
        rewardAsset.price.usd *
        (rewardAsset.config.net_tvl_multiplier / 10000)
      );
    })
    .reduce(sumReducer, 0);

  const supplied = getTotalBalance(assets, "supplied");
  const borrowed = getTotalBalance(assets, "borrowed");

  const totalProtocolLiquidity = supplied - borrowed;
  const netLiquidtyAPY =
    ((totalDailyNetLiquidityRewards * 365) / totalProtocolLiquidity) * 100;

  const rewardTokens = Object.entries(netLiquidityFarm.rewards).map(
    ([rewardTokenId]) => rewardTokenId
  );

  return [netLiquidtyAPY, rewardTokens];
};

const getRewards = (assets) => {
  const [apyRewardTvl, rewardTokensTVL] = getNetLiquidityAPY(assets);

  const rewards = assets.map((asset) => {
    const apyBase = asset["supply_apr"] * 100;
    const apyBaseBorrow = asset["borrow_apr"] * 100;
    const tokenId = asset.token_id;
    const totalSupplyUsd = toUsd(asset.supplied.balance, asset);
    const totalBorrowUsd = toUsd(asset.borrowed.balance, asset);

    const suppliedFarmRewards =
      asset.farms.find((farm) => farm.farm_id.Supplied === tokenId)?.rewards ||
      {};

    const rewardTokens = Object.entries(suppliedFarmRewards)
      .map(([rewardTokenId]) => rewardTokenId)
      .concat(rewardTokensTVL)
      .filter(unique);

    const apyRewards = Object.entries(suppliedFarmRewards).map(
      ([rewardTokenId, reward]) => {
        const rewardAsset = assets.find((a) => a.token_id === rewardTokenId);
        const decimals =
          rewardAsset.metadata.decimals + rewardAsset.config.extra_decimals;
        const price = rewardAsset.price?.usd || 0;
        return (
          new Big(reward.reward_per_day)
            .div(new Big(10).pow(decimals))
            .mul(365)
            .mul(price)
            .div(totalSupplyUsd)
            .mul(100)
            .toNumber() || 0
        );
      }
    );

    const apyReward = apyRewards.reduce(sumReducer, 0);

    const borrowedFarmRewards =
      asset.farms.find((farm) => farm.farm_id.Borrowed === tokenId)?.rewards ||
      {};

    const rewardTokensBorrow = Object.entries(borrowedFarmRewards).map(
      ([rewardTokenId]) => rewardTokenId
    );

    const apyRewardBorrow = Object.entries(borrowedFarmRewards)
      .map(([rewardTokenId, reward]) => {
        const rewardAsset = assets.find((a) => a.token_id === rewardTokenId);
        const decimals =
          rewardAsset.metadata.decimals + rewardAsset.config.extra_decimals;
        const price = rewardAsset.price?.usd || 0;

        if (!totalBorrowUsd) return 0;

        return (
          new Big(reward.reward_per_day)
            .div(new Big(10).pow(decimals))
            .mul(365)
            .mul(price)
            .div(totalBorrowUsd)
            .mul(100)
            .toNumber() || 0
        );
      })
      .reduce(sumReducer, 0);

    return {
      token_id: asset.token_id,
      chain: "NEAR",
      project: "Burrow",
      symbol: asset.metadata.symbol,
      tvlUsd: totalSupplyUsd - totalBorrowUsd,
      apyReward,
      apyRewardTvl,
      apyBase,
      rewardTokens,
      totalSupplyUsd,
      totalBorrowUsd,
      apyBaseBorrow,
      apyRewardBorrow,
      rewardTokensBorrow,
      ltv: asset.config.volatility_ratio,
    };
  });

  return rewards;
};

const assets = getAssets();
if (!assets.length || !assets[0]) return <div>loading...</div>;
// console.log(assets);
const rewards = getRewards(assets);
// console.log(rewards);

const allAssets = assets.map((asset) => {
  const r = rewards.find((a) => a.token_id === asset.token_id);
  return (
    <li class="list-group-item">
      <span>{asset.metadata.symbol}</span>
      <span>({toAPY(r.apyBase + r.apyRewardTvl + r.apyReward)}% APY)</span>
    </li>
  );
});

return (
  <div class="card" style={{ maxWidth: "300px" }}>
    <div class="card-body">
      <h4>Burrow supplied assets</h4>
      <ul class="list-group list-group-flush mb-2">{allAssets}</ul>
      <a class="btn btn-primary" href="https://burrow.cash" target="_blank">
        Deposit on Burrow
      </a>
    </div>
  </div>
);
