let MAX_RATIO = 10_000;
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;

let B = Big();
B.DP = 60;

const toAPY = (v) => Math.round(v * 100) / 100;

const { selectedTokenId, amount, hasError, assets, rewards } = state;

const hasData = assets.length > 0 && rewards.length > 0;

const onLoad = (data) => {
  State.update(data);
};

const shrinkToken = (value, decimals) => {
  return B(value).div(B(10).pow(decimals));
};

const expandToken = (value, decimals) => {
  return B(value).mul(B(10).pow(decimals));
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;

const power = (x, y) => {
  if (y === 0) {
    return 1;
  } else if (y % 2 === 0) {
    return power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  } else {
    return x * power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  }
};

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const config = Near.view(BURROW_CONTRACT, "get_config");

const account = Near.view(BURROW_CONTRACT, "get_account", {
  account_id: accountId,
});

console.log("INIT...", state);

if (!account) return <div>loading...</div>;

function getAdjustedSum(type) {
  if (!assets) return B(1);
  return account[type]
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

const adjustedCollateralSum = getAdjustedSum("collateral");
const adjustedBorrowedSum = getAdjustedSum("borrowed");

function getHealthFactor() {
  const healthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);
  return Number(healthFactor) < MAX_RATIO ? healthFactor : MAX_RATIO;
}

const healthFactor = getHealthFactor();

function getMaxAmount() {
  if (!selectedTokenId) return 0;
  const asset = assets.find((a) => a.token_id === selectedTokenId);
  const volatiliyRatio = asset.config.volatility_ratio || 0;
  const price = asset.price?.usd || Infinity;

  const available = Number(
    B(adjustedCollateralSum)
      .sub(B(adjustedBorrowedSum))
      .mul(volatiliyRatio)
      .div(MAX_RATIO)
      .div(price)
      .mul(95)
      .div(100)
      .toFixed(4)
  );
  return [available, (asset.price.usd * available).toFixed(2)];
}

const [available, availableUSD] = getMaxAmount();

const listAssets =
  assets &&
  assets
    ?.filter((a) => a.config.can_borrow)
    ?.map((asset) => {
      const { token_id, metadata } = asset;

      return <option value={token_id}>{metadata.symbol}</option>;
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

const handleBorrow = () => {
  if (!selectedTokenId || !amount || hasError) return;
  const asset = assets.find((a) => a.token_id === selectedTokenId);

  if (amount > available) {
    State.update({ selectedTokenId, amount, hasError: true });
    return;
  }

  const transactions = [];

  const expandedAmount = expandToken(
    amount,
    asset.metadata.decimals + asset.config.extra_decimals
  );

  const borrowTemplate = {
    Execute: {
      actions: [
        {
          Borrow: {
            token_id: selectedTokenId,
            amount: expandedAmount.toFixed(0),
          },
        },
        {
          Withdraw: {
            token_id: selectedTokenId,
            max_amount: expandedAmount.toFixed(0),
          },
        },
      ],
    },
  };

  const borrowTransaction = {
    contractName: config.oracle_account_id,
    methodName: "oracle_call",
    deposit: B("1").toFixed(),
    gas: expandToken(300, 12),
    args: {
      receiver_id: BURROW_CONTRACT,
      msg: JSON.stringify(borrowTemplate),
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

  transactions.push(borrowTransaction);

  if (
    ["wrap.near", "wrap.testnet"].includes(selectedTokenId) &&
    expandedAmount.gt(10)
  ) {
    transactions.push({
      contractName: selectedTokenId,
      methodName: "near_withdraw",
      deposit: B("1").toFixed(),
      args: {
        amount: expandedAmount.sub(10).toFixed(0),
      },
    });
  }

  console.log("transactions", transactions);
  Near.call(transactions);
};

const reward = rewards && rewards.find((a) => a.token_id === selectedTokenId);

return (
  <div class="card" style={{ maxWidth: "300px" }}>
    {!hasData && (
      <Widget src="ciocan.near/widget/Burrow.Data" props={{ onLoad }} />
    )}
    <div class="card-body d-grid gap-3">
      <h6>Health {healthFactor}%</h6>
      <select onChange={handleSelect}>
        <option value="">Borrow an asset</option>
        {listAssets}
      </select>
      {selectedTokenId && (
        <div>
          <div>
            Available: {available} (${availableUSD})
          </div>
          <div>APY: {toAPY(reward.apyBaseBorrow)}%</div>
        </div>
      )}
      <input type="number" value={amount} onChange={handleAmount} />
      {hasError && (
        <p class="alert alert-danger" role="alert">
          Amount greater than available
        </p>
      )}
      <button onClick={handleBorrow}>Borrow</button>
    </div>
  </div>
);
