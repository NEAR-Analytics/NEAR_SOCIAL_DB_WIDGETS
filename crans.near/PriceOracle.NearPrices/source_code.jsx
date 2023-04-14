let keys = props.keys ?? ["wrap.near"];

let price_data = Near.view("priceoracle.near", "get_price_data", {});
if (!price_data) {
  return "";
}

let assets = Near.view("oracle-prices.near", "get_config", { keys });
if (!assets) {
  return "";
}

let price_data_prepared = [];
price_data.prices.map(
  (data) => (price_data_prepared[data.asset_id] = data.price)
);

let prices = assets.map((asset) => {
  let asset_account_id = asset[0];
  let asset_name = asset[1].token_name;
  let asset_decimals = asset[1].decimals;

  let asset_price = price_data_prepared[asset_account_id];
  let price = new Big(asset_price.multiplier).div(
    new Big(10).pow(asset_price.decimals - asset_decimals)
  );

  return (
    <div class="col">
      {asset_name}: ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
    </div>
  );
});

return (
  <div class="container">
    <h5>Priceoracle.near prices</h5>
    <div class="row">{prices}</div>
  </div>
);
