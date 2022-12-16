const initialState = {
  companyName: "",
  contractId: "",
  initialBalance: 0,
  publicKey: "",
  signedTx: "",
};

State.init(initialState);

const registerConsumer = () => {
  fetch(
    `http://ec2-35-86-104-154.us-west-2.compute.amazonaws.com:3000/consumer`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    }
  );
};

return (
  <div>
    <h1>Register for </h1>
    Company Name
    <input
      type="text"
      value={state.companyName}
      onChange={(e) => State.update({ companyName: e.target.value })}
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
    Public Key
    <input
      type="text"
      value={state.publicKey}
      onChange={(e) => State.update({ publicKey: e.target.value })}
    />
    Signed Tx
    <input
      type="text"
      value={state.signedTx}
      onChange={(e) =>
        State.update({
          signedTx: e.target.value,
        })
      }
    />
    <p></p>
    <button onClick={registerConsumer}>Confirm</button>
    <button onClick={() => State.update(initialState)}>Reset Form</button>
  </div>
);
