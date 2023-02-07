const near_staked = props.near_staked;
const near_assigned = props.near_assigned;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

return (
  <div className="text-bg-light rounded-4 p-2">
    {data !== null ? (
      <p>
        <div class="d-flex justify-content-around clearfix">
          <div class="p-3">
            <div>STAKED AT METAPOOL</div>
            <h2>{numberWithCommas(near_staked.toFixed(0))} Ⓝ</h2>
          </div>
          <div class="p-3">
            <div>ASSIGNED BY VOTES</div>
            <h2>{numberWithCommas(near_assigned.toFixed(0))} Ⓝ</h2>
          </div>
        </div>
      </p>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
