initState({ amount: "1", poolId: "zavodil.poolv1.near" });

const onStakeClick = () => {
  const gas = 300 * 1000000000000;
  // TODO: doesn't support floats right now due to limitation of JS integers
  const deposit = parseInt(state.amount) + "000000000000000000000000";
  console.log(gas, deposit);
  Near.call(state.poolId, "deposit_and_stake", {}, gas, deposit);
};

return (
  <div>
    <h1>Stake NEAR</h1>
    <p>
      Pool: <input value={state.poolId} />
    </p>
    <p>
      Amount: <input type="number" value={state.amount} />
    </p>
    <a onClick={onStakeClick}>Stake</a>
  </div>
);
