let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;

console.log("INIT...", state);

const { selectedTokenId, amount, hasError } = state;

const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

function getAssets() {
  const assets = Near.view(BURROW_CONTRACT, "get_assets_paged");
  if (!assets) return null;

  const tokenIds = assets?.map(([id]) => id);
  const assetsDetailed = tokenIds.map((token_id) =>
    Near.view(BURROW_CONTRACT, "get_asset", { token_id })
  );
  const metadata = tokenIds?.map((token_id) =>
    Near.view(token_id, "ft_metadata")
  );
  const balances = tokenIds.map((token_id) =>
    Near.view(token_id, "ft_balance_of", { account_id: accountId })
  );

  return assetsDetailed?.map((asset, i) => {
    return {
      ...asset,
      metadata: metadata?.[i],
      accountBalance: balances?.[i],
    };
  });
}

const assets = getAssets();
// console.log("assets", assets);

if (!assets.length || !assets[0]) return <div>loading...</div>;

const listAssets = assets
  ?.filter((a) => a.accountBalance > 0)
  ?.map((asset) => {
    const { token_id, accountBalance, metadata } = asset;
    const balance = formatToken(shrinkToken(accountBalance, metadata.decimals));

    return (
      <option value={token_id}>
        {metadata.symbol} - {balance}
      </option>
    );
  });

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
  if (!selectedTokenId || !amount || !state || hasError) return;
  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const { token_id, accountBalance, metadata } = asset;
  const balance = formatToken(shrinkToken(accountBalance, metadata.decimals));

  if (amount > balance) {
    State.update({ selectedTokenId, amount, hasError: true });
    return;
  }

  Near.call([
    {
      contractName: "wrap.near",
      methodName: "near_deposit",
    },
    {
      contractName: "wrap.near",
      methodName: "ft_transfer_call",
      args: {
        receiver_id: BURROW_CONTRACT,
        amount: "1000000000000000000000000",
        msg: '{"Execute":{"actions":[{"IncreaseCollateral":{"token_id":"wrap.near","max_amount":"1000000000000000000000000"}}]}}',
      },
    },
  ]);
};

return (
  <div class="card" style={{ maxWidth: "300px" }}>
    <div class="card-body d-grid gap-3">
      <select onChange={handleSelect}>
        <option value="">Deposit an asset</option>
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
