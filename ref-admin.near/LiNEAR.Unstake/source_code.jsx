/** state init start */
State.init({
  unstakeMax: false,
  inputValue: "",
  inputError: "",
  unstakeType: "instant", // instant | delayed
  showConfirmInstantUnstake: false,
  showConfirmDelayedUnstake: false,
  swapEstimate: {},
  swapAmountIn: "",
  swapAmountOut: "",
});
/** state init end */

// load config
const config = props.config;
if (!config) {
  return "Component not be loaded. Missing `config` props";
}
/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const LiNEAR_DECIMALS = 24;
const SLIPPAGE_TOLERANCE = 0.05;
const BIG_ROUND_DOWN = 0;
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}
function formatAmount(a) {
  return isValid(a)
    ? Number(a).toLocaleString(undefined, {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      })
    : a;
}
/** common lib end */
function getLinearBalance(accountId) {
  const linearBalanceRaw = Near.view(config.contractId, "ft_balance_of", {
    account_id: accountId,
  });
  if (!linearBalanceRaw) return "-";
  const balance = Big(linearBalanceRaw).div(Big(10).pow(LiNEAR_DECIMALS));
  return balance.lt(0) ? "0" : balance.toFixed();
}
const linearBalance = getLinearBalance(accountId);
const formattedLinearBalance =
  linearBalance === "-" ? "-" : Big(linearBalance).toFixed(5, BIG_ROUND_DOWN);

const linearPrice = Big(
  Near.view(config.contractId, "ft_price", `{}`) ?? "0"
).div(Big(10).pow(24));
const nearPriceInLiNEAR = linearPrice.eq(0)
  ? "1"
  : Big(1).div(linearPrice).toFixed(5, BIG_ROUND_DOWN);

function getReceivedDelayedUnstakeNear() {
  const { unstakeMax, inputValue } = state;
  if (!isValid(linearBalance) || !isValid(inputValue)) {
    return "-";
  }
  const delayedUnstakeLiNear = unstakeMax ? linearBalance : inputValue;
  const _delayedUnstakeNear = Big(delayedUnstakeLiNear)
    .times(linearPrice)
    .toFixed(5);
  return _delayedUnstakeNear;
}
function getReceivedInstantUnstakeNear() {
  const { inputValue, swapAmountOut } = state;
  if (
    !isValid(linearBalance) ||
    !isValid(inputValue) ||
    !isValid(swapAmountOut)
  ) {
    return "-";
  }
  return Big(swapAmountOut)
    .mul(1 - Number(SLIPPAGE_TOLERANCE) / 100)
    .toFixed(5);
}
const receivedDelayedUnstakeNear = getReceivedDelayedUnstakeNear();
const receivedInstantUnstakeNear = getReceivedInstantUnstakeNear();
const formattedReceivedDelayedUnstakeNear = formatAmount(
  receivedDelayedUnstakeNear
);
const formattedReceivedInstantUnstakeNear = formatAmount(
  receivedInstantUnstakeNear
);
const UNSTAKE_DIFF_ERROR_RATIO = 0.05;
const IMPACT_TOO_HIGH_ERROR = "Price impact high. Unstake less or try later";
const validReceivedUnstakeAmount =
  isValid(receivedDelayedUnstakeNear) &&
  isValid(receivedInstantUnstakeNear) &&
  receivedDelayedUnstakeNear > 0 &&
  receivedInstantUnstakeNear > 0 &&
  state.inputValue === state.swapAmountIn; // compare received NEAR only if the input amounts matches

