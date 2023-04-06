const toAPY = (v) => Math.round(v * 100) / 100;

const NEAR_LOGO = `data:image/svg+xml,%3Csvg width='35' height='35' fill='none' xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv' focusable='false' aria-hidden='true' viewBox='0 0 35 35' style='width: 35px; height: 35px; filter: invert(100%25);'%3E%3Ccircle cx='17.5' cy='17.5' r='17.5' fill='%23fff'%3E%3C/circle%3E%3Cpath d='m24.027 9.022-4.174 6.2c-.288.422.267.934.666.578l4.107-3.578c.111-.089.266-.022.266.134v11.177c0 .156-.2.223-.288.111L12.174 8.756A2.053 2.053 0 0 0 10.552 8h-.444C8.954 8 8 8.956 8 10.133v15.734C8 27.044 8.954 28 10.131 28a2.14 2.14 0 0 0 1.82-1.022l4.173-6.2c.289-.422-.266-.934-.666-.578l-4.106 3.556c-.111.088-.267.022-.267-.134V12.467c0-.156.2-.223.289-.111l12.43 14.888c.4.49 1 .756 1.621.756h.444A2.133 2.133 0 0 0 28 25.867V10.133A2.133 2.133 0 0 0 25.869 8a2.15 2.15 0 0 0-1.842 1.022Z' fill='%23000'%3E%3C/path%3E%3C/svg%3E`;

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
      const icon = asset.metadata.icon || NEAR_LOGO;

      return (
        <tr>
          <td>
            <img src={icon} style={{ width: 24, marginRight: 10 }} />
            <span>{asset.metadata.symbol}</span>
          </td>
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
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
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
