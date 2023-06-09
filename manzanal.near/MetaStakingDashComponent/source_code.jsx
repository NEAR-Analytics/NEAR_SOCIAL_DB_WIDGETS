const near_staked = props.near_staked;
const near_assigned = props.near_assigned;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

return (
  <div class="card">
    <div class="card-body p-3">
      <h5 class="card-title">Meta Pool Staking</h5>
      <div class="row">
        <div class="col-md-6 p-3">
          <h6 class="card-subtitle mb-2 text-muted">Staked at Meta Pool</h6>
          <h6 class="text-primary fs-5">
            {numberWithCommas(near_staked.toFixed(0))} Ⓝ
          </h6>
        </div>
        <div class="col-md-6 p-3">
          <h6 class="card-subtitle mb-2 text-muted">Assigned by Votes</h6>
          <h6 class="text-primary fs-5">
            {numberWithCommas(near_assigned.toFixed(0))} Ⓝ
          </h6>
        </div>
      </div>
    </div>
  </div>
);
