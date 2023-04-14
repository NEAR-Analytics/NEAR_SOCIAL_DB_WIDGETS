const test = fetch("https://api.coingecko.com/api/v3/coins/near", {
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

return (
  <div>
    <div class="d-flex flex-row">
      <div class="p-2">
        <div>NEAR/USD</div>
        <h3>
          ${test.body.market_data.current_price.usd}
          <small
            class={
              test.body.market_data.price_change_percentage_24h_in_currency
                .usd < 0
                ? "text-danger"
                : "text-success"
            }
            style={{ "font-size": "12px" }}
          >
            {test.body.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
              2
            )}
            %
          </small>
        </h3>
      </div>
      <div class="p-2">
        ATH
        <p class="text-success">${test.body.market_data.ath.usd.toFixed(2)}</p>
      </div>
      <div class="p-2">
        24h high
        <p>${test.body.market_data.high_24h.usd.toFixed(2)}</p>
      </div>
      <div class="p-2">
        24h low
        <p>${test.body.market_data.low_24h.usd.toFixed(2)}</p>
      </div>
      <div class="p-2">
        Market Cap
        <p>
          $
          {test.body.market_data.market_cap.usd
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
      <div class="p-2">
        Volume
        <p>
          $
          {test.body.market_data.total_volume.usd
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
      <div class="p-2">
        Circulating Supply
        <p>
          $
          {test.body.market_data.circulating_supply
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
    </div>
    <div>
      <div class="blockquote p-2">
        <p class="blockquote-footer">
          <small>
            the pricing information is kindly provided by{" "}
            <a
              target="_blank"
              style={{ color: "inherit" }}
              variant="caption"
              rel="nofollow"
              href="https://www.coingecko.com/en/api_terms"
            >
              CoinGecko
            </a>
          </small>
          <br />
          <small>
            widget sponsored by{" "}
            <a
              target="_blank"
              style={{ color: "inherit" }}
              variant="caption"
              rel="nofollow"
              href="https://www.nearweek.com"
            >
              NEARWEEK
            </a>
          </small>
        </p>
      </div>
    </div>
  </div>
);
