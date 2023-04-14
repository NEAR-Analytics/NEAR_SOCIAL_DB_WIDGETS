const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "creativesdao.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: state.description,
});

const handleProposal = () => {
  if (!state.description) {
    return;
  }
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: state.description,
          kind: "Vote",
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

return (
  <div className="mb-3">
    To proceed with the payout process, please create a poll. The poll should
    include:
    <h6>
      DAO Name, Creatives DAO funding [Month], Total request amount in USD,
      Target Wallet:
    </h6>
    <input type="text" onChange={(e) => onChangeDescription(e.target.value)} />
    <button className="btn btn-outline-primary mt-3" onClick={handleProposal}>
      Create Poll
    </button>
  </div>
);
