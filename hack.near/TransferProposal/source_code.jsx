const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  token_id: state.token_id,
  receiver_id: state.receiver_id,
  amount: state.amount,
});

const handleProposal = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: "multi.sputnik-dao.near",
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "transfer proposal",
          kind: {
            Transfer: {
              token_id: token_id,
              receiver_id: receiver_id,
              amount: amount,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeToken = (token_id) => {
  State.update({
    token_id,
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
      Token ID:
      <input type="text" onChange={(e) => onChangeToken(e.target.value)} />
    </div>
    <div className="mb-2">
      Recipient:
      <input type="text" onChange={(e) => onChangeRecipient(e.target.value)} />
    </div>
    <div className="mb-3">
      Amount:
      <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    </div>
    <button className="btn btn-success" onClick={handleProposal}>
      Propose Transfer
    </button>
  </div>
);
