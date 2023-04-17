const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "creativesdao.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: state.description,
  receiver_id: accountId,
  amount: state.amount,
});

const handleProposal = () => {
  if (!(state.receiver_id && state.amount)) {
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
          kind: {
            Transfer: {
              token_id: "",
              receiver_id: state.receiver_id,
              amount: state.amount,
            },
          },
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

const onChangeRecipient = (receiver_id) => {
  State.update({
    receiver_id,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

return (
  <div className="mb-3">
    <div className="mb-2">
      Description:
      <input
        type="text"
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </div>
    <div className="mb-2">
      Target Wallet:
      <input type="text" onChange={(e) => onChangeRecipient(e.target.value)} />
    </div>
    <div className="mb-3">
      Amount in USD:
      <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    </div>
    <button className="btn btn-success" onClick={handleProposal}>
      Propose Transfer
    </button>
  </div>
);
