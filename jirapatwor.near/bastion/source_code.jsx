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
const EIP20InterfaceABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/EIP20.json"
).body;
const CEthABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/CEther.json"
).body;
const CErc20ABI = fetch(
  "https://raw.githubusercontent.com/JirapatWov/bos/main/CErc20.json"
).body;

const checkABI1 = JSON.parse(LenABI);
const checkABI2 = JSON.parse(EIP20InterfaceABI);
const checkABI3 = JSON.parse(CEthABI);
const checkABI4 = JSON.parse(CErc20ABI);

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

if (!checkABI1 || !checkABI2 || !checkABI3 || !checkABI4) {
  return (
    <div>
      <h2>Loading Data...</h2>
    </div>
  );
}

len.callStatic
  .getAccountLimits(Comptroller, sender)
  .then((getAccountLimits) => {
    State.update({ getAccountLimits });
  });

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const handleSelect = (e) => {
  State.update({
    selectedTokenId: e.target.value,
    hasError: 0,
  });
};

const handleAmount = (e) => {
  State.update({
    amount: e.target.value,
    selectedTokenId,
    hasError: 0,
  });
};

const handleApprove = () => {
  if (!selectedTokenId || !amount || hasError) return;

  if (state.actionTabs == "repay") {
    if (amount > state.borrowedAmount) {
      State.update({ hasError: 3 });
      return;
    }
  } else if (state.actionTabs == "deposit") {
    if (amount > state.balance) {
      State.update({ hasError: 1 });
      return;
    }
  }

  const erc20 = new ethers.Contract(
    selectedTokenId,
    EIP20InterfaceABI,
    Ethers.provider().getSigner()
  );

  const expandedAmount = expandToken(
    amount,
    TokensDetail[selectedTokenId].decimals
  ).toString();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);

  erc20
    .approve(TokensDetail[selectedTokenId].cAddress, toBigNumber)
    .then((transactionHash) => {
      State.update({ success: true });
      console.log("transactionHash is " + transactionHash);
    });
};

const handleDeposit = () => {
  if (!selectedTokenId || !amount || hasError) return;

  if (Number(amount) > Number(state.balance)) {
    State.update({ hasError: 1 });
    return;
  }

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
  ).toString();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);
  console.log(toBigNumber.toString());

  const mintPromise =
    selectedTokenId == "ETH"
      ? connection.mint({ value: expandedAmount })
      : connection.mint(expandedAmount);

  mintPromise
    .then((transaction) => {
      console.log("Transaction sent:", transaction.hash);
      State.update({ hasError: -1 });
      return transaction.wait();
    })
    .then((receipt) => {
      State.update({ hasError: 0 });
      State.update({ success: true });
      console.log("Transaction mined, receipt:", receipt);
    })
    .catch((error) => {
      State.update({ hasError: 5, errorMessage: error });
      console.log("Error in mint function:", error);
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
    Number(bigValue) / Math.pow(10, TokensDetail[selectedTokenId].decimals)
  ).toFixed(2);
  State.update({
    balance: Number(cal),
  });
  return cal;
};

const supplyBalance = () => {
  const rewardIndex = getCTokenBalancesAllIndex();
  const bigValue = state.cTokenBalancesAll[rewardIndex][1].mul(
    state.cTokenBalancesAll[rewardIndex][3]
  );
  return (
    Number(bigValue.toString()) /
    Math.pow(10, 18 + TokensDetail[selectedTokenId].decimals)
  ).toFixed(3);
};

const getAllowance = () => {
  const rewardIndex = getCTokenBalancesAllIndex();
  const bigValue = state.cTokenBalancesAll[rewardIndex][5].toString();
  const cal = (
    Number(bigValue) / Math.pow(10, TokensDetail[selectedTokenId].decimals)
  ).toFixed(2);
  State.update({
    allowance: Number(cal),
  });
};

