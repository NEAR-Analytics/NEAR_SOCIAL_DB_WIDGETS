//ValidatorStakingVoteAction
if (!context.accountId) {
  return "Please sign in with NEAR wallet to stake NEAR";
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
  return parseInt(balanceYocto) / 1000000000000000000000000;
};

initState({ amount: "0", poolId, balance: getVotingPowerBalance() });

const onVoteClick = () => {
  const gas = 200 * 1000000000000;
  const deposit = "";
  const args = {
    contract_address: VOTE_CONTRACT_ADDRESS_ARG,
    voting_power: state.amount,
    votable_object_id: state.poolId,
  };

  Near.call(CONTRACT_ID, VOTE_METHOD, args, gas, deposit);
};
const onUseMaxClick = () => {
  const balance = getVotingPowerBalance();
  console.log("balance", balance);
  State.update({ amount: balance });
};
return (
  <div>
    <h1>
      Vote&nbsp;for&nbsp;{state.poolId}
      <a href="/#/manzanal.near/widget/ValidatorsStakingVote" target="_blank">
        <span className="badge bg-secondary fs-6 align-middle">Validators</span>
      </a>
    </h1>
    <p>
      Validator: <input value={state.poolId} readOnly />
    </p>
    <p>Balance: {state.balance} Voting Power</p>
    <p>
      Amount (Voting Power):
      <div class="input-group">
        <input
          type="number"
          value={state.amount}
          class="form-control"
          placeholder="Input group example"
          aria-label="Input group example"
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
      disabled={context.loading}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onVoteClick}
    >
      Vote
    </button>
  </div>
);
