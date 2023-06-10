// TO-DO
// hookup to paymster, show transactionr ecipet
// show balance of USDC of connected wallet
// put usdc address on ZKSync
// check connect address instead of deposit
// configure dropw down reciever
// show the on chain mimum balance amount
// add zk account
if (state.chainId !== undefined && state.chainId !== 324) {
  return <p>Switch to ZKSync</p>;
}
// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
State.init({
  reciever: "",
}); // write now state reciever is in clipboard

const { deposit, withdraw, onAction, title, isLoading, log, explorerLink } =
  props;
const { action, amount, selectedAsset } = state;
const { assets } = deposit;

const isDeposit = !action || action === "deposit";
const actionTitle = isDeposit ? "Donate" : "Withdraw";

if (assets && !selectedAsset) {
  initState({
    selectedAsset: assets.find((a) => a.selected) || assets?.[0],
  });
}

const selectedAssetWithdraw = selectedAsset
  ? withdraw?.assets?.find((a) => a.id === selectedAsset.id)
  : undefined;

const handleAction = () => {
  if (onAction)
    onAction({
      networkId: deposit.network.id,
      amount,
      assetId: selectedAsset.id,
      action: isDeposit ? "deposit" : "withdraw",
    });
};

const handleMax = () => {
  State.update({ amount: selectedAsset.balance });
};

const handleAmountChange = (e) => {
  State.update({ amount: e.target.value });
};

const handleAssetChange = (e) => {
  State.update({ selectedAsset: assets?.find((a) => a.id === e.target.value) });
};

const Container = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    padding-top: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;

    * {
        font-family: 'Inter custom',sans-serif;
    }

    background: white;
    color: black;

    .title {
      margin-top: 8px;
    }

    .actionTabs {
      border: 1px solid black;
      height: 38px;

      input:checked + label {
        color: black;
      }

      label {
        color: gray;
        background: white !important;
        border: 1px solid black !important;
        height: 38px;
        
        &:hover {
          color: black;
        }
      }
    }

    button.max {
      border: 1px solid black;
    }

    button.action {
      background-color: black;
    }

    .action {
      background: black;
      color: white;
    }

    .balance {
      input {
        height: 38px;
        background: #f5f6fd;
        color: black;
        border: 1px solid black;
      }
      button {
        height: 38px;
        background: #f5f6fd;
        color: black;
      }
    }

    .assets {
      select {
        background: #f5f6fd;
        color: black;
      }
    }
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];
const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId: chainId === 5 ? "testnet" : "mainnet" });
    });
}
const contracts = {
  mainnet: {
    paymaster: {
      L1ERC20BridgeProxy: "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063", // change this
    },
    weth: {
      withdraw: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", // l2 token
    },
    usdc: {
      withdraw: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // l2 token
    },
  },
  testnet: {
    paymster: {
      L2ERC20Bridge: "0x00ff932A6d70E2B8f1Eb4919e1e09C1923E7e57b",
    },
    weth: {
      withdraw: undefined, // not found yet
    },
    usdc: {
      withdraw: undefined, // not found yet
    },
  },
};
const css = `
  .flex {
    display: flex;
    color: white;
    > div {
        margin: 32px 0;
      margin-right: 32px;
      width: 50%;
    }
    > div:last-of-type {
      margin-right: 0;
    }
  }
  .btn {
      margin-bottom: 16px !important;
  }
  .h1 {
    font-family: 'Lato', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Lato&display=swap') format('css2');
    font-weight: 300;
    font-style: normal;
  }
  .Connect {
    background-color: purple;
    color: white;
  }
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
const Theme = state.theme;
const paymasterContract = "";
const tokenDecimals = 18; // double check on contract
// FETCH Paymaster ABI

// see if API3 can be fetched here

const paymasterABI = fetch(
  "https://raw.githubusercontent.com/codingshot/zksync-paymaster/main/paymaster-abi.json"
);
if (!paymasterABI.ok) {
  return "Loading";
}
// add conditional for charity
return (
  <Theme>
    <Container>
      <div className="d-flex gap-4 align-items-center mb-3 justify-content-center">
        <h1 className="title">{title || "🙏 DonateDAO"}</h1>
        <div
          className="actionTabs btn-group"
          role="group"
          aria-label="Deposit"
        ></div>
      </div>
      <div className="border border-secondary border-bottom-0 border-light" />
      <div className="p-4">
        <div className="d-flex justify-content-between">
          <div className="assets d-flex flex-column gap-2">
            <span>{deposit.network.name}</span>
            <select
              className="form-select"
              aria-label="select asset"
              onChange={handleAssetChange}
            >
              {assets &&
                assets.map((asset) => (
                  <option value={asset.id} selected={asset.selected}>
                    {asset.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <span>Balance: {selectedAsset.balance}</span>
            </div>
            <div className="balance input-group">
              <input
                style={{ maxWidth: "120px" }}
                type="number"
                min="0"
                step="0.1"
                defaultValue={props.amount}
                value={amount}
                placeholder="0.00"
                onChange={handleAmountChange}
              />
              <button className="btn btn-light btn-sm max" onClick={handleMax}>
                max
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-secondary border-bottom-0 border-light" />

      <div className="border border-secondary border-bottom-0 border-light" />
      {!!state.sender ? (
        <div className="p-4 d-grid gap-3">
          <button
            className="action btn btn-primary"
            onClick={handleAction}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : actionTitle}
          </button>
          {log && (
            <div className="alert alert-success" role="alert">
              <div className="text-truncate" style={{ maxWidth: 300 }}>
                {log}
              </div>
              <a href={explorerLink} className="alert-link" target="_blank">
                Etherscan
              </a>
            </div>
          )}
        </div>
      ) : (
        <Web3Connect
          className="action btn btn-primary"
          connectLabel="Connect To ZkSync "
        />
      )}
    </Container>
    <div>
      <h1>Debug</h1>
      <p>Input USDC Amount: {state.amount}</p>
    </div>
    <Widget src="donating.near/widget/DonateDAO.dropdown" />
  </Theme>
);
