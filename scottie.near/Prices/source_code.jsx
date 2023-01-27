let keys = props.keys ?? [
  "wrap.near",
  "aurora",
  "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
  "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
];

let price_data = Near.view("priceoracle.near", "get_price_data", {});
let assets = Near.view("oracle-prices.near", "get_config", { keys });

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
    <div
      class="row"
      style={{ color: "white", padding: "2px", marginLeft: "1px" }}
    >
      {asset_name}USD: ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
    </div>
  );
});

return (
  <div
    class="container"
    style={{
      background: "black",
      borderRadius: "12px",
      // margin: "1px",
      // padding: "2px",
    }}
  >
    <h5 style={{ color: "white" }}>Asset prices</h5>
    <div>{prices}</div>
  </div>
);
