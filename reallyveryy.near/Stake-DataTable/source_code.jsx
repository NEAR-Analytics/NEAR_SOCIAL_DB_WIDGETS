const { is_stake_loading, stake_data } = props;

const ellipsizeThis = (x, leftCharLength, rightCharLength) => {
  let totalLength = leftCharLength + rightCharLength;

  if (totalLength >= x.length) {
    return x;
  }

  return x.substring(0, leftCharLength) + "..." + x.substr(-rightCharLength);
};

function toTwoDecimals(x) {
  if (!x) {
    return "";
  }
  if (typeof x === "string") {
    x = parseFloat(x);
  }
  return x.toLocaleString("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

return (
  <div>
    <h2 class="text-lg mt-5">Stakes</h2>
    <div class="row">
      <div class="col-6 row">
        <strong class="col-6">Number of Stake Tx:</strong>
        <span class="col-6">
          {is_stake_loading ? (
            <i class="spinner-grow spinner-grow-sm"></i>
          ) : (
            stake_data.length
          )}
        </span>
      </div>
      <div class="col-6 row"></div>
      <div class="col-6 row">
        <strong class="col-6">Total Staked:</strong>
        <span class="col-6">
          {is_stake_loading ? (
            <i class="spinner-grow spinner-grow-sm"></i>
          ) : stake_data.length > 0 ? (
            toTwoDecimals(
              stake_data
                .filter((x) => x.action == "Stake")
                .map((x) => x.deposit_amount)
                .reduce((a, b) => a + b)
            )
          ) : (
            "0.00"
          )}{" "}
          $NEAR
        </span>
      </div>
      <div class="col-6 row">
        <strong class="col-6">Total Unstaked:</strong>
        <span class="col-6">
          {is_stake_loading ? (
            <i class="spinner-grow spinner-grow-sm"></i>
          ) : stake_data.length > 0 ? (
            toTwoDecimals(
              stake_data
                .filter((x) => x.action == "Unstake")
                .map((x) => x.deposit_amount)
                .reduce((a, b) => a + b)
            )
          ) : (
            "0.00"
          )}{" "}
          $NEAR
        </span>
      </div>
    </div>
    <div class="table-responsive mt-3">
      <table class="table-striped table" style={{ minHeight: 100 }}>
        <thead>
          <tr>
            <th>Block Timestamp</th>
            <th>Tx Hash</th>
            <th>Action</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {stake_data.map((x) => (
            <tr>
              <td>{x.block_timestamp}</td>
              <td>
                <a
                  href={`https://explorer.near.org/transactions/${x.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ellipsizeThis(x.tx_hash ?? "N/A", 6, 6)}
                </a>
              </td>
              <td>{x.action}</td>
              <td>{toTwoDecimals(x.deposit_amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
