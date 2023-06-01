const Layout = styled.div`
  width: 314px;
  min-height: 412px;
  background-color: #151718;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
  }

  .container-button {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    cursor: pointer;
  }

  .separator {
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 8px;
    margin-right: 8px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    list-style: none;
    padding: 0 8px 0 8px;
    margin: 0;
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      justify-content: space-between;
    }

    .value {
      color: #BA90FF;
      font-weight: 600;
    }
  }
`;

const ContainerNetwork = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;

  .label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
  }
`;

const Icon = styled.span`
  height: ${(props) => (props.size ? props.size : "16px")};
  width: ${(props) => (props.size ? props.size : "16px")};
  background: #fff;
  border-radius: 16px;
  display: block;
`;

const NetworkSelectorButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 4px;
  gap: 4px;

  height: 24px;
  outline: none;
  border: none;
  position: relative;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;
`;

const NetworkList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  width: 145px;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 12px;
  }

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 8px 4px 4px;
    gap: 4px;
    flex: 1;
    width: 100%;

    &:hover {
      color: #ccc;
    }
  }
`;

const caretSvg = (
  <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
    <path
      d="M4.99998 1L2.99999 3L1 1"
      stroke="white"
      stroke-width="1.21738"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  position: relative;

  width: 100%;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    color: rgba(255, 255, 255, 0.6);
  }

  .token-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: flex-end;
    flex: 1;

    .usd-value {
      text-align: right;
    }
  }
`;

const TokenSelector = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
`;

const Input = styled.input`
  background: none;
  color: #fff;
  text-align: right;
  border: none;
  outline: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
`;

const ToNetworkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 4px;
  gap: 4px;

  height: 24px;
  outline: none;
  border: none;
  position: relative;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;
`;

const ActionButton = styled.button`
  background: #8247E5;
  border-radius: 4px;
  border: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  padding: 12px;
`;

const Alert = styled.div`
  position: absolute;
  color: red;
  background: #fff;
  z-index: 20;
  padding: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

const networks = {
  1: "Ethereum Mainnet",
  5: "Ethereum Goerli",
  1101: "Polygon zkEvm",
  1442: "Polygon zkEvm Goerli",
};

State.init({
  selectedNetwork: "ethereum",
  isNetworkSelectOpen: false,
});

const { isNetworkSelectOpen, selectedNetwork, chainId } = state;

const changeNetwork = (network) => {
  State.update({ isNetworkSelectOpen: false, selectedNetwork: network });
};

const openNetworkList = () => {
  State.update({ isNetworkSelectOpen: true });
};

const isMainnet = chainId === 1 || chainId === 1101;
const inputsCorrectNetwork = Object.keys(networks)
  .map((n) => Number(n))
  .includes(chainId);

const getFromNetworkLabel = () => {
  switch (selectedNetwork) {
    case "ethereum":
      return isMainnet ? networks[1] : networks[5];
    case "polygon":
      return isMainnet ? networks[1101] : networks[1442];
    default:
      return "unknown";
  }
};

const getToNetworkLabel = () => {
  switch (selectedNetwork) {
    case "ethereum":
      return isMainnet ? networks[1101] : networks[1442];
    case "polygon":
      return isMainnet ? networks[1] : networks[5];
    default:
      return "unknown";
  }
};

const networkList = isMainnet ? [1, 1101] : [5, 1442];

console.log(state, isMainnet, inputsCorrectNetwork);

return (
  <Layout>
    <div class="container">
      {!inputsCorrectNetwork && (
        <Alert>Please switch to Ethereum or Polygon zkEVM</Alert>
      )}
      <ContainerNetwork>
        <span class="label">FROM</span>
        <div class="container-button">
          <NetworkSelectorButton onClick={openNetworkList}>
            <Icon />
            <span>{getFromNetworkLabel()}</span>
            {caretSvg}
          </NetworkSelectorButton>
          {isNetworkSelectOpen && (
            <NetworkList>
              <ul>
                <li onClick={(e) => changeNetwork("ethereum")}>
                  <Icon />
                  <span>{networks[networkList[0]]}</span>
                </li>
                <li onClick={(e) => changeNetwork("polygon")}>
                  <Icon />
                  <span>{networks[networkList[1]]}</span>
                </li>
              </ul>
            </NetworkList>
          )}
        </div>
      </ContainerNetwork>
      <TokenContainer>
        <Icon size="32px" />
        <div class="token-container">
          <h3>SEND -&gt;</h3>
          <TokenSelector>
            <span>USDC</span>
            {caretSvg}
          </TokenSelector>
        </div>
        <div class="input-container">
          <Input placeholder="0" type="number" />
          <span class="usd-value">$0</span>
        </div>
      </TokenContainer>
    </div>
    <div class="container">
      <ContainerNetwork>
        <span class="label">TO</span>
        <ToNetworkContainer>
          <Icon />
          <span>{getToNetworkLabel()}</span>
        </ToNetworkContainer>
      </ContainerNetwork>
      <TokenContainer>
        <Icon size="32px" />
        <div class="token-container">
          <h3>-&gt; RECEIVE</h3>
          <TokenSelector>
            <span>USDC</span>
          </TokenSelector>
        </div>
        <div class="input-container">
          <Input placeholder="0" type="number" readOnly value={0} />
          <span class="usd-value">$0</span>
        </div>
      </TokenContainer>
    </div>
    <div class="separator" />
    <ul class="info">
      <li>
        <span>Rate</span>
        <span class="value">-</span>
      </li>
      <li>
        <span>Network fee</span>
        <span class="value">-</span>
      </li>
      <li>
        <span>Polygon zkEVM fee</span>
        <span class="value">-</span>
      </li>
    </ul>
    <ActionButton>Confirm</ActionButton>
  </Layout>
);
