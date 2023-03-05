const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  dao_id: "" ?? daoId,
  receiver_id: "",
  method_name: "",
  args: "",
  deposit: "",
  gas: "",
});

const proposal_args = Buffer.from(state.args, "utf-8").toString("base64");

const handleProposal = () => {
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
      deposit: state.deposit ?? "100000000000000000000000",
      gas: state.gas ?? "200000000000000",
    },
  ]);
};

const onChangeDAO = (dao_id) => {
  State.update({
    dao_id,
  });
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
      DAO:
      <input type="text" onChange={(e) => onChangeContract(e.target.value)} />
    </div>
    <div className="mb-3">
      Contract:
      <input type="text" onChange={(e) => onChangeContract(e.target.value)} />
    </div>
    <div className="mb-3">
      Method:
      <input type="text" onChange={(e) => onChangeMethod(e.target.value)} />
    </div>
    <div className="mb-3 flex flex-row">
      Arguments (JSON):
      <div>
        <textarea type="text" onChange={(e) => onChangeArgs(e.target.value)} />
      </div>
    </div>
    <button className="btn btn-outline-danger mt-3" onClick={handleProposal}>
      Submit
    </button>
  </div>
);
