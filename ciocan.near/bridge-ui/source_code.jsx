const { from, to, assets, onTabChange, onAction, title } = props;
const { action, amount, selectedAssetId } = state;

const isDeposit = !action || action === "deposit";
const actionTitle = isDeposit ? "Deposit" : "Withdraw";

const handleAction = () => {
  const selectedAssetIdFromProps = assets.find((a) => a.selected)?.id;
  const assetId = selectedAssetId || selectedAssetIdFromProps || assets?.[0].id;
  if (onAction) onAction({ networkId: from.network.id, amount, assetId });
};

const handleMax = () => {
  State.update({ amount: from.balance });
};

const handleAmountChange = (e) => {
  State.update({ amount: e.target.value });
};

const handleAssetChange = (e) => {
  State.update({ selectedAssetId: e.target.value });
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
            <span>Balance: {from.balance}</span>
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
      <div>Balance: {to.balance}</div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-grid">
      <button className="btn btn-primary" onClick={handleAction}>
        {actionTitle}
      </button>
    </div>
  </Container>
);
