let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;

const { selectedTokenId, amount, hasError, assets, rewards } = state;

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

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

console.log("INIT...", state);

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

if (!account) return <div>loading...</div>;

const nearBalance = shrinkToken(account.body.result.amount, 24).toFixed(2);

const toAPY = (v) => Math.round(v * 100) / 100;

const listAssets =
  assets &&
  assets
    ?.filter((a) => a.accountBalance > 0)
    ?.map((asset) => {
      const { token_id, accountBalance, metadata } = asset;
      const balance = formatToken(
        shrinkToken(accountBalance, metadata.decimals).toFixed()
      ).toString();

      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;

      const spaces = "".padStart(15 - (metadata.symbol + balance).length, "-");

      return (
        <option value={token_id}>
          {metadata.symbol} - {balance} {spaces} APY {toAPY(totalApy)}%
        </option>
      );
    });

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
  console.log(
    "handleDeposit",
    assets,
    state,
    selectedTokenId,
    amount,
    hasError
  );
  if (!selectedTokenId || !amount || hasError) return;

  if (selectedTokenId === "NEAR") {
    handleDepositNear(amount);
    return;
  }

  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const { token_id, accountBalance, metadata, config } = asset;
  console.log("asset", asset);
  console.log("metadata", metadata);
  console.log("config", config);

  const balance = formatToken(
    shrinkToken(accountBalance, metadata.decimals).toFixed()
  );

  console.log("balance", balance);

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

  console.log("storageBurrow", storageBurrow);
  console.log("storageToken", storageToken);
  console.log("transactions", transactions);

  Near.call(transactions);
};

const handleDepositNear = (amount) => {
  const amountDecimal = expandToken(amount, 24).toFixed();
  console.log("handleDepositNear", amount, amountDecimal);
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

return (
  <div class="card" style={{ maxWidth: "300px" }}>
    {!hasData && (
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
    )}
    <div class="card-body d-grid gap-3">
      <select onChange={handleSelect}>
        <option value="">Deposit an asset</option>
        <option value="NEAR">NEAR - {nearBalance}</option>
        {listAssets}
      </select>
      <input type="number" value={amount} onChange={handleAmount} />
      {hasError && (
        <p class="alert alert-danger" role="alert">
          Amount greater than balance
        </p>
      )}
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  </div>
);
