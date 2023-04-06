let MAX_RATIO = 10_000;
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;

let B = Big();
B.DP = 60; // set precision to 60 decimals

const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));

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

if (!accountId) {
  return <Widget src="ciocan.near/widget/account-signin" />;
}

const config = Near.view(BURROW_CONTRACT, "get_config");

const account = Near.view(BURROW_CONTRACT, "get_account", {
  account_id: accountId,
});

if (!account) return <div>loading...</div>;

// sum all assets to get the health factor
// https://github.com/burrowfdn/burrowland for detailed explanation
function getAdjustedSum(type, account) {
  if (!assets) return B(1);

  return account[type]
    .map((assetInAccount) => {
      const asset = assets.find((a) => a.token_id === assetInAccount.token_id);
      const hasPrice = asset.price?.multiplier && asset.price?.decimals;

      const price = hasPrice
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
    .reduce((sum, cur) => B(sum).plus(B(cur)), 1)
    .toFixed();
}

const adjustedCollateralSum = getAdjustedSum("collateral", account);
const adjustedBorrowedSum = getAdjustedSum("borrowed", account);

function getHealthFactor() {
  const healthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toFixed(0);
  return Number(healthFactor) < MAX_RATIO ? healthFactor : MAX_RATIO;
}

const healthFactor = getHealthFactor();

const recomputeHealthFactor = (tokenId, amount) => {
  if (!tokenId || !amount) return null;
  const asset = assets.find((a) => a.token_id === tokenId);
  const decimals = asset.metadata.decimals + asset.config.extra_decimals;
  const accountBorrowedAsset = account.borrowed.find(
    (a) => a.token_id === tokenId
  );

  const newBalance = expandToken(amount, decimals)
    .plus(B(accountBorrowedAsset?.balance || 0))
    .toFixed();

  const clonedAccount = clone(account);

  const updatedToken = {
    token_id: tokenId,
    balance: newBalance,
    shares: newBalance,
    apr: "0",
  };

  if (clonedAccount?.borrowed.length === 0) {
    clonedAccount.borrowed = updatedToken;
  } else if (!accountBorrowedAsset) {
    clonedAccount.borrowed.push(updatedToken);
  } else {
    clonedAccount.borrowed = [
      ...clonedAccount.borrowed.filter((a) => a.token_id !== tokenId),
      updatedToken,
    ];
  }

  const adjustedCollateralSum = getAdjustedSum("collateral", account);
  const adjustedBorrowedSum = getAdjustedSum(
    "borrowed",
    amount === 0 ? account : clonedAccount
  );

  const newHealthFactor = B(adjustedCollateralSum)
    .div(B(adjustedBorrowedSum))
    .mul(100)
    .toNumber();

  return newHealthFactor;
};

// get max ammount can be borrowed
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

// get the storage deposit for a token
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

const handleBlur = (e) => {
  State.update({
    newHealthFactor: recomputeHealthFactor(selectedTokenId, amount),
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

  Near.call(transactions);
};

const reward = rewards && rewards.find((a) => a.token_id === selectedTokenId);

const newHealthFactor = state.newHealthFactor
  ? state.newHealthFactor?.toFixed()
  : undefined;

return (
  <div style={{ maxWidth: "300px" }}>
    {!hasData && (
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
    )}
    <div class="card-body d-grid gap-3">
      <div>
        <div class="mb-2 text-muted">From</div>
        <select
          onChange={handleSelect}
          class="p-2 mb-1"
          style={{ width: "100%" }}
        >
          <option value="">Borrow an asset</option>
          {listAssets}
        </select>
        {selectedTokenId && (
          <div>
            <span class="badge bg-light text-dark">
              {available} (${availableUSD}) available
            </span>
            <span class="badge bg-light text-dark">
              {toAPY(reward.apyBaseBorrow)}% APY
            </span>
          </div>
        )}
      </div>
      <div>
        <div class="mb-2 text-muted">Amount</div>
        <input
          type="number"
          value={amount}
          onChange={handleAmount}
          onBlur={handleBlur}
        />
        {hasError && (
          <p class="alert alert-danger" role="alert">
            Amount greater than available
          </p>
        )}
      </div>
      <div>
        <span class="badge bg-light text-dark">
          {healthFactor}% health{" "}
          {newHealthFactor && <span>(after borrow: {newHealthFactor}%)</span>}
        </span>
      </div>
      <button
        onClick={handleBorrow}
        style={{ background: "#4ED58A", borderColor: "white" }}
      >
        Borrow
      </button>
    </div>
  </div>
);
