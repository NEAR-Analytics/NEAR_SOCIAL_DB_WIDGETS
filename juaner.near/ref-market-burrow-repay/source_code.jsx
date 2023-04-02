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
      margin-bottom:8p;x
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
const { rewards, account, balances, amount, hasError, assets } = state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
/** base tool end */
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const onLoad = (data) => {
  State.update(data);
};
/** logic start */
let availableBalance = 0;
let apy = 0;

const getBalance = (asset) => {
  if (!asset) return 0;
  const { accountBalance, metadata } = asset;
  return formatToken(shrinkToken(accountBalance, metadata.decimals).toFixed());
};

const getApy = (asset) => {
  if (!asset) return 0;
  const r = rewards.find((a) => a.token_id === asset.token_id);
  return toAPY(r.apyBaseBorrow);
};

if (selectedTokenId && assets) {
  const token = selectedTokenId === "NEAR" ? "wrap.near" : selectedTokenId;
  const asset = assets.find((a) => a.token_id === token);
  availableBalance =
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

const handleAmount = (e) => {
  State.update({
    amount: Number(e.target.value),
    selectedTokenId,
    hasError: false,
  });
};
const handleRepay = () => {
  const asset = assets.find((a) => a.token_id === selectedTokenId);

  if (!selectedTokenId || !amount || hasError) return;

  if (amount > availableBalance) {
    State.update({ selectedTokenId, amount, hasError: true });
    return;
  }
  const transactions = [];

  const expandedAmount = expandToken(
    amount,
    asset.metadata.decimals + asset.config.extra_decimals
  );

  const repayTemplate = {
    Execute: {
      actions: [
        {
          Repay: {
            max_amount: expandedAmount.toFixed(0),
            token_id: selectedTokenId,
          },
        },
      ],
    },
  };

  const repayTransaction = {
    contractName: selectedTokenId,
    methodName: "ft_transfer_call",
    deposit: new Big("1").toFixed(),
    gas: expandToken(300, 12),
    args: {
      receiver_id: BURROW_CONTRACT,
      amount: expandedAmount.toFixed(0),
      msg: JSON.stringify(repayTemplate),
    },
  };

  if (storageToken?.available === "0" || !storageToken?.available) {
    transactions.push({
      contractName: selectedTokenId,
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

  transactions.push(repayTransaction);

  Near.call(transactions);
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
        <span class="balance">
          Balance: {availableBalance} {/**(${availableUSD}) */}
        </span>
      )}
      {hasError && (
        <p class="alert alert-danger mt-10" role="alert">
          Amount greater than available
        </p>
      )}
      <div class="template mt_25">
        <span class="title">Borrow APY</span>
        <span class="value">{apy}%</span>
      </div>
      <div class="greenButton mt_25" onClick={handleRepay}>
        Repay
      </div>
    </div>
  </Container>
);
