const getTokenBalance = props.getTokenBalanceFn;
const getWrapTokenBalance = props.getWrapTokenBalanceFn;
const wrapFn = props.wrapFn;
const unwrapFn = props.unwrapFn;
const parseToUnits = props.parseToUnitsFn;
const isValidAmout = props.isValidAmountFn;
const tokenName = props.tokenName;
const wrapTokenName = props.wrapTokenName;
const imgWrapTokenSrc = props.imgWrapTokenSrc;
const imgTokenSrc = props.imgTokenSrc;

State.init({
  unwrap: false,
  balanceToken: null,
  balanceWrapToken: null,
  intervalStarted: false,
  amountIn: null,
  amountOut: null,
  swapButtonText: null,
  swapReady: false,
});

const updateBalances = async (address) => {
  const tokenBalance = await getTokenBalance(address);
  const wrapTokenBalance = await getWrapTokenBalance(address);
  State.update({
    balanceToken: tokenBalance,
    balanceWrapToken: wrapTokenBalance,
  });
};

if (!state.intervalStarted) {
  State.update({ intervalStarted: true });

  updateBalances();

  setInterval(() => {
    updateBalances();
  }, 2000);
}

const swapInputOnChange = (event) => {
  let re = /^[0-9]*[.,]?[0-9]*$/;

  if (re.test(event.target.value)) {
    try {
      State.update({
        amountIn: event.target.value,
        amountOut: event.target.value,
        swapButtonText: null,
      });

      updateSwapButton();
    } catch (e) {}
  }
};

const updateSwapButton = () => {
  State.update({ swapReady: false });

  if (!signer) {
    State.update({ swapButtonText: "Connect Wallet" });
    return;
  }

  if (!state.amountIn) {
    return;
  }

  let amountIn = parseToUnits(state.amountIn);

  if (!isValidAmout(amountIn)) {
    State.update({ swapButtonText: "Invalid Amount" });
    return;
  }

  let limit = state.unwrap ? state.balanceWrapToken : state.balanceToken;

  if (limit && amountIn < limit) {
    State.update({
      swapButtonText: state.unwrap
        ? `Unwrap ${tokenName}`
        : `Wrap ${tokenName}`,
      swapReady: true,
    });
  } else {
    State.update({
      swapButtonText: `Insufficient ${
        state.unwrap ? wrapTokenName : tokenName
      } Balance`,
    });
  }
};

const swapButtonOnClick = () => {
  if (state.unwrap) {
    unwrapFn(state.amountIn);
  } else {
    wrapFn(state.amountIn);
  }
};

const Card = styled.div`
  font-family: 'Inter custom',sans-serif;
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
 
  background: rgb(13, 17, 28);
  border-radius: 16px;
  border: 1px solid rgb(27, 34, 54);
  padding: 8px;
  z-index: 1;
  transition: transform 250ms ease 0s;
 
  display: block;
`;

const SwapContainer = styled.div`
  background-color: rgb(19, 26, 42);
  border-radius: 12px;
  padding: 16px;
`;

const SwapContainerOuter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 20px;
`;

const SwapContainerInner = styled.div`
  border-radius: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SwapInput = styled.input`
  color: rgb(255, 255, 255);
  position: relative;
  font-weight: 400;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  appearance: textfield;
  filter: none;
  opacity: 1;
  transition: opacity 0.2s ease-in-out 0s;
  text-align: left;
  font-size: 36px;
  line-height: 44px;
  font-variant: small-caps;
`;

const SwapArrowContainer = styled.div`
  border-radius: 12px;
  height: 40px;
  width: 40px;
  position: relative;
  margin: -18px auto;
  background-color: rgb(41, 50, 73);
  border: 4px solid rgb(13, 17, 28);
  z-index: 2;
 
  :hover {
    opacity: 0.75;
  }
`;

const SwapArrowWrapper = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CurrencyPillContainer = styled.div`
  text-decoration: none;
  background-color: rgb(41, 50, 73);
  color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 4px 8px 4px 4px;
  margin-left: 12px;
`;

const CurrencyPillWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;

const CurrencyPillImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CurrencyPillImage = styled.img`
  color: rgb(255, 255, 255);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 2px;
`;

const CurrencyPillText = styled.span`
  margin: 0px 4px;
  font-size: 20px;
  font-weight: 600;
`;

const SwapDetailsContainer = styled.div`
  padding: 8px 0px 0px;
`;

const SwapDetailsWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const TextSmall = styled.div`
  color: rgb(152, 161, 192);
  line-height: 1rem;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
`;

const SwapButtonWrapper = styled.div`
  margin-top: 12px;
`;

const SwapButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? "rgb(41, 50, 73)" : "rgb(76, 130, 251)"};
  padding: 16px;
  font-size: 20px;
  font-weight: 600;
  color: rgb(245, 246, 252);
  width: 100%;
  text-align: center;
  border-radius: 20px;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  position: relative;
  z-index: 1;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  padding: 8px 12px;
  margin: 0px 0px 8px 0px;
  color: rgb(255, 255, 255);
  font-weight: 500;
  font-size: 16px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    width: 100%;
    height: 100%;
    justify-content: center;
  `;

return (
  <Wrapper>
    <Card>
      <TitleWrapper>
        <p style={{ margin: 0 }}>{tokenName} Wrapper</p>
      </TitleWrapper>
      <SwapContainer>
        <SwapContainerOuter>
          <SwapContainerInner>
            <InputContainer>
              <SwapInput
                inputmode="decimal"
                autocomplete="off"
                autocorrect="off"
                type="text"
                placeholder="0"
                minlength="1"
                maxlength="79"
                spellcheck="false"
                value={state.amountIn}
                onChange={swapInputOnChange}
              />
              <CurrencyPillContainer>
                <CurrencyPillWrapper>
                  <CurrencyPillImageWrapper>
                    <CurrencyPillImage
                      alt={state.unwrap ? "token" : "wrap token"}
                      src={state.unwrap ? imgWrapTokenSrc : imgTokenSrc}
                    />
                    <CurrencyPillText>
                      {state.unwrap ? wrapTokenName : tokenName}
                    </CurrencyPillText>
                  </CurrencyPillImageWrapper>
                </CurrencyPillWrapper>
              </CurrencyPillContainer>
            </InputContainer>
            <SwapDetailsContainer>
              <SwapDetailsWrapper>
                <TextSmall></TextSmall>
                {state.unwrap ? (
                  state.balanceWrapToken ? (
                    <TextSmall>
                      Balance: {formatUnits(balanceWrapToken)}
                    </TextSmall>
                  ) : null
                ) : state.balanceToken ? (
                  <TextSmall>Balance: {formatUnits(balanceToken)}</TextSmall>
                ) : null}
              </SwapDetailsWrapper>
            </SwapDetailsContainer>
          </SwapContainerInner>
        </SwapContainerOuter>
      </SwapContainer>
      <SwapArrowContainer
        onClick={() => {
          State.update({
            unwrap: !state.unwrap,
            amountIn: state.amountOut,
            amountOut: state.amountIn,
          });
          updateSwapButton();
        }}
      >
        <SwapArrowWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </SwapArrowWrapper>
      </SwapArrowContainer>
      <SwapContainer>
        <SwapContainerOuter>
          <SwapContainerInner>
            <InputContainer>
              <SwapInput
                inputmode="decimal"
                autocomplete="off"
                autocorrect="off"
                type="text"
                placeholder="0"
                minlength="1"
                maxlength="79"
                spellcheck="false"
                value={state.amountIn}
                onChange={swapInputOnChange}
              />
              <CurrencyPillContainer>
                <CurrencyPillWrapper>
                  <CurrencyPillImageWrapper>
                    <CurrencyPillImage
                      alt={state.unwrap ? "token" : "wrap token"}
                      src={state.unwrap ? imgTokenSrc : imgWrapTokenSrc}
                    />
                    <CurrencyPillText>
                      {state.unwrap ? tokenName : wrapTokenName}
                    </CurrencyPillText>
                  </CurrencyPillImageWrapper>
                </CurrencyPillWrapper>
              </CurrencyPillContainer>
            </InputContainer>
            <SwapDetailsContainer>
              <SwapDetailsWrapper>
                <TextSmall></TextSmall>
                {state.unwrap ? (
                  state.balanceToken ? (
                    <TextSmall>Balance: {formatUnits(balanceToken)}</TextSmall>
                  ) : null
                ) : state.balanceWrapToken ? (
                  <TextSmall>
                    Balance: {formatUnits(balanceWrapToken)}
                  </TextSmall>
                ) : null}
              </SwapDetailsWrapper>
            </SwapDetailsContainer>
          </SwapContainerInner>
        </SwapContainerOuter>
      </SwapContainer>
      <SwapButtonWrapper>
        <SwapButton disabled={!state.swapReady} onClick={swapButtonOnClick}>
          {state.swapButtonText ??
            (state.unwrap
              ? `Enter ${wrapTokenName} Amount`
              : `Enter ${tokenName} Amount`)}
        </SwapButton>
      </SwapButtonWrapper>
    </Card>
  </Wrapper>
);
