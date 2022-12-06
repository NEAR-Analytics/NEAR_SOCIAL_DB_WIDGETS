//NearStake
if (!context.accountId) {
  return "Please sign in with NEAR wallet to stake NEAR";
}

let poolId = props.poolId || "zavodil.poolv1.near";
let serviceFee = props.serviceFee || "";

initState({ amount: "1", poolId });

const onStakeClick = () => {
  const gas = 300 * 1000000000000;
  const deposit = parseFloat(state.amount) * 1000000 + "000000000000000000";

  Near.call(state.poolId, "deposit_and_stake", {}, gas, deposit);
};

return (
  <div>
    <h1>
      Stake NEAR{" "}
      <a href="/#/zavodil.near/widget/StakingPools" target="_blank">
        <span className="badge bg-secondary fs-6 align-middle">All Pools</span>
      </a>
    </h1>
    <p>
      Pool: <input value={state.poolId} readOnly />
      {serviceFee ? (
        <div
          id="emailHelp"
          className="form-text"
        >{`Service Fee: ${serviceFee}%.`}</div>
      ) : (
        ""
      )}
    </p>
    <p>
      Amount (NEAR):
      <input type="number" value={state.amount} />
    </p>
    <button
      disabled={context.loading}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onStakeClick}
    >
      Stake
    </button>
  </div>
);
