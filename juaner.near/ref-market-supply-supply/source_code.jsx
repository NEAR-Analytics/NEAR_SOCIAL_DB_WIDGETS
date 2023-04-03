const Container = styled.div`
    .content input{
      background: #152528;
      border-radius: 12px;
      height: 55px;
      font-size:20px;
      color: #7E8A93;
      padding:0 15px 0 15px;
      border:none;
      outline:none;
      margin-bottom:8px;
    }
    .content input:focus{
      outline:none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
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
`;
/** base tool start  */
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;
const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals));
};
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
const selectedTokenId = props.selectedTokenId;
const { rewards, balances, amount, hasError, assets } = state;
const hasData = assets.length > 0 && rewards.length > 0;
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
const nearBalance = shrinkToken(account.body.result.amount, 24).toFixed(2);
let vailableBalance = 0;
let apy = 0;
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
}
const storageBurrow = Near.view(BURROW_CONTRACT, "storage_balance_of", {
  account_id: accountId,
});

const storageToken = selectedTokenId
  ? Near.view(selectedTokenId, "storage_balance_of", {
      account_id: accountId,
    })
  : null;

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

  const collateralMsg = config.can_use_as_collateral
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
        msg: `{"Execute":{"actions":[{"IncreaseCollateral":{"token_id":"wrap.near","max_amount":"${amountDecimal}"}}]}}`,
      },
    },
  ]);
};
/** logic end */
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
      <div
        class={`greenButton mt_25 ${Number(amount) ? "" : "disabled"}`}
        onClick={handleDeposit}
      >
        Supply
      </div>
    </div>
  </Container>
);