const remainingBalance = () => {
  let totalBorrowLimit = ethers.BigNumber.from(0);
  let totalBorrowd = ethers.BigNumber.from(0);
  for (const key of dataArray) {
    // find total borrow limit
    const indexBalance = state.cTokenBalancesAll.findIndex(
      (element) => element[0] == key
    );
    const indexMeta = state.cTokenMetadataAll.findIndex(
      (element) => element[0] == key
    );
    const bigValue = state.cTokenBalancesAll[indexBalance][1].mul(
      state.cTokenBalancesAll[indexBalance][3]
    );
    const valueUsd = bigValue.mul(state.cTokenMetadataAll[indexMeta][1]);
    const valueWithCFactor = valueUsd.mul(
      state.cTokenMetadataAll[indexMeta][11]
    );
    // find total borrowed
    const bigValueBorrowedUSD = state.cTokenBalancesAll[indexBalance][2].mul(
      state.cTokenMetadataAll[indexMeta][1]
    );
    if (state.getAccountLimits[0].includes(key)) {
      totalBorrowLimit = totalBorrowLimit.add(valueWithCFactor);
      totalBorrowd = totalBorrowd.add(bigValueBorrowedUSD);
    }
  }
  const totalBorrowdFinal = (
    Number(totalBorrowd.toString()) / Math.pow(10, 18 * 2)
  ).toFixed(2);
  const totalBorrowdLimitFinal = (
    Number(totalBorrowLimit.toString()) / Math.pow(10, 18 * 4)
  ).toFixed(2);
  State.update({
    LimitAmount: (totalBorrowdLimitFinal - totalBorrowdFinal).toFixed(2),
  });
  return (totalBorrowdLimitFinal - totalBorrowdFinal).toFixed(2);
};

const handleBorrow = () => {
  if (!selectedTokenId || !amount || hasError) return;
  if (Number(state.amount) > Number(state.LimitAmount)) {
    State.update({ hasError: 2 });
    return;
  }

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
  ).toString();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);

  connection
    .borrow(toBigNumber)
    .then((transaction) => {
      console.log("Transaction sent:", transaction.hash);
      State.update({ hasError: -1 });
      return transaction.wait();
    })
    .then((receipt) => {
      State.update({ hasError: 0 });
      State.update({ success: true });
      console.log("Transaction receipt:", receipt);
    })
    .catch((error) => {
      State.update({ hasError: 5, errorMessage: error });
      console.log("Error:", error);
    });
};

const getBorrowed = () => {
  const rewardIndex = getCTokenBalancesAllIndex();
  const bigValueBorrowed = state.cTokenBalancesAll[rewardIndex][2];
  const finalValue = (
    Number(bigValueBorrowed.toString()) /
    Math.pow(10, TokensDetail[selectedTokenId].decimals)
  ).toFixed(2);
  State.update({ borrowedAmount: finalValue });
  return finalValue;
};

const handleRepay = () => {
  if (!selectedTokenId || !amount || hasError) return;

  if (Number(amount) > Number(state.borrowedAmount)) {
    State.update({ hasError: 3 });
    return;
  }

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
  ).toString();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);

  connection
    .repayBorrow(toBigNumber)
    .then((transaction) => {
      console.log("Transaction sent:", transaction.hash);
      State.update({ hasError: -1 });
      return transaction.wait();
    })
    .then((receipt) => {
      State.update({ hasError: 0 });
      State.update({ success: true });
      console.log("Transaction receipt:", receipt);
    })
    .catch((error) => {
      State.update({ hasError: 5, errorMessage: error });
      console.log("Error:", error);
    });
};

const maxWithdraw = () => {
  const rewardIndex = getCTokenBalancesAllIndex();
  const supplyBalance = supplyBalance();
  const tokenPrice =
    Number(state.cTokenMetadataAll[rewardIndex][1].toString()) /
    Math.pow(10, 18 + (18 - TokensDetail[selectedTokenId].decimals));
  const liquidity =
    Number(state.getAccountLimits[1].toString()) / Math.pow(10, 18);
  const liquidityInToken = liquidity / tokenPrice;
  const CFactor =
    Number(state.cTokenMetadataAll[rewardIndex][11].toString()) /
    Math.pow(10, 18);
  const totalLiquidity = (liquidityInToken / CFactor).toFixed(3);
  if (supplyBalance >= totalLiquidity) {
    State.update({ maxWithdraw: Number(totalLiquidity) });
    return totalLiquidity;
  } else {
    State.update({ maxWithdraw: Number(supplyBalance) });
    return supplyBalance;
  }
};

