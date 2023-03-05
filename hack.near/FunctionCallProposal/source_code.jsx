const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  receiver_id: state.receiver_id,
  method_name: state.method_name,
});

const function_call_args = JSON.stringify({
  token_id: "2498",
  receiver_id: "0xedward.near",
});

const proposal_args = Buffer.from(function_call_args, "utf-8").toString(
  "base64"
);

const handleProposal = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
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
                  args: proposal_args,
                  deposit: "1",
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
      <input type="text" onChange={(e) => onChangeMethod(e.target.value)} />
    </div>
    <div className="mb-3">
      <button className="btn btn-outline-danger mt-3" onClick={handleProposal}>
        Propose Action
      </button>
    </div>
  </div>
);
