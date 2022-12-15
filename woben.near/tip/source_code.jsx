State.init({ receiverID: "", tipAmount: null });

if (!context.accountId) {
  return <p>Loading...</p>;
}

const onSubmitClick = () => {
  const gas = 300 * 1000000000;
  const deposit = parseInt(state.tipAmount) + "000000000000000000000000";
  Near.call(
    "passthrough.near",
    "transfer",
    { receiver_id: State.receiverID },
    gas,
    deposit
  );
};

return (
  <div class="mb-4">
    <h1> Giving a Tip </h1>
    <p>
      Receiver: <input value={state.receiverID} placeholder="bowen.near" />
    </p>
    <p>
      Amount: <input value={state.tipAmount} placeholder="1" />
    </p>
    <button
      disabled={
        context.loading ||
        !(state.receiverID && state.tipAmount) ||
        !parseInt(State.tipAmount)
      }
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onSubmitClick}
    >
      Submit
    </button>
  </div>
);
