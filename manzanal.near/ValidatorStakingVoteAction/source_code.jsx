if (!context.accountId) {
  return "Please sign in with NEAR wallet";
}

const poolId = props.validator_account_id || "idtcn4.poolv1.near";
const CONTRACT_ID = "meta-vote.near";
const GET_VP_METHOD = "get_available_voting_power";
const VOTE_METHOD = "vote";
const VOTE_CONTRACT_ADDRESS_ARG = "metastaking.app";

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toFixed(2);

const getVotingPowerBalance = () => {
  const balanceYocto = Near.view(CONTRACT_ID, GET_VP_METHOD, {
    voter_id: context.accountId,
  });
  const _balance = YoctoToNear(balanceYocto);
  return _balance;
};

initState({
  amount: 0,
  poolId,
  valid: false,
  balance: getVotingPowerBalance(),
});

const onVoteClick = () => {
  const gas = 200 * 1000000000000;
  const deposit = "";
  const args = {
    contract_address: VOTE_CONTRACT_ADDRESS_ARG,
    voting_power: parseInt(state.amount) + "000000000000000000000000",
    votable_object_id: state.poolId,
  };

  Near.call(CONTRACT_ID, VOTE_METHOD, args, gas, deposit);
};
const onUseMaxClick = () => {
  const balance = getVotingPowerBalance();
  State.update({ amount: balance, balance, valid: balance > 0 });
};

const handleChange = (e) => {
  State.update({
    amount: e.target.value,
    valid:
      e.target.value > 0 &&
      state.balance > 0 &&
      e.target.value <= state.balance,
  });
};

const handleBlur = (e) => {
  State.update({ amount: parseInt(state.amount) });
};

return (
  <div>
    <div class="d-flex flex-row justify-content-between clearfix">
      <div class="col-sm-6">
        <div class="bs-calltoaction bs-calltoaction-default">
          <div class="col-md-9 cta-contents text-primary">
            <h5>{state.poolId}</h5>
          </div>
        </div>
        <a
          disabled={context.loading}
          className={`btn ${
            context.loading ? "btn-outline-dark" : "btn-secondary"
          }`}
          href={`/#/manzanal.near/widget/ValidatorsStakingVote`}
          role="button"
        >
          Back&nbsp;to&nbsp;validators
        </a>
      </div>
    </div>
    <div class="d-flex flex-row mt-3">
      <div class="col-sm-6">
        <div class="d-flex justify-content-start">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Vote</h5>
              <p>How much Voting Power do you want to asign to this node?</p>
              <div class="input-group input-group-md my-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">VP</span>
                </div>
                <input
                  type="number"
                  value={state.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="form-control"
                  placeholder="Amount Voting Power"
                  aria-label="amount-voting-power"
                  aria-describedby="btnGroupAddon"
                />
                <div class="input-group-append ">
                  <button
                    class="btn btn-outline-secondary"
                    id="btnGroupAddon"
                    className={`btn ${
                      context.loading ? "btn-outline-dark" : "btn-secondary"
                    }`}
                    onClick={onUseMaxClick}
                  >
                    Use MAX
                  </button>
                </div>
              </div>
              <button
                disabled={context.loading || !state.valid}
                className={`btn ${
                  context.loading ? "btn-outline-dark" : "btn-primary"
                }`}
                onClick={onVoteClick}
              >
                Vote this validator
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 w-100">
        <Widget src="manzanal.near/widget/UserVotingDashComponent" props={{}} />
      </div>
    </div>
  </div>
);
