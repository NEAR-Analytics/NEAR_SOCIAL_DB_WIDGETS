const initialState = {
  name: "",
  contractId: "",
  initialBalance: 0,
};

State.init(initialState);

const registerConsumer = () => {
  fetch(`https://dev.kitwallet.app/consumer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });
};

return (
  <div>
    <h1>Register for Analytics</h1>
    Company Name
    <input
      type="text"
      value={state.name}
      onChange={(e) => State.update({ name: e.target.value })}
    />
    Contract ID
    <input
      type="text"
      value={state.contractId}
      onChange={(e) =>
        State.update({
          contractId: e.target.value,
        })
      }
    />
    Initial Balance
    <input
      type="number"
      value={state.initialBalance}
      onChange={(e) => State.update({ initialBalance: e.target.value })}
    />
    <br />
    <button onClick={registerConsumer}>Confirm</button>
    <button onClick={() => State.update(initialState)}>Reset Form</button>
  </div>
);
