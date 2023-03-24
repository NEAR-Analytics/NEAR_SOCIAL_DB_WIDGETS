const accountId = context.accountId; // add check for context it
const contractId = "registry.hideyourcash.near";

initState({
  accountId: accountId,
  contractId: contractId,
});

const register = () => {
  if (!accountId) {
    return;
  }
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 300000000000000; // 300 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 400000000000000000000;
  Near.call([
    {
      contractName: state.contractId,
      methodName: "allowlist",
      args: {
        account_id: state.accountId,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};
return (
  <div>
    <h1> 🌪️ Registry </h1>
    <p>Register for allow list for hideyour.cash</p>
    <div></div>

    <div className="row">
      {state.accountId && (
        <button className="btn btn-primary mt-3" onClick={register}>
          Register
        </button>
      )}
      <div className="col-lg-6"></div>
      {!state.accountId && (
        <button className="btn btn-warning mt-3">Login to Register</button>
      )}
    </div>
  </div>
);

// check if already registered
