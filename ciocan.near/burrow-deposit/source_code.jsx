let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;

const { selectedTokenId, amount, hasError } = state;

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
console.log("INIT...", state, assets);

if (!assets.length || !assets[0]) return <div>loading...</div>;

const listAssets = assets
  ?.filter((a) => a.accountBalance > 0)
  ?.map((asset) => {
    const { token_id, accountBalance, metadata } = asset;
    const balance = formatToken(
      shrinkToken(accountBalance, metadata.decimals).toFixed()
    );

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
  if (!selectedTokenId || !amount || hasError) return;
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

  const storageBurrow = Near.view(BURROW_CONTRACT, "storage_balance_of", {
    account_id: accountId,
  });

  const storageToken = Near.view(token_id, "storage_balance_of", {
    account_id: accountId,
  });

  const collateralMsg = config.can_use_as_collateral
    ? `{"Execute":{"actions":[{"IncreaseCollateral":{"token_id": "${token_id}","max_amount":"${collateralAmount}"}}]}}`
    : "";

  const transactions = [];

  // const depositTransaction = {
  //   receiverId: token_id,
  //   functionCalls: [
  //     {
  //       methodName: "ft_transfer_call",
  //       args: {
  //         receiver_id: BURROW_CONTRACT,
  //         amount: expandedAmount,
  //         msg: collateralMsg,
  //       },
  //     },
  //   ],
  // };

  const depositTransaction = {
    contractName: token_id,
    methodName: "ft_transfer_call",
    args: {
      receiver_id: BURROW_CONTRACT,
      amount: expandedAmount,
      msg: collateralMsg,
      attachedDeposit: new Big("1").toFixed(),
    },
  };

  if (storageToken?.available === "0" || !storageToken?.available) {
    // depositTransaction.functionCalls.push({
    //   receiverId: token_id,
    //   functionCalls: [
    //     {
    //       methodName: "storage_deposit",
    //       attachedDeposit: expandToken(0.25, 24).toFixed(),
    //     },
    //   ],
    // });
    transactions.push({
      contractName: token_id,
      methodName: "storage_deposit",
      attachedDeposit: expandToken(0.25, 24).toFixed(),
    });
  }

  if (storageBurrow?.available === "0" || !storageBurrow?.available) {
    // transactions.push({
    //   receiverId: BURROW_CONTRACT,
    //   functionCalls: [
    //     {
    //       methodName: "storage_deposit",
    //       attachedDeposit: expandToken(0.25, 24).toFixed(),
    //     },
    //   ],
    // });
    transactions.push({
      contractName: BURROW_CONTRACT,
      methodName: "storage_deposit",
      attachedDeposit: expandToken(0.25, 24).toFixed(),
    });
  }

  transactions.push(depositTransaction);

  console.log("storageBurrow", storageBurrow);
  console.log("storageToken", storageToken);
  console.log("transactions", transactions);

  Near.call(transactions);
};

const handleDepositNear = () => {
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
