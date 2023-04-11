let accountId = context.accountId;
const showDust = props.showDust ?? true;
const balanceDecimals = showDust ? 24 : 4;
const showAPY = props.showAPY ?? false;

const NEAR_LOGO = `data:image/svg+xml,%3Csvg width='35' height='35' fill='none' xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv' focusable='false' aria-hidden='true' viewBox='0 0 35 35' style='width: 35px; height: 35px; filter: invert(100%25);'%3E%3Ccircle cx='17.5' cy='17.5' r='17.5' fill='%23fff'%3E%3C/circle%3E%3Cpath d='m24.027 9.022-4.174 6.2c-.288.422.267.934.666.578l4.107-3.578c.111-.089.266-.022.266.134v11.177c0 .156-.2.223-.288.111L12.174 8.756A2.053 2.053 0 0 0 10.552 8h-.444C8.954 8 8 8.956 8 10.133v15.734C8 27.044 8.954 28 10.131 28a2.14 2.14 0 0 0 1.82-1.022l4.173-6.2c.289-.422-.266-.934-.666-.578l-4.106 3.556c-.111.088-.267.022-.267-.134V12.467c0-.156.2-.223.289-.111l12.43 14.888c.4.49 1 .756 1.621.756h.444A2.133 2.133 0 0 0 28 25.867V10.133A2.133 2.133 0 0 0 25.869 8a2.15 2.15 0 0 0-1.842 1.022Z' fill='%23000'%3E%3C/path%3E%3C/svg%3E`;
const BURROW_CONTRACT = "contract.main.burrow.near";

if (!accountId) {
  return <Widget src="ciocan.near/widget/account-signin" />;
}

const toAPY = (v) => Math.round(v * 100) / 100;

const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};

const { assets, rewards, account } = state;

const hasData = assets.length > 0 && rewards.length > 0 && account;

const onLoad = (data) => {
  State.update(data);
};

const handleRepay = (selectedTokenId, borrowed, type) => {
  const asset = assets.find((a) => a.token_id === selectedTokenId);

  const repayTemplate = {
    Execute: {
      actions: [
        {
          Repay: {
            token_id: selectedTokenId,
          },
        },
      ],
    },
  };

  const expandToken = (value, decimals) => {
    return new Big(value).mul(new Big(10).pow(decimals));
  };

  console.log(borrowed, asset);

  let expandedAmount = //expandToken(
    new Big(borrowed)
      .div(new Big(10).pow(asset.config.extra_decimals))
      .mul(new Big(1).add(new Big(30).div(new Big(365).mul(24).mul(60))));

  if (expandedAmount.toFixed(0) == "0") {
    expandedAmount = new Big(1);
  }

  let repayTransaction;
  if (type === "supply") {
    repayTransaction = {
      contractName: BURROW_CONTRACT,
      methodName: "execute",

      deposit: new Big("1").toFixed(),
      gas: "300000000000000",
      args: {
        receiver_id: BURROW_CONTRACT,
        actions: [
          {
            Repay: {
              token_id: selectedTokenId,
            },
          },
        ],
      },
    };
  } else if (type === "wallet") {
    repayTransaction = {
      contractName: selectedTokenId,
      methodName: "ft_transfer_call",

      deposit: new Big("1").toFixed(),
      gas: "300000000000000",
      args: {
        receiver_id: BURROW_CONTRACT,
        amount: expandedAmount.toFixed(0),
        msg: JSON.stringify(repayTemplate),
      },
    };
  }

  const transactions = [];
  transactions.push(repayTransaction);
  Near.call(transactions);
};

const depositedAssets = hasData
  ? new Set([
      ...account.supplied.map((a) => a.token_id),
      //...account.collateral.map((a) => a.token_id),
    ])
  : new Set();

