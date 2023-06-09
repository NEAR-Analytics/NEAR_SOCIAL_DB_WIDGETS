const symbols = ["AAPL", "AMZN", "NVDA", "MSFT", "TSLA", "META", "JPM"];

initState({
  ticker: "AAPL",
  d: "",
  price: "",
});

const url = "https://yh-finance-complete.p.rapidapi.com/yhf?ticker=AAPL";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "df979192a6msh4028d1ba5d1badep1d8782jsn10bf08062867",
    "X-RapidAPI-Host": "yh-finance-complete.p.rapidapi.com",
  },
};

const handleProposal = () => {
  if (!state.ticker) {
    return;
  }
  let new_url =
    "https://yh-finance-complete.p.rapidapi.com/yhf?ticker=" + state.ticker;
  let new_data = fetch(new_url, options);
  console.log(new_data);
};

const data = fetch(url, options);

console.log(data);

const onChangeSymbol = (ticker) => {
  State.update({
    ticker,
  });
};

if (data !== null && data.ok === false) {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <p>
        It seems like our pricing data provider, Yahoo Finance (), is
        experiencing some issues at the moment. Apologies.
      </p>
      <p>
        Thanks for your patience, and we hope they'll resolve the issue soon.
      </p>
    </div>
  );
} else {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      {data !== null ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div style={{ "font-size": "30px" }}>AAPL/USD</div>
              <h1>
                ${data.body.price.regularMarketPrice}
                <small
                  class={
                    data.body.price.regularMarketChange < 0
                      ? "text-danger"
                      : "text-success"
                  }
                  style={{ "font-size": "20px" }}
                >
                  {data.body.price.regularMarketChangePercent.toFixed(2) + "%"}
                </small>
              </h1>
            </div>
          </div>
          <div>
            <h3>Stock Symbol</h3>
            <input
              type="text"
              onChange={(e) => onChangeSymbol(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleProposal}>Get Price</button>
          </div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
