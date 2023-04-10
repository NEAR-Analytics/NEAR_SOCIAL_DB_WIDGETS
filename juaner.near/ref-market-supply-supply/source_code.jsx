const Container = styled.div`
    .content input{
      background: #152528;
      border-radius: 12px;
      height: 55px;
      font-size:20px;
      color: #7E8A93;
      padding:0 15px 0 15px;
      border:none;
      margin-bottom:8px;
    }
    .content input:focus{
      outline:none;
    }
 
    .content .balance {
      font-size:12px;
      color:#4B6778;
      margin-left:6px;
    }
    .template{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-left:6px;
    }
    .template .title{
      font-size:14px;
      color:#7E8A93;
    }
    .template .value{
      font-size:14px;
      color:#fff;
    }
    .mt_25{
      margin-top:25px;
    }
    .mt-10{
      margin-top:10px;
    }
    .greenButton{
      display:flex;
      align-items:center;
      justify-content:center;
      background: #00FFD1;
      border-radius: 12px;
      height:46px;
      font-weight: 700;
      font-size: 18px;
      color:#000;
      cursor:pointer;
      width:100%;
    }
    .disabled{
      opacity:0.3;
      cursor: not-allowed;
    }
    .switchButton{
      display:flex;
      align-items:center;
      width: 36px;
      height: 20px;
      border-radius: 14px;
      padding:2px 3px;
      cursor:pointer;
      margin-left:8px;
    }
    .justify-end {
      background: #00C6A2;
    }
    .justify-start {
      background: #ccc;
    }
    .switchButton .whiteBall {
      width:15px;
      height:15px;
      background: #FFFFFF;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
      border-radius:100px;
      transition: all 100ms ease-out;
      cursor:pointer;
    }
    .justify-end .whiteBall{
      margin-left:14px;
    }
    .justify-start .whiteBall{
      margin-left:2px;
    }
    .flex-center{
      display:flex;
      align-items:center;
    }
`;
/** base tool start  */
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;
let MAX_RATIO = 10_000;
let B = Big();
B.DP = 60; // set precision to 60 decimals
const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals));
};
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
const { showModal, selectedTokenId } = props;
const {
  rewards,
  balances,
  account: burrowAccount,
  amount,
  hasError,
  assets,
  cfButtonStatus,
  newHealthFactor,
} = state;
const hasData = assets.length > 0 && rewards.length > 0;
if (!showModal) {
  State.update({
    amount: "",
    hasError: false,
  });
}
/** base tool end */
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const onLoad = (data) => {
  State.update(data);
};
const account = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    },
  }),
});
if (!account) {
  return null;
}
/** logic start */
const b = account.body.result.amount;
const nearBalance = shrinkToken(b || "0", 24).toFixed(2);
let vailableBalance = 0;
let apy = 0;
let cf = "-";
const getBalance = (asset) => {
  if (!asset) return 0;
  const { token_id, accountBalance, metadata } = asset;
  return formatToken(
    shrinkToken(accountBalance, metadata.decimals).toFixed()
  ).toString();
};
const getApy = (asset) => {
  if (!asset && !rewards) return 0;
  const r = rewards.find((a) => a.token_id === asset.token_id);
  const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;
  return toAPY(totalApy);
};
if (selectedTokenId && assets) {
  const token = selectedTokenId === "NEAR" ? "wrap.near" : selectedTokenId;
  const asset = assets.find((a) => a.token_id === token);
  vailableBalance =
    selectedTokenId === "NEAR" ? nearBalance : getBalance(asset);
  apy = getApy(asset);
  cf = asset.config.volatility_ratio / 100;
}
const storageBurrow = Near.view(BURROW_CONTRACT, "storage_balance_of", {
  account_id: accountId,
});

const storageToken = selectedTokenId
  ? Near.view(selectedTokenId, "storage_balance_of", {
      account_id: accountId,
    })
  : null;

const handleAmount = (e) => {
  const amount = Number(e.target.value);
  const b = recomputeHealthFactor(selectedTokenId, amount);
  State.update({
    amount: Number(e.target.value),
    selectedTokenId,
    hasError: false,
    newHealthFactor: recomputeHealthFactor(selectedTokenId, amount),
  });
};

const handleDeposit = () => {
  if (!selectedTokenId || !amount || hasError) return;

  if (selectedTokenId === "NEAR") {
    handleDepositNear(amount);
    return;
  }

  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const { token_id, accountBalance, metadata, config } = asset;

  const balance = formatToken(
    shrinkToken(accountBalance, metadata.decimals).toFixed()
  );

  if (amount > balance) {
    State.update({ selectedTokenId, amount, hasError: true });
    return;
  }

  const expandedAmount = expandToken(amount, metadata.decimals).toFixed();
  const collateralAmount = expandToken(
    amount,
    metadata.decimals + config.extra_decimals
  ).toFixed();

  const collateralMsg =
    config.can_use_as_collateral && cfButtonStatus
      ? `{"Execute":{"actions":[{"IncreaseCollateral":{"token_id": "${token_id}","max_amount":"${collateralAmount}"}}]}}`
      : "";

  const transactions = [];

  const depositTransaction = {
    contractName: token_id,
    methodName: "ft_transfer_call",
    deposit: new Big("1").toFixed(),
    gas: expandToken(300, 12),
    args: {
      receiver_id: BURROW_CONTRACT,
      amount: expandedAmount,
      msg: collateralMsg,
    },
  };

  if (storageToken?.available === "0" || !storageToken?.available) {
    transactions.push({
      contractName: token_id,
      methodName: "storage_deposit",
      deposit: expandToken(0.25, 24).toFixed(),
    });
  }

  if (storageBurrow?.available === "0" || !storageBurrow?.available) {
    transactions.push({
      contractName: BURROW_CONTRACT,
      methodName: "storage_deposit",
      deposit: expandToken(0.25, 24).toFixed(),
      gas: expandToken(140, 12),
    });
  }

  transactions.push(depositTransaction);

  Near.call(transactions);
};

