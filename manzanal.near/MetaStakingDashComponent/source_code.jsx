const near_staked = props.near_staked;
const near_assigned = props.near_assigned;

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toFixed(2);

return (
  <div className="text-bg-light rounded-2 p-1">
    {data !== null ? (
      <p>
        <div class="d-flex justify-content-around clearfix">
          <div class="p-1">
            <div>NEAR STAKED AT METAPOOL</div>
            <h2>{near_staked.toFixed(2)} Ⓝ</h2>
          </div>
          <div class="p-1">
            <div>NEAR ASSIGNED BY VOTES</div>
            <h2>{near_assigned.toFixed(2)} Ⓝ</h2>
          </div>
        </div>
      </p>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
