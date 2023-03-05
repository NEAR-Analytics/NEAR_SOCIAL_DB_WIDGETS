const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return "Please login first";

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}
const erc20FactoryAbi = fetch(
  "https://raw.githubusercontent.com/codingshot/TokenFactory/master/abi/Factory.abi.json"
); // doesnt actually mint just deploys
if (!erc20FactoryAbi.ok) {
  return "factory scam";
}

const erc20Factory = "0x5ad70c187e448b9ca6104cc55619bf9a3a271efd"; // polygon
const interface = new ethers.utils.Interface(erc20FactoryAbi.body); // added this

/**TO DO INIT STATE FOR ECR20 = FACTORY */
initState({
  name: "TOKEN",
  symbol: "TKN",
  decimals: 18,
  sendTo: "0xd0decff60b18c8c17d1d616d5b81bee67aa5c327", // sending to our address
  sender, // msg.sender
  address, // after deployed this is conrect
  // senderBalance: "0",
  // receiverBalance: "0",
  initialSupply: 10000,
});
console.log(
  "LOG1: Name - " +
    state.name +
    "Decimals - " +
    state.decimals +
    " Supply - " +
    state.initialSupply +
    " Symbol - " +
    state.symbol
);

/**TO DO: MUST CHANGE COPIED FROM SEND TOKEN */
const deployToken = () => {
  const erc20 = new ethers.Contract(
    erc20Factory,
    erc20FactoryAbi, // trying without body
    // erc20FactoryAbi.body, // changed this to abi
    Ethers.provider().getSigner()
  );

  console.log("transactionHash is " + transactionHash);
};

return (
  <>
    <h3>📩 Deploy ERC-20 token (WIP)</h3>
    <div class="mb-3">
      <label for="sender" class="form-label">
        📫 message sender
      </label>
      <input
        value={sender}
        class="form-control"
        id="sender"
        placeholder={state.sender}
        // onChange={(e) => State.update({ sender: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label for="supply" class="form-label">
        🛠️ Enter New ERC20 Supply
      </label>
      <input
        value={state.initialSupply}
        class="form-control"
        id="supply"
        placeholder=""
        onChange={(e) => State.update({ initialSupply: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label for="decimals" class="form-label">
        🧮 Enter ERC20 Decimals
      </label>
      <input
        value={state.decimals}
        class="form-control"
        id="decimals"
        placeholder=""
        onChange={(e) => State.update({ decimals: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label for="symbol" class="form-label">
        Enter New ERC20 Token Symbol
      </label>
      <input
        value={state.symbol}
        class="form-control"
        id="symbol" // only allow for numbers
        placeholder="TKN"
        onChange={(e) => State.update({ symbol: e.target.value })}
      />
    </div>

    <div class="mb-3">
      <button onClick={deployToken}>Deploy Token (WIP)</button>
    </div>
  </>
);
