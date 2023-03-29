const { selectedTokenId, amount, hasError, status } = state;

// check if account connected
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender)
  return (
    <div>
      <h2>Please login first</h2>
      <br />
      <Web3Connect connectLabel="Connect with Web3" />
    </div>
  );

// fetch data from lens
const LenABI = fetch(
  "https://raw.githubusercontent.com/pysrbastion/bastion-abi/main/Lens.json"
).body;

const lenContract = "0x080B5ce373fE2103A7086b31DabA412E88bD7356";

const len = new ethers.Contract(lenContract, LenABI, Ethers.provider());

const dataArray = [
  "0xfa786baC375D8806185555149235AcDb182C033b",
  "0x4E8fE8fd314cFC09BDb0942c5adCC37431abDCD0",
  "0x8C14ea853321028a7bb5E4FB0d0147F183d3B677",
  "0xe5308dc623101508952948b141fD9eaBd3337D99",
  "0x845E15A441CFC1871B7AC610b0E922019BaD9826",
];

len.callStatic
  .cTokenBalancesAll(dataArray, sender, 0)
  .then((cTokenBalancesAll) => {
    State.update({ cTokenBalancesAll });
  });

len.callStatic.cTokenMetadataAll(dataArray, 0).then((cTokenMetadataAll) => {
  State.update({ cTokenMetadataAll });
});

// provide constants
const TokensDetail = {
  ["0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d"]: {
    name: "Near",
    symbol: "NEAR",
    address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
    cAddress: "0x8C14ea853321028a7bb5E4FB0d0147F183d3B677",
    icon: "near.svg",
    decimals: 24,
  },
  ["0xB12BFcA5A55806AaF64E99521918A4bf0fC40802"]: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
    cAddress: "0xe5308dc623101508952948b141fD9eaBd3337D99",
    icon: "usdc.svg",
    decimals: 6,
  },
  ["0x4988a896b1227218e4A686fdE5EabdcAbd91571f"]: {
    name: "Tether USD",
    symbol: "USDT.e",
    address: "0x4988a896b1227218e4A686fdE5EabdcAbd91571f",
    cAddress: "0x845E15A441CFC1871B7AC610b0E922019BaD9826",
    icon: "usdt.svg",
    decimals: 6,
  },
  ["0xf4eb217ba2454613b15dbdea6e5f22276410e89e"]: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0xf4eb217ba2454613b15dbdea6e5f22276410e89e",
    cAddress: "0xfa786baC375D8806185555149235AcDb182C033b",
    icon: "btc.png",
    decimals: 8,
  },
  ["ETH"]: {
    name: "Ether",
    symbol: "ETH",
    address: ethers.constants.AddressZero,
    cAddress: "0x4E8fE8fd314cFC09BDb0942c5adCC37431abDCD0",
    icon: "eth.svg",
    decimals: 18,
  },
};

const Comptroller = "0x6De54724e128274520606f038591A00C5E94a1F6";
const EIP20InterfaceABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/EIP20.json"
).body;
const CEthABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/CEther.json"
).body;
const CErc20ABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/CErc20.json"
).body;

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

  const erc20 = new ethers.Contract(
    selectedTokenId,
    EIP20InterfaceABI,
    Ethers.provider().getSigner()
  );

  const expandedAmount = expandToken(
    amount,
    TokensDetail[selectedTokenId].decimals
  ).toFixed();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);

  erc20
    .approve(TokensDetail[selectedTokenId].cAddress, toBigNumber)
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    });
};

const handleDeposit = () => {
  if (!selectedTokenId || !amount || hasError) return;

  let contractABI;
  if (selectedTokenId == "ETH") {
    contractABI = CEthABI;
  } else {
    contractABI = CErc20ABI;
  }

  const connection = new ethers.Contract(
    TokensDetail[selectedTokenId].cAddress,
    contractABI,
    Ethers.provider().getSigner()
  );

  const expandedAmount = expandToken(
    amount,
    TokensDetail[selectedTokenId].decimals
  ).toFixed();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);

  connection.mint(toBigNumber).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

const getCTokenBalancesAllIndex = () => {
  const rewardIndex = state.cTokenBalancesAll.findIndex(
    (element) => element[0] == TokensDetail[selectedTokenId].cAddress
  );
  return rewardIndex;
};

const walletBalance = () => {
  const rewardIndex = getCTokenBalancesAllIndex();
  const bigValue = state.cTokenBalancesAll[rewardIndex][4].toString();
  const cal = (
    bigValue / Math.pow(10, TokensDetail[selectedTokenId].decimals)
  ).toFixed(2);
  return cal;
};

// const aa = state.cTokenBalancesAll[3][1].mul(state.cTokenBalancesAll[3][3]);

return (
  <div style={{ maxWidth: "400px" }}>
    <div class="card-body d-grid gap-3">
      <div>
        <div class="mb-2 text-muted">Token</div>
        <select
          onChange={handleSelect}
          class="p-2 mb-1"
          style={{ width: "100%" }}
        >
          <option value="">Choose your token</option>
          {Object.keys(TokensDetail).map((key) => {
            return (
              <option key={key} value={key}>
                {TokensDetail[key].symbol}
              </option>
            );
          })}
        </select>
        {state.selectedTokenId !== undefined && state.selectedTokenId !== "" && (
          <div>
            <span class="badge bg-light text-dark">
              Wallet Balance: {walletBalance()}
            </span>
            <span class="badge bg-light text-dark">Supply Balance: </span>
          </div>
        )}
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

    <p>Account: {sender}</p>
  </div>
);
