const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  receiver_id: state.receiver_id,
  method_name: state.method_name,
  args: state.args,
});

const handleProposal = () => {
  if (!(state.receiver_id && state.method_name && state.args)) {
    return;
  }
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: "global.sputnik-dao.near",
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "custom function call",
          kind: {
            FunctionCall: {
              receiver_id: state.receiver_id,
              actions: [
                {
                  method_name: state.method_name,
                  args: state.args,
                  deposit: "0",
                  gas: "150000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: gas,
    },
  ]);
};

const onChangeContract = (receiver_id) => {
  State.update({
    receiver_id,
  });
};

const onChangeMethod = (method_name) => {
  State.update({
    method_name,
  });
};

const onChangeArgs = (args) => {
  State.update({
    args,
  });
};

return (
  <div className="mb-3">
    <div className="mb-3">
      Contract:
      <input type="text" onChange={(e) => onChangeContract(e.target.value)} />
    </div>
    <div className="mb-3">
      Method:
      <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
    </div>
    <div className="mb-3">
      Arguments (JSON):
      <input type="json" onChange={(e) => onChangeArgs(e.target.value)} />
      <button className="btn btn-success mt-3" onClick={handleProposal}>
        Propose Action
      </button>
    </div>
  </div>
);
