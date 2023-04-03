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
`;
/** base tool start  */
let MAX_RATIO = 10_000;
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;
let B = Big();
B.DP = 60; // set precision to 60 decimals

const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
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
const nFormat = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
const selectedTokenId = props.selectedTokenId;
const { rewards, account, balances, amount, hasError, assets } = state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
/** base tool end */
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const config = Near.view(BURROW_CONTRACT, "get_config");
const onLoad = (data) => {
  State.update(data);
};
const rewardsMap = rewards
  ? rewards.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
const assetsMap = assets
  ? assets.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
/** logic start */
function getAdjustedSum(type, account) {
  if (!assets || !account || account[type].length == 0) return B(1);
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
  console.log(clonedAccount);
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
  if (!selectedTokenId || !assets) return 0;
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

const storageBurrow = Near.view(BURROW_CONTRACT, "storage_balance_of", {
  account_id: accountId,
});

// get the storage deposit for a token
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
/** logic end */
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    <div class="content">
      <input
        type="number"
        value={amount}
        onChange={handleAmount}
        onBlur={handleBlur}
      />
      {selectedTokenId && (
        <span class="balance">
          Balance: {available} (${availableUSD})
        </span>
      )}
      {hasError && (
        <p class="alert alert-danger mt-10" role="alert">
          Amount greater than available
        </p>
      )}
      <div class="template mt_25">
        <span class="title">Borrow APY</span>
        <span class="value">
          {selectedTokenId && <>{toAPY(reward.apyBaseBorrow)}%</>}
        </span>
      </div>
      <div class="template mt_25">
        <span class="title">Health Factor</span>
        <span class="value">{newHealthFactor && newHealthFactor + "%"}</span>
      </div>
      <div class="greenButton mt_25" onClick={handleBorrow}>
        Borrow
      </div>
    </div>
  </Container>
);
