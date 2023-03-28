const data = fetch("https://api.coingecko.com/api/v3/coins/near", {
  //subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

//console.log(data);

if (data !== null && data.ok === false) {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      Oops, something went wrong with our system. Please hang on while we look
      into the issue. We'll get things sorted as soon as possible. Thanks for
      your patience!
    </div>
  );
} else {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      {data !== null ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>NEAR/USD</div>
              <h1>
                ${data.body.market_data.current_price.usd}
                <small
                  class={
                    data.body.market_data
                      .price_change_percentage_24h_in_currency.usd < 0
                      ? "text-danger"
                      : "text-success"
                  }
                  style={{ "font-size": "12px" }}
                >
                  {data.body.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                    2
                  ) + "%"}
                </small>
              </h1>
            </div>
            <div class="p-2">
              ATH
              <p class="text-success">
                ${data.body.market_data.ath.usd.toFixed(2)}
              </p>
            </div>
            <div class="p-2">
              24h high
              <p>
                {" "}
                <b>${data.body.market_data.high_24h.usd.toFixed(2)} </b>
              </p>
            </div>
            <div class="p-2">
              24h low
              <p>
                {" "}
                <b>${data.body.market_data.low_24h.usd.toFixed(2)} </b>
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
            <small>|</small>
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
          </div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
