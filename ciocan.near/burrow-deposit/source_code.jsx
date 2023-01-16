let accountId = context.accountId;

let selected = undefined;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

function getAssets() {
  const assets = Near.view("contract.main.burrow.near", "get_assets_paged");
  if (!assets) return null;
  const tokenIds = assets?.map(([id]) => id);
  const assetsDetailed = tokenIds.map((token_id) =>
    Near.view("contract.main.burrow.near", "get_asset", { token_id })
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
// console.log(assets);

const listAssets = assets
  ?.filter((a) => a.accountBalance > 0)
  .map((asset) => {
    console.log(asset);
    return <option value={asset.token_id}>{asset.metadata.symbol}</option>;
  });

if (!assets.length || !assets[0]) return <div>loading...</div>;

const handleSelect = (e) => {
  selected = e.target.value;
};

const handleDeposit = () => {
  if (!selected) return;

  Near.call([
    {
      contractName: "wrap.near",
      methodName: "near_deposit",
    },
    {
      contractName: "wrap.near",
      methodName: "ft_transfer_call",
      args: {
        receiver_id: "contract.main.burrow.near",
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
      <input type="number" />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  </div>
);
