const { selectedTokenId, amount, hasError, status } = state;
const TokensDetail = {
  ["0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d"]: {
    name: "Near",
    symbol: "NEAR",
    address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
    icon: "near.svg",
    decimals: 24,
  },
  ["0xB12BFcA5A55806AaF64E99521918A4bf0fC40802"]: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
    icon: "usdc.svg",
    decimals: 6,
  },
  ["0x4988a896b1227218e4A686fdE5EabdcAbd91571f"]: {
    name: "Tether USD",
    symbol: "USDT.e",
    address: "0x4988a896b1227218e4A686fdE5EabdcAbd91571f",
    icon: "usdt.svg",
    decimals: 6,
  },
  ["0xf4eb217ba2454613b15dbdea6e5f22276410e89e"]: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0xf4eb217ba2454613b15dbdea6e5f22276410e89e",
    icon: "btc.png",
    decimals: 8,
  },
  ["ETH"]: {
    name: "Ether",
    symbol: "ETH",
    address: ethers.constants.AddressZero,
    icon: "eth.svg",
    decimals: 18,
  },
};
const Comptroller = "0x6De54724e128274520606f038591A00C5E94a1F6";
const EIP20InterfaceABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/EIP20.json"
).body;
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const handleSelect = (e) => {
  State.update({
    selectedTokenId: e.target.value,
    amount: "",
    hasError: false,
  });
};

const handleAmount = (e) => {
  State.update({
    amount: Number(e.target.value),
    selectedTokenId,
    hasError: false,
  });
};

const handleApprove = () => {
  if (!selectedTokenId || !amount || hasError) return;
  State.update({
    status: "123",
  });

  const erc20 = new ethers.Contract(
    selectedTokenId,
    EIP20InterfaceABI,
    Ethers.provider().getSigner()
  );
  State.update({
    status: "345",
  });
  const expandedAmount = expandToken(
    amount,
    TokensDetail[selectedTokenId].decimals
  ).toFixed();

  //   let amountUse = ethers.utils
  //     .parseUnits(amount, TokensDetail[selectedTokenId].decimals)
  //     .toHexString();

  State.update({
    status: expandedAmount,
  });

  erc20.approve(selectedTokenId, expandedAmount).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });

  //   let transactions = [];

  //   const expandedAmount = expandToken(
  //     amount,
  //     TokensDetail[selectedTokenId].decimals
  //   ).toFixed();

  //   State.update({
  //     status: expandedAmount,
  //   });

  //   const depositTransaction = {
  //     contractName: selectedTokenId,
  //     methodName: "approve",
  //     deposit: new Big("1").toFixed(),
  //     args: {
  //       spender: sender,
  //       amount: expandedAmount,
  //     },
  //   };

  //   transactions.push(depositTransaction);

  //   Near.call(transactions);

  //   const eip20 = new ethers.Contract(
  //     Comptroller,
  //     EIP20InterfaceABI,
  //     Ethers.provider()
  //   );

  //   eip20.callStatic.approve(selectedTokenId, expandedAmount).then((data) => {
  //     State.update({ data });
  //   });
};

const handleDeposit = () => {
  if (!selectedTokenId || !amount || hasError) {
    State.update({
      status: "falseee",
    });
    return;
  }

  const eip20 = new ethers.Contract(Comptroller, EIP20InterfaceABI, sender);

  const expandedAmount = expandToken(
    amount,
    TokensDetail[selectedTokenId].address
  ).toFixed();

  eip20.callStatic
    .cTokenSupply(selectedTokenId, expandedAmount, sender)
    .then((data) => {
      State.update({ data });
    });
};

return (
  <div style={{ maxWidth: "300px" }}>
    <div class="card-body d-grid gap-3">
      <div>
        <div class="mb-2 text-muted">Token</div>
        <select
          onChange={handleSelect}
          class="p-2 mb-1"
          style={{ width: "100%" }}
        >
          <option value="">Choose your token</option>
          <option value="0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d">
            NEAR
          </option>
          <option value="0xB12BFcA5A55806AaF64E99521918A4bf0fC40802">
            USDC
          </option>
          <option value="0x4988a896b1227218e4A686fdE5EabdcAbd91571f">
            USDT.e
          </option>
          <option value="0xf4eb217ba2454613b15dbdea6e5f22276410e89e">
            WBTC
          </option>
          <option value="ETH">ETH</option>
        </select>
        {state.selectedTokenId}
        {state.amount}
        {state.status}
      </div>
      <div>
        <div class="mb-2 text-muted">Amount</div>
        <input type="number" value={amount} onChange={handleAmount} />
      </div>
      {hasError && (
        <p class="alert alert-danger" role="alert">
          Amount greater than balance
        </p>
      )}
      <button
        onClick={handleApprove}
        style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
      >
        Approve
      </button>
      <button
        onClick={handleDeposit}
        style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
      >
        Deposit
      </button>
    </div>
    <Web3Connect connectLabel="Connect with Web3" />
    <p>Account: {sender}</p>
  </div>
);
