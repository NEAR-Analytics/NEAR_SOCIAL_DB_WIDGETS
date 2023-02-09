const CONTRACT_ID = "meta-vote.near";
const GET_VP_METHOD = "get_available_voting_power";
const GET_IN_USE_VP_METHOD = "get_used_voting_power";

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toFixed(2);

const numberWithCommas = (x) =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

const getVotingPowerBalance = () => {
  const balanceYocto = Near.view(CONTRACT_ID, GET_VP_METHOD, {
    voter_id: context.accountId,
  });
  return YoctoToNear(balanceYocto);
};

const getInUseVotingPower = () => {
  const inUserVotingPower = Near.view(CONTRACT_ID, GET_IN_USE_VP_METHOD, {
    voter_id: context.accountId,
  });
  return YoctoToNear(inUserVotingPower);
};

let data = {
  available: getVotingPowerBalance(),
  inUse: getInUseVotingPower(),
};

return (
  <div class="card">
    <div class="card-body p-3">
      <h5 class="card-title">Your Voting Power Balance</h5>
      <div class="row">
        <div class="col-md-6 p-3">
          <h6 class="card-subtitle mb-2 text-muted">Available</h6>
          <h6 class="text-success fs-5">
            {numberWithCommas(data.available)} VP
          </h6>
        </div>
        <div class="col-md-6 p-3">
          <h6 class="card-subtitle mb-2 text-muted">In Use</h6>
          <h6 class="text-danger fs-5">{numberWithCommas(data.inUse)} VP</h6>
        </div>
      </div>
    </div>
  </div>
);
