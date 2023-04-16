let tipNEAR = (accId) => {
  let amount = "500000000000000000000000"; // 0.5N
  Near.call(
    "passthrough.near",
    "transfer",
    { receiver_id: accId },
    gas,
    amount
  );
};

return (
  <div
    class="d-inline-flex align-items-center"
    onClick={() => tipNEAR(notifyAccountId)}
  >
    <button class="btn btn-outline-success me-1">Tip 1 NEAR</button>
  </div>
);
