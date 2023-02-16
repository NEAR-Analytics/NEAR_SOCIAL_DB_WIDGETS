const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return "Please login first";

const erc721Abi = fetch(
  "https://gist.githubusercontent.com/kcole16/ef017dec9da7c1acb387de643835e840/raw/c4e0bf37092b4fd2832e971e5210bd70ca2345ab/erc721.abi.json"
);
if (!erc721Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(erc721Abi.body);

initState({
  token: "0x25EEe23b20C61E03596B7FAd3e87E20E7AF6f55C",
  amount: "1",
});

const mintTokens = () => {
  const erc721 = new ethers.Contract(
    state.token,
    erc721Abi.body,
    Ethers.provider().getSigner()
  );

  let cost = 69;
  let subtotal = (state.amount * cost).toString();
  let value = ethers.utils.parseEther(subtotal);

  erc721.mint(state.amount.toString(), {
    value: value,
  });

  console.log("transactionHash is " + transactionHash);
};

return (
  <>
    <h3>Mint BonkToes</h3>
    <img
      width="100"
      src="https://images.squarespace-cdn.com/content/v1/63bc5443ecd6050681a9b1bf/1e811c9c-3d14-4c44-9d22-851a463675cc/0.png?format=300w"
    />
    <div class="mb-3">
      <label for="amount" class="form-label">
        Amount
      </label>
      <input
        value={state.amount}
        class="form-control"
        id="amount"
        placeholder=""
        onChange={(e) => State.update({ amount: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={mintTokens}>Mint</button>
    </div>
  </>
);
