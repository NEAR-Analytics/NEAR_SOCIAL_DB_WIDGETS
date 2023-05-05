/** state init start */
State.init({
  inputValue: "",
  inputError: "",
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

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

/** common lib end */
function getRefBalance(accountId) {
  const balanceRaw = Near.view(config.REF_TOKEN_ID, "ft_balance_of", {
    account_id: accountId,
  });
  if (!balanceRaw) return "-";
  const balance = Big(balanceRaw).div(Big(10).pow(REF_DECIMALS));
  return balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
}
function getRate() {
  const rateRow = Near.view(config.XREF_TOKEN_ID, "get_virtual_price");
  const rate = Big(rateRow)
    .div(Big(10).pow(DECIMALS_XREF_REF_TRANSTER))
    .toFixed();
  return rate;
}

const refBalance = getRefBalance(accountId);
const refToxrefRate = getRate();
/** events start */
const onChange = (e) => {
  // Has user signed in?
  if (!isSignedIn) {
    State.update({
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
    refBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).gt(Big(refBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0)
    ) {
      State.update({
        inputValue: stakeAmount,
        inputError: "Stake at least greater than zero REF",
      });
    } else {
      State.update({
        inputValue: stakeAmount,
        inputError: `Max is ${refBalance} REF`,
      });
    }
    return;
  }
  State.update({
    inputValue: stakeAmount,
    inputError: "",
  });
};

const onClickMax = () => {
  if (
    isNaN(Number(refBalance)) ||
    refBalance === "" ||
    Big(refBalance).lte(0)
  ) {
    State.update({
      inputValue: refBalance,
      inputError: "Stake at least greater than zero REF",
    });
    return;
  } else {
    State.update({
      inputValue: refBalance,
      inputError: "",
    });
  }
};

const onClickStake = async () => {
  const stakeAmount = state.inputValue;
  if (
    refBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0) ||
      Big(stakeAmount).gt(Big(refBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0)
    ) {
      State.update({ inputError: "Stake at least greater than zero REF" });
    } else if (Big(stakeAmount).gt(Big(refBalance))) {
      State.update({
        inputError: `Max is ${refBalance} REF`,
      });
    } else setInputError("");
    return;
  }
  Near.call(
    config.contractId,
    "deposit_and_stake",
    {},
    undefined,
    Big(state.inputValue).mul(Big(10).pow(NEAR_DECIMALS)).toFixed(0)
  );
  // check and update balance
  const interval = setInterval(() => {
    const balance = getRefBalance(accountId);
    if (balance !== refBalance) {
      clearInterval(interval);
      State.update({
        inputValue: "",
        inputError: "",
        refBalance: balance,
      });
    }
  }, 500);
};
/** events end */

const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;

const youWillReceive = (
  Big(refToxrefRate || 0).lte(0)
    ? Big(0)
    : Big(isValid(state.inputValue) ? state.inputValue : 0).div(refToxrefRate)
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
        firstIconName: "REF",
        firstIconUrl:
          "https://ipfs.near.social/ipfs/bafkreiauvwi7qjcy2ddzcjobr274vshstk7up22fnr3dbul2lypp755j44",
        secondIconName: "xREF",
        secondIconUrl:
          "https://ipfs.near.social/ipfs/bafkreierdf2ykpfcctanlt7s5xcd5jp7cydnvm3vztdl7ywlwowvuspg4e",
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
          balance: refBalance,
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Button`}
        props={{
          onClick: onClickStake,
          disabled: disabledStakeButton,
          text: "Stake",
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Message.YouWillReceive`}
        props={{ text: `${youWillReceive} xREF` }}
      />
    </div>
    <Widget
      src={`${config.ownerId}/widget/LiNEAR.Tab`}
      props={{
        updateTabName: props.updateTabName,
        tabName: "stake",
      }}
    ></Widget>
  </StakeFormWrapper>
);
