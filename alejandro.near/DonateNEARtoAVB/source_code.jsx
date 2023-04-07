let reciever = props.reciever || "alejandro.near";

initState({ amount: 1, reciever });

const donate = () => {
  Near.call(
    state.reciever,
    "donate",
    {},
    "30000000000000",
    state.amount * 1e24
  );
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};
const onChangeReciever = (reciever) => {
  State.update({
    reciever,
  });
};

return (
  <div>
    <h1>🙏 Beneficiary Address</h1>
    <input
      placeholder={state.reciever}
      onChange={(e) => onChangeReciever(e.target.value)}
    />
    <h1>💸 Donation Amount</h1>
    <input
      type="number"
      placeholder={state.amount}
      onChange={(e) => onChangeAmount(e.target.value)}
    />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
    >
      Donate {state.amount} NEAR to {state.reciever}
    </button>
  </div>
);