if (
  state.unstakeType === "instant" &&
  !state.inputError &&
  validReceivedUnstakeAmount &&
  Big(receivedDelayedUnstakeNear)
    .minus(receivedInstantUnstakeNear)
    .div(receivedDelayedUnstakeNear)
    .gt(UNSTAKE_DIFF_ERROR_RATIO)
) {
  State.update({
    inputError: IMPACT_TOO_HIGH_ERROR,
  });
} else if (
  state.inputError === IMPACT_TOO_HIGH_ERROR &&
  (state.unstakeType !== "instant" ||
    (validReceivedUnstakeAmount &&
      Big(receivedDelayedUnstakeNear)
        .minus(receivedInstantUnstakeNear)
        .div(receivedDelayedUnstakeNear)
        .lte(UNSTAKE_DIFF_ERROR_RATIO)))
) {
  State.update({
    inputError: "",
  });
}
/** events start */
const onChange = (e) => {
  // Has user signed in?
  if (!isSignedIn) {
    State.update({
      unstakeMax: false,
      inputError: "Sign in please",
    });
    return;
  }
  const targetValue = e.target.value;
  if (targetValue !== "" && !targetValue.match(/^\d*(\.\d*)?$/)) {
    return;
  }
  let unstakeAmount = targetValue.replace(/^0+/, "0"); // remove prefix 0
  // limit 24 decimals
  const most24DecimalsPattern = /^-?\d+(\.\d{0,24})?/;
  let values = unstakeAmount.match(most24DecimalsPattern);
  if (values) {
    unstakeAmount = values[0];
  }
  if (
    linearBalance &&
    (isNaN(Number(unstakeAmount)) ||
      unstakeAmount === "" ||
      Big(unstakeAmount).lt(nearPriceInLiNEAR) ||
      Big(unstakeAmount).gt(Big(linearBalance)))
  ) {
    if (
      isNaN(Number(unstakeAmount)) ||
      unstakeAmount === "" ||
      Big(unstakeAmount).lt(nearPriceInLiNEAR)
    ) {
      State.update({
        unstakeMax: false,
        onClickMax: false,
        inputValue: unstakeAmount,
        inputError: `Stake at least ${nearPriceInLiNEAR} LiNEAR`,
      });
    } else {
      State.update({
        unstakeMax: false,
        onClickMax: false,
        inputValue: unstakeAmount,
        inputError: `Max is ${formattedLinearBalance} LiNEAR`,
      });
    }
    return;
  }
  State.update({
    unstakeMax: false,
    inputValue: unstakeAmount,
    inputError: "",
  });
};
const onClickMax = () => {
  if (
    isNaN(Number(linearBalance)) ||
    linearBalance === "" ||
    Big(linearBalance).lt(nearPriceInLiNEAR)
  ) {
    State.update({
      unstakeMax: true,
      inputValue: formattedLinearBalance,
      inputError: `Stake at least ${nearPriceInLiNEAR} NEAR`,
    });
    return;
  } else {
    State.update({
      unstakeMax: true,
      inputValue: formattedLinearBalance,
      inputError: "",
    });
  }
};
const onClickUnstake = async () => {
  const { inputValue, unstakeMax, unstakeType, swapAmountOut } = state;
  const amount = Big(inputValue)
    .times(linearPrice)
    .times(Big(10).pow(LiNEAR_DECIMALS))
    .toFixed(0);

  if (unstakeType === "instant") {
    callRefSwapTx(
      TOKEN_LINEAR,
      TOKEN_NEAR,
      inputValue,
      swapAmountOut,
      SLIPPAGE_TOLERANCE
    );
  } else {
    if (unstakeMax) {
      Near.call(config.contractId, "unstake_all", {});
    } else {
      Near.call(config.contractId, "unstake", {
        amount,
      });
    }
  }
};
// Ref swap constants and functions
// token in and token out of swap
const TOKEN_LINEAR = { id: config.contractId, decimals: LiNEAR_DECIMALS };
const TOKEN_NEAR = { id: "NEAR", decimals: NEAR_DECIMALS };
const REF_EXCHANGE_CONTRACT_ID = "v2.ref-finance.near";
const WNEAR_CONTRACT_ID = "wrap.near";
// Forked from weige.near/widget/ref-swap
const registered = Near.view(WNEAR_CONTRACT_ID, "storage_balance_of", {
  account_id: accountId,
});
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const callRefSwapTx = (
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippageTolerance
) => {
  const tx = [];
  const nearDeposit = {
    contractName: WNEAR_CONTRACT_ID,
    methodName: "near_deposit",
    deposit: expandToken(amountIn, 24).toFixed(),
    gas: expandToken(50, 12),
  };
  const nearWithdraw = {
    contractName: WNEAR_CONTRACT_ID,
    methodName: "near_withdraw",
    deposit: new Big("1").toFixed(),
    args: {
      amount: expandToken(amountIn, 24).toFixed(),
    },
  };
  if (state.swapEstimate.pool === "wrap") {
    if (tokenIn.id === "NEAR") {
      tx.push(nearDeposit);
    } else {
      tx.push(nearWithdraw);
    }
    return Near.call(tx);
  }
  if (registered === null) {
    tx.push({
      contractName: tokenOut.id === "NEAR" ? WNEAR_CONTRACT_ID : tokenOut.id,
      methodName: "storage_deposit",
      deposit: expandToken(0.1, 24).toFixed(),
      gas: expandToken(50, 12),
      args: {
        registration_only: true,
        account_id: accountId,
      },
    });
  }
  if (tokenIn.id === "NEAR") {
    tx.push(nearDeposit);
  }
  const minAmountOut = expandToken(
    new Big(amountOut)
      .mul(1 - Number(slippageTolerance) / 100)
      .toFixed(tokenOut.decimals, 0),
    tokenOut.decimals
  ).toFixed();
  tx.push({
    methodName: "ft_transfer_call",
    contractName: tokenIn.id === "NEAR" ? WNEAR_CONTRACT_ID : tokenIn.id,
    gas: expandToken(180, 12),
    deposit: new Big("1").toFixed(),
    args: {
      receiver_id: REF_EXCHANGE_CONTRACT_ID,
      amount: expandToken(amountIn, tokenIn.decimals).toFixed(0, 0),
      msg: JSON.stringify({
        actions: [
          {
            pool_id: Number(state.swapEstimate.pool.id),
            token_in: tokenIn.id === "NEAR" ? WNEAR_CONTRACT_ID : tokenIn.id,
            token_out: tokenOut.id === "NEAR" ? WNEAR_CONTRACT_ID : tokenOut.id,
            amount_in: expandToken(amountIn, tokenIn.decimals).toFixed(0, 0),
            min_amount_out: minAmountOut,
          },
        ],
      }),
    },
  });
  if (tokenOut.id === "NEAR") {
    tx.push({
      contractName: WNEAR_CONTRACT_ID,
      methodName: "near_withdraw",
      deposit: new Big("1").toFixed(),
      args: {
        amount: minAmountOut,
      },
    });
  }
  Near.call(tx);
};
/** events end */
const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;
const StakeFormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding-top: 10px;
  background: #1A2E33;
  border-radius: 16px;
  margin-top:20px;
  padding-bottom:20px;
  .contentArea{
    background: #142427;
    border-radius: 16px;
    padding:20px 30px;
  }