const deposits = [];
// get portfolio deposited assets
const suppliedAssets = hasData
  ? [...depositedAssets].map((depositedTokenId) => {
      const asset = assets.find((a) => a.token_id === depositedTokenId);

      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;

      const supplied = account.supplied.find(
        (s) => s.token_id === depositedTokenId
      );

      const depositedBalance = supplied
        ? Number(shrinkToken(supplied.balance, decimals))
        : 0;

      /*
      const collateral = account.collateral.find(
        (c) => c.token_id === depositedTokenId
      );

      const collateralBalance = collateral
        ? Number(shrinkToken(collateral.balance, decimals))
        : 0;*/

      const totalBalance = depositedBalance; // + collateralBalance;
      deposits[depositedTokenId] = totalBalance;
      const usd = totalBalance * asset.price.usd;
      const icon = asset.metadata.icon ?? NEAR_LOGO;
      return (
        <tr>
          <td>
            <img src={icon} style={{ width: 24, marginRight: 10 }} />
          </td>
          <td class="text-end">{toAPY(totalApy)}%</td>
          <td class="text-end">{totalBalance.toFixed(balanceDecimals)}</td>
          <td class="text-end">${usd.toFixed(2)}</td>
        </tr>
      );
    })
  : undefined;

console.log(account.borrowed);

// get portfolio borrowed assets
const borrowedAssets = hasData
  ? account.borrowed.map((borrowedAsset) => {
      const asset = assets.find((a) => a.token_id === borrowedAsset.token_id);
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBaseBorrow;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;
      const borrowed = Number(shrinkToken(borrowedAsset.balance, decimals));
      const usd = borrowed * asset.price.usd;

      const depositedAsset = deposits[borrowedAsset.token_id] ?? 0;
      const depositedBalance = Number(depositedAsset); //shrinkToken(depositedAsset, decimals);
      const borrowedMinusDepositedBalance = borrowed - depositedBalance;

      return (
        <tr>
          <td>
            <img
              src={asset.metadata.icon ?? NEAR_LOGO}
              style={{ width: 24, marginRight: 10 }}
            />
            <span>{asset.metadata.symbol}</span>
          </td>
          {showAPY ? <td class="text-end">{toAPY(totalApy)}%</td> : <></>}
          <td class="text-end">{borrowed.toFixed(balanceDecimals)}</td>
          <td class="text-end">${usd.toFixed(2)}</td>
          <td class="text-end">{depositedAsset.toFixed(balanceDecimals)}</td>
          <td class="text-end">
            <button
              disabled={borrowedMinusDepositedBalance > 0}
              onClick={() => {
                handleRepay(borrowedAsset.token_id, 0, "supply");
              }}
            >
              Repay from supplied
            </button>

            <button
              onClick={() => {
                handleRepay(
                  borrowedAsset.token_id,
                  borrowedAsset.balance,
                  "wallet"
                );
              }}
            >
              Repay from wallet
            </button>
          </td>
        </tr>
      );
    })
  : undefined;

return (
  <div>
    {!hasData && (
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
    )}
    {false && (
      <>
        <table class="table">
          <thead>
            <tr
              style={{
                color: "rgba(0, 0, 0, 0.4)",
              }}
            >
              <th scope="col">Deposited Assets</th>
              {showAPY && (
                <th scope="col" class="text-end">
                  APY
                </th>
              )}
              <th scope="col" class="text-end">
                Deposited
              </th>
              <th scope="col" class="text-end">
                $
              </th>
            </tr>
          </thead>
          <tbody>{suppliedAssets}</tbody>
        </table>
      </>
    )}
    <h3>Repay Burrow debts without oracle calls</h3>
    <table class="table">
      <thead>
        <tr
          style={{
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <th scope="col">Borrowed Assets</th>
          {showAPY && (
            <th scope="col" class="text-end">
              APY
            </th>
          )}
          <th scope="col" class="text-end">
            Borrowed
          </th>
          <th scope="col" class="text-end">
            $
          </th>
          <th scope="col" class="text-end">
            Supplied
          </th>
          <th scope="col" class="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>{borrowedAssets}</tbody>
    </table>
    <p class="text-secondary">
      <small>
        <span class="fw-bolder">Repay from supplied</span> feature spends only
        supplied assets, not collateral.
      </small>
    </p>
    <p class="text-secondary fs-6">
      <small>
        <span class="fw-bolder">Repay from wallet</span> feature adds requires
        FT token on your wallet. Since the debt is constantly growing, this
        feature slightly increases the deposit to compensate for the delay
        during which the transaction takes place. It is assumed that the
        transaction will be completed no later than 30 minutes after loading
        this page.
      </small>
    </p>
  </div>
);
