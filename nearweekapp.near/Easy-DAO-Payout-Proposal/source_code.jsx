let accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const convertAmount = (amount, decimals) => {
  const [whole, fractional] = amount.toString().split(".");
  const wholePart = new BN(whole).mul(new BN("10").pow(new BN(decimals)));
  if (fractional === undefined) {
    return wholePart.toString();
  }
  const fractionalPart = new BN(fractional).mul(
    new BN("10").pow(new BN(decimals - fractional.length))
  );
  return wholePart.add(fractionalPart).toString();
};

State.init({
  recipient: accountId,
  contract_name: "nearweek-news-contribution.sputnik-dao.near",
});

const onChangeGas = (gas) => {
  State.update({
    gas,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

const onChangeContract = (contract_name) => {
  State.update({
    contract_name,
  });
};

const onChangeRecipient = (recipient) => {
  State.update({
    recipient,
  });
};

const onChangeDeposit = (deposit) => {
  State.update({
    deposit,
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

const handleProposal = () => {
  Near.call([
    {
      contractName: state.contract_name,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: state.description.trim(),
          kind: {
            Transfer: {
              token_id: "",
              receiver_id: state.recipient,
              amount: convertAmount(state.amount.toString(), 24) ?? 0,
            },
          },
        },
      },
      gas: state.gas ?? 200000000000000,
      deposit: state.deposit ?? 100000000000000000000000,
    },
  ]);
};

return (
  <div className="mb-3">
    <h2>Create Payout Proposal</h2>
    <div className=" mb-2">
      DAO:
      <input
        type="text"
        placeholder={state.contract_name}
        onChange={(e) => onChangeContract(e.target.value)}
      />
    </div>
    <div className="mb-2">
      Description
      <textarea
        value={state.description}
        type="text"
        rows={6}
        className="form-control"
        placeholder="describe your proposal"
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </div>
    <div className=" mb-2">
      Payout Amount
      <input
        type="text"
        placeholder="0"
        onChange={(e) => onChangeAmount(e.target.value)}
      />
    </div>
    <div className=" mb-2">
      Payout Recipient
      <input
        type="text"
        placeholder={accountId}
        onChange={(e) => onChangeRecipient(e.target.value)}
      />
    </div>
    <div className=" mb-2">
      Deposit
      <input
        type="text"
        placeholder="0.1"
        onChange={(e) => onChangeDeposit(e.target.value * 1e24)}
      />
      <p>
        * You will pay a deposit of Ⓝ0.1 to add this proposal!, the deposit will
        be refunded if proposal rejected or expired.
      </p>
    </div>
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Submit
    </button>
  </div>
);
