let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;

const { selectedTokenId, amount, hasError, assets, rewards, account } = state;

const hasData = assets.length > 0 && rewards.length > 0;

const onLoad = (data) => {
  State.update(data);
};

const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals));
};

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
const toAPY = (v) => Math.round(v * 100) / 100;

if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}

const listAssets = [];
const hasBalanceTokens =
  (assets && assets.filter((a) => a.accountBalance > 0)) || [];
const borrowedTokens =
  (account && account.borrowed.map((a) => a.token_id)) || [];
hasBalanceTokens.forEach((asset) => {
  const { token_id, metadata } = asset;
  if (borrowedTokens.includes(token_id)) {
    listAssets.push(
      <option key={token_id} value={token_id}>
        {metadata.symbol}
      </option>
    );
  }
});

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

if (selectedTokenId) {
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

return (
  <div style={{ maxWidth: "300px" }}>
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <div class="card-body d-grid gap-3">
      <div>
        <div class="mb-2 text-muted">From</div>
        <select
          onChange={handleSelect}
          class="p-2 mb-1"
          style={{ width: "100%" }}
        >
          <option value="">Repay an asset</option>
          {listAssets}
        </select>
        <div>
          <span class="badge bg-light text-dark">
            {availableBalance} available
          </span>
          <span class="badge bg-light text-dark">{apy}% Borrow APY</span>
        </div>
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
        onClick={handleRepay}
        style={{ background: "#4ED58A", borderColor: "white" }}
      >
        Repay
      </button>
    </div>
  </div>
);
