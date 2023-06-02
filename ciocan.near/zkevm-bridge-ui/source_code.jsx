const tokens = [
  // eth testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x4701Aa9471d7bfAc765D87dcb1Ea6BB23AD32733",
    chainId: 5,
    symbol: "MATIC",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xd35cceead182dcee0f148ebac9447da2c4d449c4",
    chainId: 5,
    symbol: "USDC",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0xD7E55eB808693D5Ff81a3391c59886C7E0449f35",
    chainId: 5,
    symbol: "DAI",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    chainId: 5,
    symbol: "UNI",
    decimals: 18,
    logoURI: "",
  },
  // eth mainnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    chainId: 1,
    symbol: "MATIC",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    chainId: 1,
    logoURI: "",
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainId: 1,
    symbol: "USDT",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    chainId: 1,
    symbol: "WBTC",
    decimals: 8,
    logoURI: "",
  },
  // zkevm testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1442,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0x8Ba0a934ef4C24e475C78072cCa3Ed306c1aBaDD",
    chainId: 1442,
    symbol: "USDC",
    decimals: 6,
    logoURI: "",
  },
  {
    address: "0x378588D64A464d61c646e5e86F4DA5277e65802C",
    chainId: 1442,
    symbol: "UNI",
    decimals: 18,
    logoURI: "",
  },
  // zkevm assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1101,
    symbol: "ETH",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xa2036f0538221a77A3937F1379699f44945018d0",
    chainId: 1101,
    symbol: "MATIC",
    decimals: 18,
    logoURI: "",
  },
  {
    address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    chainId: 1101,
    symbol: "USDC",
    decimals: 18,
    logoURI: "",
  },
];

const Layout = styled.div`
  position: relative;
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

const Dialog = styled.div`
  position: absolute;
  right: 32px;
  left: 32px;
  top: 25%;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;
  border-radius: 12px;
  padding: 16px; 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      color: #ccc;
    }
  }
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
  selectedToken: "ETH",
  selectedNetwork: "ethereum",
  isNetworkSelectOpen: false,
  isTokenDialogOpen: false,
  amount: 0,
  balances: {},
});

const {
  isNetworkSelectOpen,
  selectedNetwork,
  chainId,
  selectedToken,
  isTokenDialogOpen,
  amount,
} = state;

const updateBalance = (token) => {
  const { address, decimals, symbol } = token;

  if (state.balances[symbol]) {
    return;
  }

  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        State.update({
          balances: {
            ...state.balances,
            [symbol]: Number(adjustedBalance).toFixed(4),
          },
        });
      });
  } else {
    const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(
      address,
      erc20Abi,
      Ethers.provider()
    );
    tokenContract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = ethers.utils.formatUnits(balanceBig, decimals);
      State.update({
        balances: {
          ...state.balances,
          [symbol]: Number(adjustedBalance).toFixed(4),
        },
      });
    });
  }
};

tokens.filter((t) => t.chainId === chainId).map(updateBalance);

const changeNetwork = (network) => {
  State.update({ isNetworkSelectOpen: false, selectedNetwork: network });
};

const openNetworkList = () => {
  State.update({ isNetworkSelectOpen: true, isTokenDialogOpen: false });
};

const isMainnet = chainId === 1 || chainId === 1101;
const isCorrectNetwork = Object.keys(networks)
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

const updateToken = (token) => {
  State.update({ selectedToken: token, isTokenDialogOpen: false });
};

const openTokenDialog = () => {
  State.update({ isTokenDialogOpen: true });
};

const changeAmount = (e) => {
  State.update({ amount: e.target.value });
};

const handleConfirm = () => {
  if (!amount) return;
  const { onConfirm } = props;
  const token = tokens
    .filter((t) => t.chainId === (isMainnet ? 1 : 5))
    .find((t) => t.symbol === selectedToken);

  if (onConfirm) {
    onConfirm({ amount, token, network: selectedNetwork });
  }
};

const networkList = isMainnet ? [1, 1101] : [5, 1442];

return (
  <Layout>
    <div class="container">
      {!isCorrectNetwork && (
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
          <TokenSelector disabled={!isCorrectNetwork} onClick={openTokenDialog}>
            <span>{selectedToken}</span>
            {caretSvg}
          </TokenSelector>
        </div>
        <div class="input-container">
          <Input placeholder="0" type="number" onChange={changeAmount} />
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
            <span>{selectedToken}</span>
          </TokenSelector>
        </div>
        <div class="input-container">
          <Input type="number" readOnly value={amount} />
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
    <ActionButton onClick={handleConfirm} disabled={!isCorrectNetwork}>
      Confirm
    </ActionButton>
    {isTokenDialogOpen && (
      <Dialog>
        <ul>
          {tokens
            .filter((t) => t.chainId === chainId)
            .map((token) => {
              const { symbol } = token;
              return (
                <li key={symbol} onClick={() => updateToken(symbol)}>
                  <span>{symbol}</span>
                  <span>{state.balances[symbol] ?? "-"}</span>
                </li>
              );
            })}
        </ul>
      </Dialog>
    )}
  </Layout>
);
