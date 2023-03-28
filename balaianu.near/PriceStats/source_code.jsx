const data = fetch("https://api.coingecko.com/api/v3/coins/coreto", {
  subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

return (
  <div className="text-bg-light rounded-4 p-3 mb-3">
    {data !== null ? (
      <p>
        <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
          <div class="p-2">
            <div>COR/USD</div>
            <h1>
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
            </h1>
          </div>
          <div class="p-2">
            ATH
            <p class="text-success">
              ${data.body.market_data.ath.usd.toFixed(8)}
            </p>
          </div>
          <div class="p-2">
            24h high
            <p>
              {" "}
              <b>${data.body.market_data.high_24h.usd.toFixed(8)} </b>
            </p>
          </div>
          <div class="p-2">
            24h low
            <p>
              {" "}
              <b>${data.body.market_data.low_24h.usd.toFixed(8)} </b>
            </p>
          </div>
          <div class="p-2">
            Market Cap
            <p>
              <b>
                {"$" +
                  data.body.market_data.market_cap.usd
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
            </p>
          </div>
          <div class="p-2">
            Volume
            <p>
              <b>
                {"$" +
                  data.body.market_data.total_volume.usd
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
            </p>
          </div>
          <div class="p-2">
            Circulating Supply
            <p>
              <b>
                {"$" +
                  data.body.market_data.circulating_supply
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </b>
            </p>
          </div>
        </div>
        <div>
          <small>
            Visit
            <a
              target="_blank"
              style={{ color: "inherit" }}
              variant="caption"
              rel="nofollow"
              href="https://www.coingecko.com/en/api_terms"
            >
              Coreto.io
            </a>{" "}
            to find out more
          </small>{" "}
          |
          <small>
            Pricing information provided by{" "}
            <a
              target="_blank"
              style={{ color: "inherit" }}
              variant="caption"
              rel="nofollow"
              href="https://www.coingecko.com/en/api_terms"
            >
              CoinGecko
            </a>
          </small>{" "}
        </div>
      </p>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
