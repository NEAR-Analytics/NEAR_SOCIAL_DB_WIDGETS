const ownerId = "manzanal.near";
const accountId = context.accountId;
const metapoolContract = "meta-pool.near";
const depositAndStakeFn = "deposit_and_stake";
const delayedUnstakeFn = "unstake";
const liquidUnstakeFn = "liquid_unstake";
const YOCTO = 1000000000000000000000000;
const GAS = "200000000000000";
const balanceUrl = `https://api.pikespeak.ai/account/balance/${accountId}}`;
const metricsUrl = "https://validators.narwallets.com/metrics_json";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const fetchBalance = fetch(balanceUrl, {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
});

const fetchMetrics = fetch(metricsUrl, {
  mode: "cors",
  subscribe: true,
});

if (!fetchBalance && fetchMetrics) return "Loading...";
console.log(fetchMetrics);

initState({
  tab: "stake",
  amount: 0.0,
  result: 0,
});
const submitMethod = {
  stake: depositAndStakeFn,
  delayedUnstakeFn: delayedUnstakeFn,
  fast: liquidUnstakeFn,
}[state.tab];

const submitArgs = {
  stake: {},
  delayedUnstakeFn: { amount: state.amount * YOCTO },
  fast: {
    st_near_to_burn: amount * YOCTO,
    min_expected_near: amount * YOCTO, // REVIEW
  },
}[state.tab];

const onSubmit = () => {
  const method = submitMethod;
  const args = submitArgs;
  const deposit = state.tab == "stake" ? state.amount * YOCTO : undefined;
  Near.call(metapoolContract, method, args, GAS, deposit);
};

const onClickTab = (tab) => {
  State.update({ tab });
};

const onClickMax = (tab) => {
  console.log("setting max balance", fetchBalance);
  State.update({ amount: fetchBalance.body[0].amount });
};

const onChangeNearAmount = (value) => {
  State.update({ amount: parseFloat(value) });
};
const propsData = {
  stakingSelector: {
    toggle3: {
      name: "Delayed Unstake",
      key: "delayed",
      icon: "bi-hourglass-split",
      disabled: false,
    },
    toggle2: {
      name: "Fast Unstake",
      key: "fast",
      icon: "bi-fast-forward-fill",
      disabled: false,
    },
    toggle1: {
      icon: "bi-arrow-bar-up",
      key: "stake",
      name: "Stake",
      disabled: false,
    },
  },
  input: {
    title: "NEAR Amount",
    button: {
      size: "lg",
      children: "Max",
    },
  },
  input1: {
    token: "stNEAR",
    title: "You’ll get",
  },
  stakeButton: {
    active: true,
    disabled: false,
    children: "Stake now",
  },
  desktopNotification: {
    informationFilled: informationFilled,
    rewardsDistributedEvery24Hou: "Rewards distributed every 24 hours",
  },
};
const Calculator = styled.div`
    border: 1px solid #c0c5c1;
    border-radius: 16px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 32px;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 32px;
    padding-bottom: 32px;
  `;
const Frame = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  `;
const FrameButton = styled.div`
    background-color: #0C2246;
    display: flex;
    flex-direction: column;
    padding: 8px 24px;
    gap: 8px;
    color: ##FFFFFF;
    border-radius: 1000px;
    margin-top: 24px;
`;
return (
  <Calculator>
    <Frame>
      {" "}
      <Widget
        src={`${ownerId}/widget/LiquidStake.Selector`}
        props={{
          active: state.tab,
          ...propsData.stakingSelector,
          onClickTab: onClickTab,
        }}
      />
      <Widget
        src={`${ownerId}/widget/LiquidStake.StakeInput`}
        props={{
          ...propsData.input,
          value: state.amount,
          onClickMax,
          onChange: onChangeNearAmount,
        }}
      />
      <Widget
        src={`${ownerId}/widget/LiquidStake.StakeResult`}
        props={{
          ...propsData.input1,
          amount: (
            state.amount / parseFloat(fetchMetrics.body.st_near_price)
          ).toFixed(2),
        }}
      />
      <FrameButton>
        <button
          class="btn text-white"
          type="button"
          onClick={onSubmit}
          {...propsData.stakeButton}
        />
      </FrameButton>
    </Frame>
  </Calculator>
);