const handleWithdraw = () => {
  if (!selectedTokenId || !amount || hasError) return;

  if (Number(amount) > Number(state.maxWithdraw)) {
    State.update({ hasError: 4 });
    return;
  }

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
  ).toString();

  const toBigNumber = ethers.BigNumber.from(expandedAmount);
  const supplyBalance = supplyBalance();

  if (amount >= supplyBalance) {
    connection
      .redeem(toBigNumber)
      .then((transaction) => {
        console.log("Transaction sent:", transaction.hash);
        State.update({ hasError: -1 });
        return transaction.wait();
      })
      .then((receipt) => {
        State.update({ hasError: 0 });
        State.update({ success: true });
        console.log("Transaction receipt:", receipt);
      })
      .catch((error) => {
        State.update({ hasError: 5, errorMessage: error });
        console.log("Error:", error);
      });
  } else {
    connection
      .redeemUnderlying(toBigNumber)
      .then((transaction) => {
        console.log("Transaction sent:", transaction.hash);
        State.update({ hasError: -1 });
        return transaction.wait();
      })
      .then((receipt) => {
        State.update({ hasError: 0 });
        State.update({ success: true });
        console.log("Transaction receipt:", receipt);
      })
      .catch((error) => {
        State.update({ hasError: 5, errorMessage: error });
        console.log("Error:", error);
      });
  }
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const allAssetData = Object.keys(TokensDetail).map((key) => {
  const indexMeta = state.cTokenMetadataAll.findIndex(
    (element) => element[0] == TokensDetail[key].cAddress
  );
  const totalSupply = state.cTokenMetadataAll[indexMeta][8].mul(
    state.cTokenMetadataAll[indexMeta][2]
  );
  const totalSupplyValue = (
    Number(totalSupply.toString()) /
    Math.pow(10, 18 + TokensDetail[key].decimals)
  ).toFixed(2);
  const supplyRatePerBlock = state.cTokenMetadataAll[indexMeta][3];
  const supplyApy = (
    (Math.pow((Number(supplyRatePerBlock.toString()) / 1e18) * 86400 + 1, 365) -
      1) *
    100
  ).toFixed(2);
  const borrowRatePerBlock = state.cTokenMetadataAll[indexMeta][4];
  const borrowApy = (
    (Math.pow((Number(borrowRatePerBlock.toString()) / 1e18) * 86400 + 1, 365) -
      1) *
    100
  ).toFixed(2);
  return (
    <tr>
      <td>{TokensDetail[key].name}</td>
      <td class="text-end">{supplyApy}%</td>
      <td class="text-end">{borrowApy}%</td>
      <td class="text-end">
        {numberWithCommas(totalSupplyValue)} {TokensDetail[key].symbol}
      </td>
    </tr>
  );
});

const fetchAllData = () => {
  State.update({ allDataTab: allAssetData });
};

const portfolio = Object.keys(TokensDetail).map((key) => {
  const indexBalance = state.cTokenBalancesAll.findIndex(
    (element) => element[0] == TokensDetail[key].cAddress
  );
  const bigValue = state.cTokenBalancesAll[indexBalance][4].toString();
  const cal = (
    Number(bigValue) / Math.pow(10, TokensDetail[key].decimals)
  ).toFixed(2);

  const bigValueSupply = state.cTokenBalancesAll[indexBalance][1].mul(
    state.cTokenBalancesAll[indexBalance][3]
  );
  const supplied = (
    Number(bigValueSupply.toString()) /
    Math.pow(10, 18 + TokensDetail[key].decimals)
  ).toFixed(3);
  const bigValueBorrowed = state.cTokenBalancesAll[indexBalance][2];
  const finalValueBorrowed = (
    Number(bigValueBorrowed.toString()) /
    Math.pow(10, TokensDetail[key].decimals)
  ).toFixed(2);
  return (
    <tr>
      <td>{TokensDetail[key].name}</td>
      <td class="text-end">
        {cal} {TokensDetail[key].symbol}
      </td>
      <td class="text-end">
        {supplied} {TokensDetail[key].symbol}
      </td>
      <td class="text-end">
        {finalValueBorrowed} {TokensDetail[key].symbol}
      </td>
    </tr>
  );
});

