const tokenId = props.tokenId;
const network = props.network ?? "NEAR";
const accountId = context.accountId;
const debug = props.debug ?? false;

if (!tokenId) return;

let res;

switch (network) {
  case "NEAR": {
    // FT METADATA
    const metadata = Near.view(tokenId, "ft_metadata");
    if (!metadata) return;

    // FT BALANCE
    const balance = Near.view(tokenId, "ft_balance_of", {
      account_id: accountId,
    });
    if (!balance) return;

    // REF PRICE
    const refPricesResponse = fetch(
      "https://indexer.ref.finance/list-token-price"
    );
    if (!refPricesResponse) return;
    const refPrices = JSON.parse(refPricesResponse.body);
    const refPrice = parseFloat(refPrices?.[tokenId]?.price);

    res = {
      balance,
      balance_hr: new Big(balance)
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
