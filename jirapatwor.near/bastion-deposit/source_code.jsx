return (
  <div style={{ maxWidth: "300px" }}>
    <div class="card-body d-grid gap-3">
      <div>
        <div class="mb-2 text-muted">Token2</div>
        <select onChange={[]} class="p-2 mb-1" style={{ width: "100%" }}>
          <option value="">Choose your token</option>
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
        style={{ background: "#4ED58A", borderColor: "white" }}
      >
        Deposit
      </button>
    </div>
  </div>
);
