State.init({ receiverID: "", tipAmount: null });

if (!context.accountId) {
  return <p>Loading...</p>;
}

const tips = Social.index("genie", "tip-michaelpeter.near");
const tipAmount = tips.reduce((acc, v) => acc + parseInt(v.value), 0);
console.log(tipAmount);

const onSubmitClick = () => {
  const gas = 300 * 100000000000;
  const deposit = parseInt(state.tipAmount) + "000000000000000000000000";
  Near.call(
    "passthrough.near",
    "transfer",
    { receiver_id: state.receiverID },
    gas,
    deposit
  );
};

return (
  <div class="mb-4">
    <h1> Giving a Tip </h1>
    <p>
      Receiver:{" "}
      <input
        value={state.receiverID}
        placeholder="bowen.near"
        onChange={(e) => State.update({ receiverID: e.target.value })}
      />
    </p>
    <p>
      Amount:{" "}
      <input
        value={state.tipAmount}
        placeholder="1"
        onChange={(e) => State.update({ tipAmount: e.target.value })}
      />
    </p>
    <CommitButton
      disabled={
        context.loading ||
        !(state.receiverID && state.tipAmount) ||
        !parseInt(state.tipAmount)
      }
      data={{
        index: {
          genie: JSON.stringify({
            key: `tip-${state.receiverID}`,
            value: state.tipAmount,
          }),
        },
      }}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onSubmitClick}
    >
      Submit
    </CommitButton>
  </div>
);
