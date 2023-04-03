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

const onChangeLink = (link) => {
  State.update({
    link,
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
  const link = state.link ? state.link.toString() : "";
  const description = `${state.description.trim()}$$$$${link}`;
  Near.call([
    {
      contractName: state.contract_name,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: description,
          kind: {
            Transfer: {
              token_id: "",
              receiver_id: state.recipient.trim().toLowerCase(),
              amount: convertAmount(state.amount.toString(), 24) ?? 0,
            },
          },
        },
      },
      gas: state.gas ?? 200000000000000,
      deposit:
        convertAmount(state.deposit.toString(), 24) ?? 100000000000000000000000,
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
      Link:
      <input type="text" onChange={(e) => onChangeLink(e.target.value)} />
    </div>
    <div className=" mb-2">
      Payout Amount
      <input
        type="text"
        placeholder="0.5"
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
        onChange={(e) => onChangeDeposit(e.target.value)}
      />
      <p>
        * You will pay a deposit
        {state.deposit ? "of Ⓝ" + state.deposit.toString() : ""} to add this
        proposal!, the deposit will be refunded if proposal rejected or expired.
      </p>
    </div>
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Submit
    </button>
  </div>
);
