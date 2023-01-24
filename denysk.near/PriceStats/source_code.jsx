const data = fetch("https://api.coingecko.com/api/v3/coins/near", {
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

return (
  <div className="text-bg-light rounded-4 p-3 mb-3">
    {data !== null ? (
      <div>
        <div class="d-flex flex-sm-row flex-column">
          <div class="mr-auto p-2">
            <div>NEAR/USD</div>
            <h3>
              ${data.body.market_data.current_price.usd}
              <small
                class={
                  data.body.market_data.price_change_percentage_24h_in_currency
                    .usd < 0
                    ? "text-danger"
                    : "text-success"
                }
                style={{ "font-size": "12px" }}
              >
                {data.body.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                  2
                )}
                %
              </small>
            </h3>
          </div>
          <div class="mr-auto p-2">
            ATH
            <p class="text-success">
              ${data.body.market_data.ath.usd.toFixed(2)}
            </p>
          </div>
          <div class="mr-auto p-2">
            24h high
            <p>${data.body.market_data.high_24h.usd.toFixed(2)}</p>
          </div>
          <div class="p-2">
            24h low
            <p>${data.body.market_data.low_24h.usd.toFixed(2)}</p>
          </div>
          <div class="p-2">
            Market Cap
            <p>
              $
              {data.body.market_data.market_cap.usd
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div class="p-2">
            Volume
            <p>
              $
              {data.body.market_data.total_volume.usd
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div class="p-2">
            Circulating Supply
            <p>
              $
              {data.body.market_data.circulating_supply
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
                pricing information provided by{" "}
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
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
