/** state init start */
State.init({
  inputValue: "",
  inputError: "",
  unstakeMax: false,
});
/** state init end */
// load config
const config = props.config;
if (!config) {
  return "Component not be loaded. Missing `config` props";
}

const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const REF_DECIMALS = 18;
const XREF_DECIMALS = 18;
const DECIMALS_XREF_REF_TRANSTER = 8;
const BIG_ROUND_DOWN = 0;
const storageToken = Near.view(config.REF_TOKEN_ID, "storage_balance_of", {
  account_id: accountId,
});
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed();
};
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals)).toFixed();
};
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

/** common lib end */
function getxRefBalance(accountId) {
  const balanceRaw = Near.view(config.XREF_TOKEN_ID, "ft_balance_of", {
    account_id: accountId,
  });
  if (!balanceRaw) return "-";
  const balance = Big(balanceRaw).div(Big(10).pow(XREF_DECIMALS));
  return [
    balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN),
    balance.lt(0) ? "0" : balance.toFixed(),
  ];
}
function getRate() {
  const rateRow = Near.view(config.XREF_TOKEN_ID, "get_virtual_price");
  const rate = Big(rateRow)
    .div(Big(10).pow(DECIMALS_XREF_REF_TRANSTER))
    .toFixed();
  return rate;
}

const [xrefBalance, xrefBalanceWhole] = getxRefBalance(accountId);
const refToxrefRate = getRate();
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
  let stakeAmount = targetValue.replace(/^0+/, "0"); // remove prefix 0
  // limit 18 decimals
  const most18DecimalsPattern = /^-?\d+(\.\d{0,18})?/;
  let values = stakeAmount.match(most18DecimalsPattern);
  if (values) {
    stakeAmount = values[0];
  }
  if (
    xrefBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).gt(Big(xrefBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0)
    ) {
      State.update({
        unstakeMax: false,
        inputValue: stakeAmount,
        inputError: "Stake at least greater than zero xREF",
      });
    } else {
      State.update({
        unstakeMax: false,
        inputValue: stakeAmount,
        inputError: `Max is ${xrefBalance} REF`,
      });
    }
    return;
  }
  State.update({
    unstakeMax: false,
    inputValue: stakeAmount,
    inputError: "",
  });
};

const onClickMax = () => {
  if (
    isNaN(Number(xrefBalance)) ||
    xrefBalance === "" ||
    Big(xrefBalance).lte(0)
  ) {
    State.update({
      unstakeMax: true,
      inputValue: xrefBalance,
      inputError: "Stake at least greater than zero xREF",
    });
    return;
  } else {
    State.update({
      unstakeMax: true,
      inputValue: xrefBalance,
      inputError: "",
    });
  }
};

const onClickUnStake = async () => {
  const { inputValue, unstakeMax } = state;
  const stakeAmount = inputValue;
  if (
    xrefBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0) ||
      Big(stakeAmount).gt(Big(xrefBalanceWhole)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0)
    ) {
      State.update({ inputError: "Stake at least greater than zero xREF" });
    } else if (Big(stakeAmount).gt(Big(xrefBalanceWhole))) {
      State.update({
        inputError: `Max is ${xrefBalance} xREF`,
      });
    } else {
      State.update({
        inputError: "",
      });
    }
    return;
  }
  const transactions = [
    {
      contractName: config.XREF_TOKEN_ID,
      methodName: "unstake",
      args: {
        amount: expandToken(
          unstakeMax ? xrefBalanceWhole : stakeAmount,
          XREF_DECIMALS
        ),
        msg: "",
      },
      deposit: new Big("1").toFixed(),
      gas: expandToken(50, 12),
    },
  ];
  if (!storageToken || storageToken.total === "0") {
    transactions.unshift({
      contractName: config.REF_TOKEN_ID,
      methodName: "storage_deposit",
      args: {
        account_id: accountId,
        registration_only: true,
      },
      deposit: expandToken(0.0125, 24),
      gas: expandToken(50, 12),
    });
  }
  Near.call(transactions);
};
/** events end */

const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;

const youWillReceive = (
  Big(refToxrefRate || 0).lte(0)
    ? Big(0)
    : Big(isValid(state.inputValue) ? state.inputValue : 0).mul(refToxrefRate)
).toFixed(5, BIG_ROUND_DOWN);
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
        firstIconName: "xREF",
        firstIconUrl:
          "https://ipfs.near.social/ipfs/bafkreierdf2ykpfcctanlt7s5xcd5jp7cydnvm3vztdl7ywlwowvuspg4e",
        secondIconName: "REF",
        secondIconUrl:
          "https://ipfs.near.social/ipfs/bafkreiauvwi7qjcy2ddzcjobr274vshstk7up22fnr3dbul2lypp755j44",
        componentType: "xref",
      }}
    ></Widget>
    <div class="contentArea">
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Input`}
        props={{
          placeholder: "0",
          value: state.inputValue,
          onChange,
          onClickMax,
          inputError: state.inputError,
          balance: xrefBalance,
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Button`}
        props={{
          onClick: onClickUnStake,
          disabled: disabledStakeButton,
          text: "Unstake",
          type: "outline",
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Message.YouWillReceive`}
        props={{ text: `${youWillReceive} REF` }}
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
