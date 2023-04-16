const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const pythAbi = fetch(
  "https://gist.githubusercontent.com/Markeljan/621c03c5f50a180c908ea5195564997e/raw/056f3429c077a406444ae8e2e8a5afc8dacb8368/abi.json"
);
if (!pythAbi.ok) {
  return "abi failed to load";
}

const iface = new ethers.utils.Interface(pythAbi.body);

initState({
  latestPrice: "",
  index: "",
});

const priceFeeds = {
  "Select Feed": "",
  "ETH/USD":
    "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
};

const feedMenuItems = Object.keys(priceFeeds).map((feed) => (
  <option value={priceFeeds[feed]}>{feed}</option>
));

const setSubToUpdate = (subToUpdate) => {
  State.update({ subToUpdate, receiver: receiver ?? "" });
  refreshBalances();
};

const setFeed = (feed) => {
  State.update({ feed });
};

const sendUpdate = () => {
  const ppp = new ethers.Contract(
    "0x843e499e54d8d0c2274da668faa748d8206846f8",
    pythAbi.body,
    Ethers.provider().getSigner()
  );

  ppp
    .updateSubscription(state.index)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("transactionHash is " + transactionHash);
};

const getPrice = () => {
  State.update({ latestPrice: "...fetching" });
  const ppp = new ethers.Contract(
    "0x843e499e54d8d0c2274da668faa748d8206846f8",
    pythAbi.body,
    Ethers.provider()
  );
  const priceData = ppp.subscriptions(state.index).then((result) => {
    State.update({ latestPrice: JSON.stringify(result) });
  });
};

return (
  <>
    <h3>Pyth Price Pusher</h3>
    <div class="mb-3">
      <label for="selectFeed">Price Feed</label>
      <select
        class="form-select"
        id="selectFeed"
        onChange={(e) => {
          setFeed(e.target.value);
        }}
      >
        {feedMenuItems}
      </select>
    </div>

    <div class="mb-3">
      <label for="amount" class="form-label">
        Subscription Index
      </label>
      <input
        value={state.index}
        class="form-control"
        id="amount"
        placeholder=""
        onChange={(e) => State.update({ index: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={sendUpdate}>Send</button>
      <button onClick={getPrice} class="ms-2">
        Get Price
      </button>
    </div>
    {state.latestPrice && (
      <div class="mb-3">
        <label class="form-label">Latest Price</label>
        <div>{state.latestPrice.toString()}</div>
      </div>
    )}
  </>
);
