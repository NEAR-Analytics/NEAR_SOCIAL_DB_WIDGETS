return (
  <div style={{ maxWidth: "300px" }}>
    <div class="card-body d-grid gap-3">
      <div>
        <div class="mb-2 text-muted">Token</div>
        <select onChange={[]} class="p-2 mb-1" style={{ width: "100%" }}>
          <option value="">Choose your token</option>
          <option value="0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d">
            NEAR
          </option>
          <option value="0xB12BFcA5A55806AaF64E99521918A4bf0fC40802">
            USDC
          </option>
          <option value="0x4988a896b1227218e4A686fdE5EabdcAbd91571f">
            USDT.e
          </option>
          <option value="0xf4eb217ba2454613b15dbdea6e5f22276410e89e">
            WBTC
          </option>
          <option value="ETH">ETH</option>
        </select>
      </div>
      <div>
        <div class="mb-2 text-muted">Amount</div>
        <input type="number" value={amount} onChange={handleAmount} />
      </div>
      {hasError && (
        <p class="alert alert-danger" role="alert">
          Amount greater than balance
        </p>
      )}
      <button
        onClick={[]}
        style={{ background: "#4ED58A", borderColor: "#4ED58A" }}
      >
        Deposit
      </button>
    </div>
  </div>
);
