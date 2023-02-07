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
  <div className="text-bg-light rounded-4 p-2">
    {data !== null ? (
      <p>
        <div class="d-flex justify-content-around clearfix">
          <div class="p-3">
            <div>AVAILABLE VOTING POWER</div>
            <h2 class="text-success">{numberWithCommas(data.available)}</h2>
          </div>
          <div class="p-3">
            <div>IN USE VOTING POWER</div>
            <h2 class="text-danger">{numberWithCommas(data.inUse)}</h2>
          </div>
        </div>
      </p>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
