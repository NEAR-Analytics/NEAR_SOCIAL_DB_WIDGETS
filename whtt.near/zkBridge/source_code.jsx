const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return "Please login first";

const l2Receiver = "0xC57Aab03c5a835FAb96EFa38293f73B1f49fB1bc";
const l1Token = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const amount = "10000000";
const l2TxGasLimi = "900000";
const l2TxGasPerPubdataByte = "800";

const zkContract = "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063";

const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const zkAbi = fetch(
  "https://gist.githubusercontent.com/kcole16/3aa22a29b14ea6a1a7377b38463697ef/raw/c8a7249231ac00c7c3c9f1dc6188fbf28c262cb5/abi.json"
);
if (!zkAbi.ok) {
  return "scam";
}

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(zkAbi.body);

initState({
  token: "0x25EEe23b20C61E03596B7FAd3e87E20E7AF6f55C",
  amount: "1",
});

const mintTokens = () => {
  //   const zkBridge = new ethers.Contract(
  //     zkContract,
  //     zkAbi.body,
  //     Ethers.provider().getSigner()
  //   );

  //   console.log(zkBridge);

  let cost = state.amount;
  let subtotal = (state.amount * cost).toString();
  let value = ethers.utils.parseEther("0.001");
  const encodedData = iface.encodeFunctionData(
    "deposit(address,address,uint256,uint256,uint256,address)",
    [
      "0xbdDBD3A43F2474147C48CA56dc849edB981145A0",
      l1Token,
      amount,
      l2TxGasLimi,
      l2TxGasPerPubdataByte,
      "0xbdDBD3A43F2474147C48CA56dc849edB981145A0",
    ]
  );
  Ethers.provider().getSigner().sendTransaction({
    to: "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063",
    data: encodedData,
    value: value,
  });
  //   zkBridge.deposit(address, address, uint256, uint256, uint256, address)(
  //     l2Receiver,
  //     l1Token,
  //     amount,
  //     l2TxGasLimi,
  //     l2TxGasPerPubdataByte,
  //     sender,
  //     { value: value }
  //   );

  //   console.log("transactionHash is " + transactionHash);
};

const handleApprove = () => {
  const contract = new ethers.Contract(
    usdc,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  contract
    .approve("0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063", amount)
    .then((tx) => {
      State.update({
        log: "The TX hash is: " + tx.hash,
        explorerLink: "https://etherscan.io/tx/" + tx.hash,
      });
    })
    .catch(handleTxError);
};

return (
  <>
    <h3>Bridge to zkSync Era</h3>
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
      <button onClick={mintTokens}>Deposit</button>
    </div>
    <div class="mb-3">
      <button onClick={handleApprove}>Approve</button>
    </div>
  </>
);
