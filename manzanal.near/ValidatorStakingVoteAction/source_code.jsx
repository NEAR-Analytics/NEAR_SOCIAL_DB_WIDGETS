if (!context.accountId) {
  return "Please sign in with NEAR wallet";
}

const poolId = props.validator_account_id || "idtcn4.poolv1.near";
const CONTRACT_ID = "meta-vote.near";
const GET_VP_METHOD = "get_available_voting_power";
const VOTE_METHOD = "vote";
const VOTE_CONTRACT_ADDRESS_ARG = "metastaking.app";

const getVotingPowerBalance = () => {
  const balanceYocto = Near.view(CONTRACT_ID, GET_VP_METHOD, {
    voter_id: context.accountId,
  });
  const _balance = parseInt(balanceYocto) / 1000000000000000000000000;
  return _balance.toFixed(2);
};

initState({
  amount: 0,
  poolId,
  valid: false,
  balance: 0,
});

State.update({ balance: getVotingPowerBalance() });

const onVoteClick = () => {
  const gas = 200 * 1000000000000;
  const deposit = "";
  const args = {
    contract_address: VOTE_CONTRACT_ADDRESS_ARG,
    voting_power: state.amount + "000000000000000000000000",
    votable_object_id: state.poolId,
  };

  Near.call(CONTRACT_ID, VOTE_METHOD, args, gas, deposit);
};
const onUseMaxClick = () => {
  const balance = getVotingPowerBalance();
  State.update({ amount: balance, balance, valid: balance > 0 });
};

const handleChange = (e) => {
  console.log("value", e.target.value);
  State.update({
    amount: e.target.value,
    valid:
      e.target.value > 0 &&
      state.balance > 0 &&
      e.target.value <= state.balance,
  });
};
return (
  <div>
    <h1>Vote&nbsp;for&nbsp;{state.poolId}</h1>
    <p>Validator: {state.poolId}</p>
    <p>Balance: {state.balance} Voting Power</p>
    <p>
      Amount (Voting Power):
      <div class="input-group">
        <input
          type="number"
          value={state.amount}
          onChange={handleChange}
          class="form-control"
          placeholder="Amount Voting Power"
          aria-label="amount-voting-power"
          aria-describedby="btnGroupAddon"
        />
        <div class="input-group-prepend">
          <button
            class="input-group-text"
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
    </p>

    <button
      disabled={context.loading || !state.valid}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onVoteClick}
    >
      Vote
    </button>
    <a
      disabled={context.loading}
      className={`btn ${
        context.loading ? "btn-outline-dark" : "btn-secondary"
      }`}
      href={`/#/manzanal.near/widget/ValidatorsStakingVote`}
      role="button"
    >
      Back&nbsp;to&nbsp;Validators
    </a>
  </div>
);