`;

return (
  <StakeFormWrapper>
    <Widget
      src={`${config.ownerId}/widget/stake-bannerIcon`}
      props={{
        firstIconName: "LiNEAR",
        firstIconUrl:
          "https://ipfs.near.social/ipfs/bafkreie2nqrjdjka3ckf4doocsrip5hwqrxh37jzwul2nyzeg3badfl2pm",
        secondIconName: "NEAR",
        secondIconUrl:
          "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
        componentType: "liNEAR",
      }}
    ></Widget>
    <div style={{ display: "none" }}>
      <Widget
        src={`${config.ownerId}/widget/Ref.ref-swap-getEstimate`}
        props={{
          config,
          tokenIn: TOKEN_LINEAR,
          tokenOut: TOKEN_NEAR,
          amountIn: state.inputValue || 0,
          loadRes: (value) => {
            State.update({
              swapEstimate: value,
              swapAmountIn: value === null ? "" : value.amountIn,
              swapAmountOut: value === null ? "" : value.estimate,
            });
          },
        }}
      />
    </div>
    <div class="contentArea">
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Input`}
        props={{
          placeholder: "0",
          value: state.inputValue,
          onChange,
          onClickMax,
          inputError: state.inputError,
          balance: `${formattedLinearBalance}`,
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Button`}
        props={{
          onClick: onClickUnstake,
          disabled: disabledStakeButton,
          text: "Unstake",
          type: "outline",
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Message.YouWillReceive`}
        props={{ text: `${formattedReceivedInstantUnstakeNear} NEAR` }}
      />
    </div>
    <Widget
      src={`${config.ownerId}/widget/LiNEAR.Tab`}
      props={{
        updateTabName: props.updateTabName,
        tabName: "unstake",
      }}
    ></Widget>
  </StakeFormWrapper>
);
