/*
// the shape of props data
{
  "isLoading": false,
  "title": "zkBridge",
  "from": {
    "network": {
      "id": "eth-testnet",
      "value": "Ethereum Goerli"
    },
  },
  "to": {
    "network": {
      "id": "zksync-testnet",
      "value": "zkSync Era Testnet"
    },
  },
  "amount": "0.1",
  "assets": [
    {
      "id": "eth",
      "value": "ETH",
      "balance": {
        "from": "123.22",
        "to": "0.123"
      }
    },
    {
      "id": "usdc",
      "value": "USDC",
      "selected": true,
      "balance": {
        "from": "42.00",
        "to": "0.42"
      }
    }
  ]
}
*/

const {
  from,
  to,
  assets,
  onTabChange,
  onAction,
  title,
  isLoading,
  log,
  explorerLink,
} = props;
const { action, amount, selectedAsset } = state;

const isDeposit = !action || action === "deposit";
const actionTitle = isDeposit ? "Deposit" : "Withdraw";

if (!selectedAsset) {
  initState({ selectedAsset: assets.find((a) => a.selected) || assets[0] });
}

const handleAction = () => {
  if (onAction)
    onAction({
      networkId: from.network.id,
      amount,
      assetId: selectedAsset.id,
      action: isDeposit ? "deposit" : "withdraw",
    });
};

const handleMax = () => {
  State.update({ amount: selectedAsset.balance.from });
};

const handleAmountChange = (e) => {
  State.update({ amount: e.target.value });
};

const handleAssetChange = (e) => {
  State.update({ selectedAsset: assets.find((a) => a.id === e.target.value) });
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
`;

return (
  <Container>
    <div className="d-flex gap-4 align-items-center mb-3 justify-content-center">
      <h5>{title || "Bridge"}</h5>
      <div class="action btn-group" role="group" aria-label="Deposit">
        <input
          id="deposit"
          type="radio"
          class="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={isDeposit}
          onClick={() => handleTabChange("deposit")}
        />
        <label class="btn btn-outline-primary" for="deposit">
          Deposit
        </label>
        <input
          id="withdraw"
          type="radio"
          class="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={!isDeposit}
          onClick={() => handleTabChange("withdraw")}
        />
        <label class="btn btn-outline-primary" for="withdraw">
          Withdraw
        </label>
      </div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column gap-2">
          <span>{from.network.value}</span>
          <select
            class="form-select"
            aria-label="select asset"
            onChange={handleAssetChange}
          >
            {assets.map((asset) => (
              <option value={asset.id} selected={asset.selected}>
                {asset.value}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between">
            <span>Balance: {selectedAsset.balance.from}</span>
          </div>
          <div className="input-group">
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
      <div>{to.network.value}</div>
      <div>Balance: {selectedAsset.balance.to}</div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-grid gap-3">
      <button
        className="btn btn-primary"
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
          <a href={explorerLink} class="alert-link" target="_blank">
            Etherscan
          </a>
        </div>
      )}
    </div>
  </Container>
);
