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
  const tokenIds = assets.map(([id]) => id);

  const assetsDetailed = tokenIds.map((token_id) =>
    Near.view("contract.main.burrow.near", "get_asset", { token_id })
  );

  const metadata = tokenIds.map((token_id) =>
    Near.view(token_id, "ft_metadata")
  );

  const config = Near.view("contract.main.burrow.near", "get_config");
  const prices = Near.view(config["oracle_account_id"], "get_price_data");

  const refPricesResponse = fetch(
    "https://raw.githubusercontent.com/NearDeFi/token-prices/main/ref-prices.json"
  );
  const refPrices = JSON.parse(refPricesResponse.body);

  return assetsDetailed.map((asset, i) => {
    const price = prices.prices.find((p) => p.asset_id === asset.token_id);
    const decimals = parseInt(price.price.decimals) - metadata[i].decimals;
    const usd = price.price.multiplier / power(10, decimals);

    return {
      ...asset,
      metadata: metadata[i],
      price: {
        ...price.price,
        usd: usd ? usd : refPrices[asset.token_id].price,
      },
    };
  });
}

const assets = getAssets();
console.log(assets);

const allAssets = assets.map((asset) => (
  <li>
    <span>{asset.metadata.symbol}</span>
  </li>
));

return (
  <ul>
    <h4>Assets</h4>
    {allAssets}
  </ul>
);