const handleDepositNear = (amount) => {
  const amountDecimal = expandToken(amount, 24).toFixed();

  Near.call([
    {
      contractName: "wrap.near",
      methodName: "near_deposit",
      deposit: amountDecimal,
      gas: expandToken(300, 12),
    },
    {
      contractName: "wrap.near",
      methodName: "ft_transfer_call",
      deposit: new Big("1").toFixed(),
      gas: expandToken(300, 12),
      args: {
        receiver_id: BURROW_CONTRACT,
        amount: amountDecimal,
        msg: cfButtonStatus
          ? `{"Execute":{"actions":[{"IncreaseCollateral":{"token_id":"wrap.near","max_amount":"${amountDecimal}"}}]}}`
          : "",
      },
    },
  ]);
};
function getAdjustedSum(type, burrowAccount) {
  if (!assets || !burrowAccount || burrowAccount[type].length == 0) return B(1);
  return burrowAccount[type]
    .map((assetInAccount) => {
      const asset = assets.find((a) => a.token_id === assetInAccount.token_id);

      const price = asset.price
        ? B(asset.price.multiplier).div(B(10).pow(asset.price.decimals))
        : B(0);

      const pricedBalance = B(assetInAccount.balance)
        .div(expandToken(1, asset.config.extra_decimals))
        .mul(price);

      return type === "borrowed"
        ? pricedBalance
            .div(asset.config.volatility_ratio)
            .mul(MAX_RATIO)
            .toFixed()
        : pricedBalance
            .mul(asset.config.volatility_ratio)
            .div(MAX_RATIO)
            .toFixed();
    })
    .reduce((sum, cur) => B(sum).plus(B(cur)).toFixed());
}

const adjustedCollateralSum = getAdjustedSum("collateral", burrowAccount);
const adjustedBorrowedSum = getAdjustedSum("borrowed", burrowAccount);

function getHealthFactor() {
  const healthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);
  return Number(healthFactor) < MAX_RATIO ? healthFactor : MAX_RATIO;
}
const healthFactor = getHealthFactor();
/** logic end */
function switchButtonStatus() {
  cfButtonStatus;
  State.update({
    cfButtonStatus: !cfButtonStatus,
  });
}
const recomputeHealthFactor = (tokenId, amount) => {
  if (!tokenId || !amount || !assets) return null;
  const asset = assets.find((a) => a.token_id === tokenId);
  const decimals = asset.metadata.decimals + asset.config.extra_decimals;
  const accountCollateralAsset = burrowAccount.collateral.find(
    (a) => a.token_id === tokenId
  );

  const newBalance = expandToken(amount, decimals)
    .plus(B(accountCollateralAsset?.balance || 0))
    .toFixed();

  const clonedAccount = clone(burrowAccount);

  const updatedToken = {
    token_id: tokenId,
    balance: newBalance,
    shares: newBalance,
    apr: "0",
  };

  if (clonedAccount?.collateral.length === 0) {
    clonedAccount.collateral = updatedToken;
  } else if (!accountCollateralAsset) {
    clonedAccount.collateral.push(updatedToken);
  } else {
    clonedAccount.collateral = [
      ...clonedAccount.collateral.filter((a) => a.token_id !== tokenId),
      updatedToken,
    ];
  }
  const adjustedCollateralSum = getAdjustedSum(
    "collateral",
    amount === 0 ? burrowAccount : clonedAccount
  );
  const adjustedBorrowedSum = getAdjustedSum("borrowed", burrowAccount);

  const newHealthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);

  return Number(newHealthFactor) < MAX_RATIO ? newHealthFactor : MAX_RATIO;
};
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <div class="content">
      <input type="number" value={amount} onChange={handleAmount} />
      {selectedTokenId && (
        <span class="balance">Balance: {vailableBalance}</span>
      )}
      {hasError && (
        <p class="alert alert-danger mt-10" role="alert">
          Amount greater than available
        </p>
      )}
      <div class="template mt_25">
        <span class="title">Supply APY</span>
        <span class="value">{apy}%</span>
      </div>
      <div class="template mt_25">
        <span class="title">Health Factor</span>
        <span class="value">
          {newHealthFactor && cfButtonStatus ? newHealthFactor : healthFactor}%
        </span>
      </div>
      <div class="template mt_25">
        <span class="title">Collateral Factor</span>
        <div class="flex-center">
          <span class="value">{cf}%</span>
          <div
            class={`switchButton ${
              cfButtonStatus ? "justify-end" : "justify-start"
            }`}
            onClick={switchButtonStatus}
          >
            <label class="whiteBall"></label>
          </div>
        </div>
      </div>
      <div
        class={`greenButton mt_25 ${Number(amount) ? "" : "disabled"}`}
        onClick={handleDeposit}
      >
        Supply
      </div>
    </div>
  </Container>
);
