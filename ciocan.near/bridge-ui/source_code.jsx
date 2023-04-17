const { network, assets, balance } = props;
const { action } = state;

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
      <h5>Bridge</h5>
      <div class="action btn-group" role="group" aria-label="Deposit">
        <input
          id="deposit"
          type="radio"
          class="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={!action || action === "deposit"}
          onClick={() => State.update({ action: "deposit" })}
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
          checked={action === "withdraw"}
          onClick={() => State.update({ action: "withdraw" })}
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
          <span>{network.from}</span>
          <select class="form-select" aria-label="select asset">
            {assets.map((asset) => (
              <option value={asset.id} selected={asset.selected}>
                {asset.value}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between">
            <span>Balance: 0.00</span>
          </div>
          <div className="input-group">
            <input
              style={{ maxWidth: "120px" }}
              type="number"
              defaultValue="0.00"
              placeholder="0.00"
            />
            <button className="btn btn-light btn-sm">max</button>
          </div>
        </div>
      </div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-flex justify-content-between">
      <div>{network.to}</div>
      <div>Balance: 0.00</div>
    </div>
  </Container>
);