if (!state.actionTabs) {
  State.update({ actionTabs: "deposit" });
}
if (!state.actionList) {
  State.update({ actionList: "assets" });
}

return (
  <>
    {state.cTokenBalancesAll &&
    state.cTokenMetadataAll &&
    state.getAccountLimits ? (
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div style={{ paddingRight: "2rem", width: "60%" }}>
          <div class="list btn-group" role="group" aria-label="List">
            <input
              type="radio"
              class="btn-check"
              name="btnradiolist"
              id="assets"
              autocomplete="off"
              checked={state.actionList === "assets"}
              onClick={() => State.update({ actionList: "assets" })}
            />
            <label class="btn btn-outline-primary" for="assets">
              Assets
            </label>
            <input
              type="radio"
              class="btn-check"
              name="btnradiolist"
              id="portfolio"
              autocomplete="off"
              checked={state.actionList === "portfolio"}
              onClick={() => State.update({ actionList: "portfolio" })}
            />
            <label class="btn btn-outline-primary" for="portfolio">
              Portfolio
            </label>
          </div>
          {state.actionList == "assets" ? (
            <table class="table">
              <thead>
                <tr
                  style={{
                    color: "white",
                  }}
                >
                  <th scope="col">Asset</th>
                  <th scope="col" class="text-end">
                    APY
                  </th>
                  <th scope="col" class="text-end">
                    APY (borrow)
                  </th>
                  <th scope="col" class="text-end">
                    Total Supply
                  </th>
                </tr>
              </thead>
              {fetchAllData()}
              <tbody>{state.allDataTab}</tbody>
            </table>
          ) : (
            <table class="table">
              <thead>
                <tr
                  style={{
                    color: "white",
                  }}
                >
                  <th scope="col">Asset</th>
                  <th scope="col" class="text-end">
                    Wallet Balance
                  </th>
                  <th scope="col" class="text-end">
                    Supplied
                  </th>
                  <th scope="col" class="text-end">
                    Borrowed
                  </th>
                </tr>
              </thead>
              <tbody>{portfolio}</tbody>
            </table>
          )}
        </div>
        <div style={{ maxWidth: "400px" }}>
          <div class="card-body d-grid gap-3">
            <div class="action btn-group" role="group" aria-label="Deposit">
              <input
                type="radio"
                class="btn-check"
                name="btnradioaction"
                id="deposit"
                autocomplete="off"
                checked={state.actionTabs === "deposit"}
                onClick={() => State.update({ actionTabs: "deposit" })}
              />
              <label class="btn btn-outline-primary" for="deposit">
                Deposit
              </label>
              <input
                type="radio"
                class="btn-check"
                name="btnradioaction"
                id="borrow"
                autocomplete="off"
                checked={state.actionTabs === "borrow"}
                onClick={() => State.update({ actionTabs: "borrow" })}
              />
              <label class="btn btn-outline-primary" for="borrow">
                Borrow
              </label>
              <input
                type="radio"
                class="btn-check"
                name="btnradioaction"
                id="repay"
                autocomplete="off"
                checked={state.actionTabs === "repay"}
                onClick={() => State.update({ actionTabs: "repay" })}
              />
              <label class="btn btn-outline-primary" for="repay">
                Repay
              </label>
              <input
                type="radio"
                class="btn-check"
                name="btnradioaction"
                id="withdraw"
                autocomplete="off"
                checked={state.actionTabs === "withdraw"}
                onClick={() => State.update({ actionTabs: "withdraw" })}
              />
              <label class="btn btn-outline-primary" for="withdraw">
                Withdraw
              </label>
            </div>
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
              {state.selectedTokenId !== undefined &&
              state.selectedTokenId !== "" ? (
                state.actionTabs == "deposit" ? (
                  <div>
                    <span class="badge bg-light text-dark">
                      Wallet Balance: {walletBalance()}{" "}
                      {TokensDetail[selectedTokenId].symbol}
                    </span>
                    <span class="badge bg-light text-dark">
                      Supply Balance: {supplyBalance()}{" "}
                      {TokensDetail[selectedTokenId].symbol}
                    </span>
                    {getAllowance()}
                  </div>
                ) : state.actionTabs == "borrow" ? (
                  <div>
                    <span class="badge bg-light text-dark">
                      Remaining Borrow Limit: $ {remainingBalance()}
                    </span>
                  </div>
                ) : state.actionTabs == "repay" ? (
                  <div>
                    <span class="badge bg-light text-dark">
                      Wallet Balance: {walletBalance()}{" "}
                      {TokensDetail[selectedTokenId].symbol}
                    </span>
                    <span class="badge bg-light text-dark">
                      Amount Borrowed: {getBorrowed()}{" "}
                      {TokensDetail[selectedTokenId].symbol}
                    </span>
                    {getAllowance()}
                  </div>
                ) : (
                  <div>
                    <span class="badge bg-light text-dark">
                      Max Withdrawal: {maxWithdraw()}{" "}
                      {TokensDetail[selectedTokenId].symbol}
                    </span>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            <div>
              <div class="mb-2 text-muted">Amount</div>
              <input type="number" value={amount} onChange={handleAmount} />
            </div>
            {state.hasError == 1 ? (
              <p class="alert alert-danger" role="alert">
                Amount greater than balance
              </p>
            ) : state.hasError == 2 ? (
              <p class="alert alert-danger" role="alert">
                Amount greater than Remaining Borrow Limit
              </p>
            ) : state.hasError == 3 ? (
              <p class="alert alert-danger" role="alert">
                Amount greater than Amount Borrowed
              </p>
            ) : state.hasError == 4 ? (
              <p class="alert alert-danger" role="alert">
                Amount greater than Max Withdrawal
              </p>
            ) : state.hasError == 4 ? (
              <p class="alert alert-danger" role="alert">
                Something went wrong!! error: {errorMessage}
              </p>
            ) : state.hasError == -1 ? (
              <p class="alert alert-warning" role="alert">
                Waiting for confirmation ...
              </p>
            ) : state.success == true ? (
              <p class="alert alert-success" role="alert">
                Your transaction was sent successfully
              </p>
            ) : (
              ""
            )}
            {state.actionTabs == "deposit" ? (
              state.amount > state.allowance &&
              state.selectedTokenId !== "ETH" ? (
                <button
                  disabled={state.amount == undefined || state.amount == ""}
                  onClick={handleApprove}
                  style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
                >
                  Approve
                </button>
              ) : (
                <button
                  disabled={state.amount == undefined || state.amount == ""}
                  onClick={handleDeposit}
                  style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
                >
                  Deposit
                </button>
              )
            ) : state.actionTabs == "borrow" ? (
              <button
                disabled={state.amount == undefined || state.amount == ""}
                onClick={handleBorrow}
                style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
              >
                Borrow
              </button>
            ) : state.amount > state.allowance &&
              state.selectedTokenId !== "ETH" ? (
              <button
                disabled={state.amount == undefined || state.amount == ""}
                onClick={handleApprove}
                style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
              >
                Approve
              </button>
            ) : state.actionTabs == "repay" ? (
              <button
                disabled={state.amount == undefined || state.amount == ""}
                onClick={handleRepay}
                style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
              >
                Repay
              </button>
            ) : (
              <button
                disabled={state.amount == undefined || state.amount == ""}
                onClick={handleWithdraw}
                style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
              >
                Withdraw
              </button>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2>Loading...</h2>
      </div>
    )}
  </>
);
