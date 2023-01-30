const LidoContainer = styled.div`
    box-sizing: border-box;
    margin: 0px auto;
    min-width: 320px;
    width: 100%;
    padding: 0px 32px;
    max-width: 560px;
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const Header = styled.div`
    font-weight: 800;
    font-size: 26px;
    margin-bottom: 0.2em;
    line-height: 1.2em;
    text-align: center;
`;

const SubHeader = styled.div`
    font-weight: 500;
    color: #7a8aa0;
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 1.5em;
    text-align: center;
`;

const LidoForm = styled.div`
    background: linear-gradient(65.21deg, rgb(55, 57, 74) 19.1%, rgb(62, 75, 79) 100%);
    margin-bottom: -20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-bottom: 52px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    color: #fff;    
}
`;

const LidoFormTopContainer = styled.div`
    margin-top: 0px;
    display: flex;
    margin: 20px 0px;
`;

const LidoFormTopContainerLeft = styled.div`
    margin-right: 18px;
    flex-basis: 50%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-size: 12px;
    line-height: 1.6em;
`;

const LidoFormTopContainerLeftContent1 = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
`;

const LidoFormTopContainerLeftContent1Container = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
`;

const LidoFormTopContainerLeftContent1Circle = styled.div`
    background-color: #53BA95;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;
`;

const LidoFormTopContainerLeftContent2 = styled.div`
    margin-top: 2px;
    font-size: 18px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
    display: block;
`;

const LidoFormTopContainerRight = styled.div`
    align-self: stretch;
    display: flex;
    flex: 1 1 50%;
    -webkit-box-flex: 1;
    overflow: hidden;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-left: auto;
`;

const LidoFormTopContainerRightContent1 = styled.div`
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0px;
    border-radius: 1000px;
    padding: 4px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, .2);
    color: #fff;    
`;

const LidoFormTopContainerRightContent1Text = styled.div`
    padding: 0px 6px;
    font-weight: 400;
`;

const LidoSplitter = styled.div`
    box-sizing: border-box;
    list-style: none;
    opacity: 0.1;
    padding: 0px;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    border-top: 1px solid currentcolor;
    width: 100%;
    height: 0px;
    margin: 0px;
`;

const LidoFormBottomContainer = styled.div`
    margin-bottom: 0px;
    display: flex;
    margin: 20px 0px;
`;

const LidoAprContainer = styled.div`
    margin-right: 0px;
    flex-basis: 50%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-size: 12px;
    line-height: 1.6em;
`;

const LidoAprTitle = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
`;

const LidoAprValue = styled.div`
    margin-top: 2px;
    font-size: 16px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
    color: rgb(97, 183, 95);
    font-size: 16px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
}        
`;

const LidoStakeForm = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    background: #eee;
    color: #7a8aa0;
    margin-top: -30px;
`;

const LidoStakeFormInputContainer = styled.div`
    margin-bottom: 16px;
    z-index: 2;
    position: relative;
    display: inline-flex;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-radius: 10px;
    -webkit-box-align: stretch;
    align-items: stretch;
    box-sizing: border-box;
    padding: 0px 15px;
    cursor: text;
    transition: border-color 100ms ease 0s;
    width: 100%;
    background: #fff;
    border-color: rgba(0,10,61,.12);
    color: #273852;
`;

const LidoStakeFormInputContainerSpan1 = styled.span`
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-right: 16px;
`;

const LidoStakeFormInputContainerSpan2 = styled.span`
    font-weight: 400;
    font-size: 14px;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    position: relative;
    padding: 17px 0px;
`;

const LidoStakeFormInputContainerSpan2Input = styled.input`
    width: 100%;
    font-family: inherit;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.43em;
    padding: 0px;
    border-radius: 0px;
    background: transparent;
    box-shadow: none;
    border: none;
    outline: none;
    position: relative;
    top: 0px;
    color: #273852;
`;

const LidoStakeFormInputContainerSpan3 = styled.span`
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 16px;
`;

const LidoStakeFormInputContainerSpan3Content = styled.button`
    cursor: pointer;
    letter-spacing: 0.4px;
    box-sizing: border-box;
    margin: 0px;
    border: none;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background: transparent;
    font-family: inherit;
    font-weight: 700;
    width: auto;
    line-height: 1em;
    font-size: 10px;
    border-radius: 6px;
    padding: 11px 16px;
    min-width: 50px;
    color: #00a3ff;
    &::before {
            display: block;
            background-color: #00a3ff;
            transition: opacity 100ms ease 0s;
            opacity: 0.1;
            content: "";
            position: absolute;
            inset: 0px;
            pointer-events: none;
            border-radius: inherit;
        }    
`;

const LidoStakeFormInputContainerSpan3Max = styled.span`
    position: relative;
    pointer-events: none;
    visibility: visible;
`;

const LidoStakeFormSubmitContainer = styled.button`
    cursor: pointer;
    box-sizing: border-box;
    margin: 0px;
    border: none;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background-image: initial;
    background-position: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    font-family: inherit;
    font-weight: 700;
    width: 100%;
    line-height: 1em;
    font-size: 14px;
    border-radius: 10px;
    padding: 21px 44px;
    min-width: 120px;
    color: #fff;
    background-color: #00a3ff;
    transition: background-color 100ms ease 0s;
    &:hover {
        background-color: ##009bf2;
    }
