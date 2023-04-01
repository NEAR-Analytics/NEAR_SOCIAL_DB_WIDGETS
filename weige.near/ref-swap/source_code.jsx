const accountId = context.accountId;

const shrinkToken = (value, decimals) => {
  return new Big(value || 0).div(new Big(10).pow(decimals || 24));
};

const account = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    },
  }),
});

const ArrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.231804 0.359841C0.585368 -0.0644363 1.21593 -0.12176 1.64021 0.231804L7.00003 4.69832L12.3598 0.231804C12.7841 -0.12176 13.4147 -0.0644363 13.7682 0.359841C14.1218 0.784118 14.0645 1.41468 13.6402 1.76825L7.00003 7.30173L0.359841 1.76825C-0.0644363 1.41468 -0.12176 0.784118 0.231804 0.359841Z"
      fill="currentColor"
    />
  </svg>
);

const getBalance = (token_id, tokenMeta) => {
  let amount;

  if (token_id === "NEAR") amount = account.body.result.amount;
  else {
    amount = Near.view(token_id, "ft_balance_of", {
      account_id: accountId,
    });
  }

  return !amount ? "0" : shrinkToken(amount, tokenMeta.decimals).toFixed();
};

const RefreshIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M0 7C0 7.55228 0.447715 8 1 8C1.55228 8 2 7.55228 2 7H0ZM12 7C12 9.76142 9.76142 12 7 12V14C10.866 14 14 10.866 14 7H12ZM2 7C2 4.23858 4.23858 2 7 2V0C3.13401 0 0 3.13401 0 7H2ZM7 2C9.76142 2 12 4.23858 12 7H14C14 3.13401 10.866 0 7 0V2Z"
      fill="#00FFD1"
    />
  </svg>
);

const REF_TOKEN_META = {
  decimals: 18,
  icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
  id: "token.v2.ref-finance.near",
  name: "Ref Finance Token",
  symbol: "REF",
};

const NEAR_META = {
  decimals: 24,
  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTcuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTcuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC42MDc4IDEyLjUwMjlWMjMuNjE5M0wxNi4yOTIgMTkuMzcyMUwxNi44NjA0IDE5Ljg3MDZMMTIuMDkzOCAyNi41ODQ0QzEwLjMyMjggMjguMjA5MiA3LjE5NzI3IDI3LjEwOTkgNy4xOTcyNyAyNC44NjIyVjExLjEzNzFDNy4xOTcyNyA4LjgxMjI4IDEwLjUwNTggNy43NTMzNCAxMi4yMTMzIDkuNTMxNkwyNS4zODY3IDIzLjI1MDRWMTIuNTkwMkwyMC4yNzEgMTYuMzgxMkwxOS43MDI1IDE1Ljg4MjdMMjMuNzU2NyA5LjYxNTZDMjUuNDQ4OSA3LjgwNDQyIDI4Ljc5NzMgOC44NTM3NiAyOC43OTczIDExLjE5NTNWMjQuNjE2M0MyOC43OTczIDI2Ljk0MTEgMjUuNDg4OCAyOCAyMy43ODEyIDI2LjIyMThMMTAuNjA3OCAxMi41MDI5WiIgZmlsbD0iIzBGMUQyNyIvPgo8L3N2Zz4K",
  id: "NEAR",
  name: "NEAR",
  symbol: "NEAR",
};

const ExchangeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{
      cursor: "pointer",
    }}
    onClick={() => {
      State.update({
        tokenIn: state.tokenOut,
        tokenOut: state.tokenIn,
      });
    }}
  >
    <path
      opacity="0.5"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.25977 12.9751C8.25977 13.5274 8.70748 13.9751 9.25977 13.9751C9.81205 13.9751 10.2598 13.5274 10.2598 12.9751L10.2598 3.3924L12.2975 5.40399C12.6905 5.79199 13.3237 5.7879 13.7117 5.39487C14.0997 5.00183 14.0956 4.36868 13.7025 3.98068L9.9623 0.288376C9.6753 0.00505281 9.2462 -0.0781458 8.87411 0.077387C8.50202 0.232919 8.25977 0.596739 8.25977 1.00003L8.25977 12.9751ZM5.27273 1.02496C5.27273 0.472672 4.82501 0.0249573 4.27273 0.0249573C3.72044 0.0249573 3.27273 0.472672 3.27273 1.02496V10.6077L1.70253 9.0576C1.30949 8.6696 0.676343 8.67369 0.288346 9.06672C-0.0996505 9.45976 -0.0955657 10.0929 0.29747 10.4809L3.5702 13.7117C3.8572 13.995 4.2863 14.0782 4.65839 13.9227C5.03048 13.7671 5.27273 13.4033 5.27273 13V1.02496Z"
      fill="#91A2AE"
    />
  </svg>
);

const ExchangeWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom: 16px;
  
`;

const Exchange = <ExchangeWrapper>{ExchangeIcon}</ExchangeWrapper>;

State.init({
  tokenIn: NEAR_META,
  tokenOut: REF_TOKEN_META,
  amountIn: "1",
  amountOut: "",
  showSetting: false,
  slippagetolerance: "0.5",
});

const TokenInInput = (
  <Widget
    src={`weige.near/widget/ref-token-input`}
    props={{
      amount: state.amountIn,
      disableInput: false,
      setAmount: (value) => State.update({ amountIn: value }),
      token: state.tokenIn,
      handleSelect: (metadata) =>
        State.update({
          tokenIn: metadata,
        }),
    }}
  />
);

const TokenOutInput = (
  <Widget
    src={`weige.near/widget/ref-token-input`}
    props={{
      amount: state.amountOut,
      disableInput: true,
      setAmount: (value) => State.update({ amountOut: value }),
      token: state.tokenOut,
      handleSelect: (metadata) =>
        State.update({
          tokenOut: metadata,
        }),
    }}
  />
);

const SlippageSelector = (
  <Widget
    src={`weige.near/widget/SlippageTolerance`}
    props={{
      showSetting: state.showSetting,
      slippagetolerance: state.slippagetolerance,
      setSlippagetolerance: (value) => {
        State.update({
          slippagetolerance: value,
        });
      },
    }}
  />
);

const Container = styled.div`
    width: 430px;
    color: white;
    background: rgb(16,16,17)
`;

const Refresh = styled.span`
  margin-left:8px
`;

const RefreshText = styled.span`
  margin-left:4px;
  font-size: 12px;
  color: #7E8A93;
`;

const RateLine = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
`;

const RefreshWrapper = styled.div`
  display: flex;
  align-items:center;
  cursor: pointer
`;

const RateWrapper = styled.div`
  display: flex;
  align-items:center
`;

const SettingWrapper = styled.div`
  display: flex;
  align-items:center;
  padding: 0px 8px
`;

const SettingLine = styled.div`
  border: 1px solid #1A2E33;
  width: 100%

`;

const SettingText = styled.span`
  font-size:12px;
  padding:0px 8px;
  display: flex;
  align-items:center;
  color: ${(props) => (props.show ? `white` : "#7e8a93")};
  cursor:pointer
`;

const ArrowDownWrapper = styled.div`
  transform: ${(props) =>
    props.show ? `scale(0.85) rotate(180deg)` : "scale(0.9)"};
  color: ${(props) => (props.show ? `white` : "#7e8a93")};
   position: ${(props) => (props.show ? `relative` : "")};
  top: ${(props) => (props.show ? `2px` : "")};
  cursor:pointer
`;

const ButtonWrapper = styled.button`
  
  border-radius: 12px;
  opacity: ${(props) => (props.notEnough ? "0.5" : "1")};
  background: ${(props) => (props.notEnough ? "#FF88B3" : "#00FFD1")};
  font-weight: 700;
  font-size: 18px;
  color:black;
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  outline:none;
  border:none;
  padding: 8px 0px;
  margin-top: 26px
`;

const notEnough = new Big(state.amountIn || 0).gt(
  getBalance(state.tokenIn.id, state.tokenIn)
);

return (
  <Container>
    <div
      style={{
        fontSize: "20px",
        fontWeight: "700",
      }}
    >
      Swap
    </div>

    {TokenInInput}
    {Exchange}
    {TokenOutInput}

    <RateLine>
      <RefreshWrapper>
        <Refresh>{RefreshIcon}</Refresh>
        <RefreshText>Refresh</RefreshText>
      </RefreshWrapper>

      <RateWrapper></RateWrapper>
    </RateLine>
    {SlippageSelector}

    <SettingWrapper>
      <SettingLine />
      <SettingText
        show={state.showSetting}
        onClick={() => {
          State.update({
            showSetting: !state.showSetting,
          });
        }}
      >
        Setting
      </SettingText>

      <ArrowDownWrapper
        onClick={() => {
          State.update({
            showSetting: !state.showSetting,
          });
        }}
        show={state.showSetting}
      >
        {ArrowDown}
      </ArrowDownWrapper>
    </SettingWrapper>

    <ButtonWrapper notEnough={notEnough}>
      {!accountId
        ? "Connect wallet"
        : notEnough
        ? "Insufficient Balance"
        : "Swap"}
    </ButtonWrapper>
  </Container>
);
