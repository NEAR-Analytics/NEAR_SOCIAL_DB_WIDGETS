/*
// the shape of props data
{
  "isLoading": true,
  "log": "The TX hash is: 0x2c5d223e47ecd9ac68fbdcd3eeb2bc4615ce6f7209d295104131c1440056497e Etherscan",
  "explorerLink": "https://etherscan.io/tx/123",
  "title": "zkBridge",
  "deposit": {
    "network": {
      "id": "eth-testnet",
      "name": "Ethereum Goerli"
    },
    "assets": [
      {
        "id": "eth",
        "name": "ETH",
        "balance": "123.22"
      },
      {
        "id": "usdc",
        "value": "USDC",
        "selected": true,
        "balance": "42.00"
      }
    ]
  },
  "withdraw": {
    "network": {
      "id": "zksync-testnet",
      "name": "zkSync Era Testnet"
    },
    "assets": [
      {
        "id": "eth",
        "name": "ETH",
        "balance": "0.123"
      },
      {
        "id": "usdc",
        "name": "USDC",
        "selected": true,
        "balance": "0.42"
      }
    ]
  },
  "amount": "0.1"
}
*/

const {
  deposit,
  withdraw,
  onTabChange,
  onAction,
  title,
  isLoading,
  log,
  explorerLink,
} = props;
const { action, amount, selectedAsset } = state;
const { assets } = deposit;

const isDeposit = !action || action === "deposit";
const actionTitle = isDeposit ? "Deposit" : "Withdraw";

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

const handleTabChange = (tab) => {
  if (isDeposit && tab === "deposit") return;
  if (!isDeposit && tab === "withdraw") return;
  State.update({ action: tab, amount: 0 });
  if (onTabChange) onTabChange(tab);
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
      label {
        color: gray;

        &:hover {
          color: black;
        }
      }
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

return (
  <Container>
    <div className="d-flex gap-4 align-items-center mb-3 justify-content-center">
      <h5 className="title">{title || "Bridge"}</h5>
      <div className="actionTabs btn-group" role="group" aria-label="Deposit">
        <input
          id="deposit"
          type="radio"
          className="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={isDeposit}
          onClick={() => handleTabChange("deposit")}
        />
        <label className="btn btn-outline-primary" for="deposit">
          Deposit
        </label>
        <input
          id="withdraw"
          type="radio"
          className="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={!isDeposit}
          onClick={() => handleTabChange("withdraw")}
        />
        <label className="btn btn-outline-primary" for="withdraw">
          Withdraw
        </label>
      </div>
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
            <button className="btn btn-light btn-sm" onClick={handleMax}>
              max
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-flex justify-content-between">
      <div>{withdraw.network.name}</div>
      <div>Balance: {selectedAssetWithdraw.balance}</div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
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
  </Container>
);
