const styling = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid black",
    borderRadius: "8px",
    padding: "40px",
    backgroundColor: "black",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
  },
  input: {
    marginTop: "20px",
    fontSize: "20px",
  },
  desc: {
    fontSize: "13px",
    marginTop: "6px",
    color: "white",
  },
};

initState({
  currency: "near",
});

const res = fetch(
  `https://api.coingecko.com/api/v3/simple/price?ids=${state.currency}&vs_currencies=usd`
);

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const price = res.body[`${state.currency}`].usd;

return (
  <div style={styling.container}>
    {price ? (
      <div style={styling.title}>
        {capitalizeFirstLetter(state.currency)} price: ${price} (USD)
      </div>
    ) : (
      <div style={styling.title}>No results</div>
    )}

    <input
      style={styling.input}
      value={state.currency}
      onChange={(e) => {
        state.currency = e.target.value.toLowerCase();
        State.update();
      }}
    />
    <div style={styling.desc}>
      Enter any crypto currency, e.g. NEAR, Bitcoin, Ethereum
    </div>
  </div>
);