`;

const LidoStakeFormSubmitText = styled.span`
    position: relative;
    pointer-events: none;
    visibility: visible;
    margin: 0px;
    padding: 0px;
`;

const LidoFooterContainer = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
`;

const LidoFooterRaw = styled.div`
    margin-top: 0px;
    display: flex;
    margin: 16px 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
`;

const LidoFooterRawLeft = styled.div`
    color: #7a8aa0;
    -webkit-box-flex: 1;
    flex-grow: 1;
`;

const LidoFooterRawRight = styled.div`
    color: #273852;
    text-align: right;
    margin-left: 32px;
    -webkit-box-flex: 1;
    flex-grow: 1;
`;

return (
  <LidoContainer class="text-center">
    <Header>Stake Ether</Header>
    <SubHeader>Stake ETH and receive stETH while staking.</SubHeader>

    <LidoForm>
      <LidoFormTopContainer>
        <LidoFormTopContainerLeft>
          <LidoFormTopContainerLeftContent1>
            <LidoFormTopContainerLeftContent1Container>
              <span>Available to stake</span>
              <LidoFormTopContainerLeftContent1Circle />
            </LidoFormTopContainerLeftContent1Container>
          </LidoFormTopContainerLeftContent1>
          <LidoFormTopContainerLeftContent2>
            <span>0.0&nbsp;ETH</span>
          </LidoFormTopContainerLeftContent2>
        </LidoFormTopContainerLeft>
        <LidoFormTopContainerRight>
          <LidoFormTopContainerRightContent1>
            <LidoFormTopContainerRightContent1Text>
              <span>0xCDDF...F09eD8</span>
            </LidoFormTopContainerRightContent1Text>
          </LidoFormTopContainerRightContent1>
        </LidoFormTopContainerRight>
      </LidoFormTopContainer>
      <LidoSplitter />
      <LidoFormBottomContainer>
        <LidoFormTopContainerLeft>
          <LidoFormTopContainerLeftContent1>
            <LidoFormTopContainerLeftContent1Container>
              <span>Staked amount</span>
            </LidoFormTopContainerLeftContent1Container>
          </LidoFormTopContainerLeftContent1>
          <LidoFormTopContainerLeftContent2>
            <span>0.0&nbsp;stETH</span>
          </LidoFormTopContainerLeftContent2>
        </LidoFormTopContainerLeft>
        <LidoFormTopContainerRight>
          <LidoAprContainer>
            <LidoAprTitle>Lido APR</LidoAprTitle>
            <LidoAprValue>4.9%</LidoAprValue>
          </LidoAprContainer>
        </LidoFormTopContainerRight>
      </LidoFormBottomContainer>
    </LidoForm>
    <LidoStakeForm>
      <LidoStakeFormInputContainer>
        <LidoStakeFormInputContainerSpan1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              opacity="0.6"
              d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
            ></path>
            <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
            <path
              opacity="0.6"
              d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
            ></path>
            <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
            <path
              opacity="0.2"
              d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
            ></path>
            <path
              opacity="0.6"
              d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
            ></path>
          </svg>
        </LidoStakeFormInputContainerSpan1>
        <LidoStakeFormInputContainerSpan2>
          <LidoStakeFormInputContainerSpan2Input placeholder="Amount" />
        </LidoStakeFormInputContainerSpan2>
        <LidoStakeFormInputContainerSpan3>
          <LidoStakeFormInputContainerSpan3Content>
            <LidoStakeFormInputContainerSpan3Max>
              MAX
            </LidoStakeFormInputContainerSpan3Max>
          </LidoStakeFormInputContainerSpan3Content>
        </LidoStakeFormInputContainerSpan3>
      </LidoStakeFormInputContainer>
      <LidoStakeFormSubmitContainer>
        <LidoStakeFormSubmitText>Submit</LidoStakeFormSubmitText>
      </LidoStakeFormSubmitContainer>

      <LidoFooterContainer>
        <LidoFooterRaw>
          <LidoFooterRawLeft>You will receive</LidoFooterRawLeft>
          <LidoFooterRawRight>0 stETH</LidoFooterRawRight>
        </LidoFooterRaw>
        <LidoFooterRaw>
          <LidoFooterRawLeft>Exchange rate</LidoFooterRawLeft>
          <LidoFooterRawRight>1 ETH = 1 stETH</LidoFooterRawRight>
        </LidoFooterRaw>
        <LidoFooterRaw>
          <LidoFooterRawLeft>Transaction cost</LidoFooterRawLeft>
          <LidoFooterRawRight>$2.12</LidoFooterRawRight>
        </LidoFooterRaw>
        <LidoFooterRaw>
          <LidoFooterRawLeft>Reward fee</LidoFooterRawLeft>
          <LidoFooterRawRight>10%</LidoFooterRawRight>
        </LidoFooterRaw>
      </LidoFooterContainer>
    </LidoStakeForm>
  </LidoContainer>
);
