const network = props.network || "mainnet";
const ownerId = "manzanal.near";
const metapoolContract = "meta-pool.near";
const accountId = context.accountId;
const depositAndStakeFn = "deposit_and_stake";
const delayedUnstakeFn = "unstake";
const liquidUnstakeFn = "liquid_unstake";
const YOCTO = 1000000000000000000000000;
const GAS = "200000000000000";
const balanceUrl = `https://api.pikespeak.ai/account/balance/${accountId}`;
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
console.log("balance", fetchBalance);

initState({
  tab: "stake",
  amount: 0.0,
  result: 0,
});
const feeBasisPoint = 30; // HARDCODED FOR NOW - in basis points

const getLiquidUnstakeFee = feeBasisPoint / 100;

const submitProps = {
  stake: { method: depositAndStakeFn, args: {} },
  delayed: { method: delayedUnstakeFn, args: { amount: state.amount * YOCTO } },
  fast: {
    method: liquidUnstakeFn,
    args: {
      st_near_to_burn: amount * YOCTO,
      min_expected_near: amount * YOCTO, // REVIEW
    },
  },
}[state.tab];

const onSubmit = () => {
  const { method, args } = submitProps;
  const deposit = state.tab == "stake" ? state.amount * YOCTO : undefined;
  Near.call(metapoolContract, method, args, GAS, deposit);
};

const onClickTab = (tab) => {
  State.update({ tab });
};

const onClickMax = (tab) => {
  console.log("setting max balance", fetchBalance);
  State.update({ amount: parseFloat(fetchBalance.body[0].amount).toFixed(2) });
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
};
const selectionPropsData = {
  stake: {
    input: {
      title: "NEAR Amount",
      token: "NEAR",
    },
    input1: {
      token: "stNEAR",
      title: "You’ll get",
    },
    button: {
      active: true,
      disabled: false,
      children: "Stake now",
    },
    notification: {
      message: "Rewards distributed every 24 hours",
      button: undefined,
    },
  },
  fast: {
    input: {
      title: "stNEAR Amount",
      token: "stNEAR",
    },
    input1: {
      token: "NEAR",
      title: "You’ll get",
    },
    button: {
      active: true,
      disabled: false,
      children: "Unstake",
    },
    notification: {
      message: `Fee is ${getLiquidUnstakeFee}%`,
      button: undefined,
    },
  },
  delayed: {
    input: {
      title: "stNEAR Amount",
      token: "stNEAR",
    },
    input1: {
      token: "NEAR",
      title: "You’ll get",
    },
    button: {
      active: true,
      disabled: false,
      children: "Unstake",
    },
    notification: {
      message: `Delayed unstake takes up to 6 days to complete`,
      button: {
        children: "Try fast",
        onClick: () => {
          State.update({ tab: "fast" });
        },
      },
    },
  },
}[state.tab];

const resultAmount = {
  stake: (state.amount / parseFloat(fetchMetrics.body.st_near_price)).toFixed(
    2
  ),
  fast: (state.amount * parseFloat(fetchMetrics.body.st_near_price)) // REVIEW : include fee
    .toFixed(2),
  delayed: (state.amount * parseFloat(fetchMetrics.body.st_near_price)).toFixed(
    2
  ),
}[state.tab];
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #CEFF1A;
    padding: 32px;
    width: 100%;
    height: 100%;
    justify-content: center;

  `;
const Container = styled.div`
    border: 1px solid #c0c5c1;
    border-radius: 16px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 32px;
    padding: 32px;
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
const FrameNotification = styled.div`
    margin-top: 24px;
`;
const Banner = styled.div`
    border-radius: 16px;
    background-color: #f9fafb;
    border: 0.8px solid #d7e0e4;
    font-weight: 500;
    font-size: 1.286rem;
    line-height: 18px;
    font-family: "Aeonik Fono", Arial;
    color: #032131;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 88px;
    padding: 32px;
    margin-top: 32px;
  `;
const FrameBanner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
  `;
const SecurityText = styled.span`
    letter-spacing: 1px;
    margin-top: 2px;
  `;
const BannerButtonWrapper = styled.div`
    color: #032131;
    font-size: 1.286rem;
    font-weight: 500;
    line-height: 18px;
    font-family: "Aeonik Fono", Arial;
    text-align: center;
    display: flex;
    flex-direction: row;
    column-gap: 8px;
  `;
const BannerButton = styled.a`
    border-radius: 1000px;
    background-color: #ffffff;
    border: 2px solid #0c2246;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
   text-decoration: none;
    cursor: pointer;
    reset: all;
  `;
const BannerButtonText = styled.span`
    letter-spacing: 1px;
    margin-left: 1px;
    margin-top: 10px;
    margin-bottom: 9px;
  `;

return (
  <Wrapper>
    <Container>
      <Frame>
        <Widget
          src={`${ownerId}/widget/LiquidStake.Selector`}
          props={{
            active: state.tab,
            ...propsData.stakingSelector,
            onClickTab: onClickTab,
          }}
        />
        <FrameNotification>
          <Widget
            src={`${ownerId}/widget/LiquidStake.Notification`}
            props={{
              type: "info",
              ...selectionPropsData.notification,
              fontSize: "fs-5",
            }}
          />
        </FrameNotification>
        <Widget
          src={`${ownerId}/widget/LiquidStake.StakeInput`}
          props={{
            ...selectionPropsData.input,
            value: state.amount,
            onClickMax,
            onChange: onChangeNearAmount,
          }}
        />
        <Widget
          src={`${ownerId}/widget/LiquidStake.StakeResult`}
          props={{
            ...selectionPropsData.input1,
            amount: resultAmount,
          }}
        />
        <FrameButton>
          <button
            class="btn text-white"
            type="button"
            onClick={onSubmit}
            {...selectionPropsData.button}
          />
        </FrameButton>
        <Banner className={props.className || ""}>
          <FrameBanner>
            <i class="bi bi-shield-shaded"></i>
            <SecurityText>Security</SecurityText>
          </FrameBanner>
          <BannerButtonWrapper className={props.className || ""}>
            <BannerButton
              href="https://metapool.gitbook.io/master/security/audit-reports"
              target="_blank"
              rel="noopener"
            >
              <BannerButtonText>Read about our audited code</BannerButtonText>
            </BannerButton>
          </BannerButtonWrapper>
        </Banner>
      </Frame>
    </Container>
  </Wrapper>
);
