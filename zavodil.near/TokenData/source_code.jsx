const tokenId = props.tokenId;
const network = props.network ?? "NEAR";
const accountId = context.accountId;
const debug = props.debug ?? false;

const NEAR_LOGO = `data:image/svg+xml,%3Csvg width='35' height='35' fill='none' xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv' focusable='false' aria-hidden='true' viewBox='0 0 35 35' style='width: 35px; height: 35px; filter: invert(100%25);'%3E%3Ccircle cx='17.5' cy='17.5' r='17.5' fill='%23fff'%3E%3C/circle%3E%3Cpath d='m24.027 9.022-4.174 6.2c-.288.422.267.934.666.578l4.107-3.578c.111-.089.266-.022.266.134v11.177c0 .156-.2.223-.288.111L12.174 8.756A2.053 2.053 0 0 0 10.552 8h-.444C8.954 8 8 8.956 8 10.133v15.734C8 27.044 8.954 28 10.131 28a2.14 2.14 0 0 0 1.82-1.022l4.173-6.2c.289-.422-.266-.934-.666-.578l-4.106 3.556c-.111.088-.267.022-.267-.134V12.467c0-.156.2-.223.289-.111l12.43 14.888c.4.49 1 .756 1.621.756h.444A2.133 2.133 0 0 0 28 25.867V10.133A2.133 2.133 0 0 0 25.869 8a2.15 2.15 0 0 0-1.842 1.022Z' fill='%23000'%3E%3C/path%3E%3C/svg%3E`;

if (!tokenId) return;

let res;
let balance, metadata;

const getNearNativeBalance = () => {
  const account = fetch("https://rpc.mainnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  });
  if (!account) return;
  else return account?.body?.result?.amount;
};

const getRefPrice = (tokenId) => {
  const refPricesResponse = fetch(
    "https://indexer.ref.finance/list-token-price"
  );
  if (!refPricesResponse) return;
  const refPrices = JSON.parse(refPricesResponse.body);
  return parseFloat(refPrices?.[tokenId]?.price);
};

switch (network) {
  case "NEAR": {
    let refPrice;
    if (tokenId === "NEAR") {
      metadata = {
        name: "NEAR",
        symbol: "NEAR",
        icon: NEAR_LOGO,
        decimals: 24,
      };

      // NATIVE NEAR BALANCE
      balance = getNearNativeBalance();

      // REF PRICE
      refPrice = getRefPrice("wrap.near");
    } else {
      // FT METADATA
      metadata = Near.view(tokenId, "ft_metadata");
      if (!metadata) return;
      metadata.icon = metadata.icon ?? NEAR_LOGO;

      // FT BALANCE
      balance = Near.view(tokenId, "ft_balance_of", {
        account_id: accountId,
      });

      // REF PRICE
      refPrice = getRefPrice(tokenId);
    }
    if (!balance || !refPrice || !metadata) return;

    res = {
      balance,
      balance_hr: new Big(balance)
        .div(new Big(10).pow(metadata.decimals))
        .toFixed(4),
      balance_hr_full: new Big(balance)
        .div(new Big(10).pow(metadata.decimals))
        .toFixed(),
      price: refPrice,
      metadata,
    };

    break;
  }
  case "ETH": {
    break;
  }
}

if (res !== undefined && typeof props.onLoad === "function") {
  props.onLoad(res);
}

return debug ? <>{JSON.stringify(res)}</> : <></>;
