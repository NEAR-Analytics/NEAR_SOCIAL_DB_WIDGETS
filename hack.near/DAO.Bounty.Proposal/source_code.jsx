const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: state.description,
  token: state.token,
  amount: state.amount,
  times: state.times,
  max_deadline: state.max_deadline,
});

const handleProposal = () => {
  const bounty = {
    description: state.description,
    token: state.token ?? "",
    amount: state.amount,
    times: state.times,
    max_deadline: state.max_deadline,
  };
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new bounty proposal",
          kind: {
            AddBounty: {
              bounty,
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

const onChangeToken = (token) => {
  State.update({
    token,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

const onChangeTimes = (times) => {
  State.update({
    times,
  });
};

const onChangeDeadline = (max_deadline) => {
  State.update({
    max_deadline,
  });
};

return (
  <div className="mb-3">
    <h2>Propose New Bounty</h2>
    <h5>Bounty Description:</h5>
    <div className="mb-2">
      <textarea onChange={(e) => onChangeDescription(e.target.value)} />
    </div>
    <div className="mb-2">
      Reward Token ID:
      <input type="text" onChange={(e) => onChangeToken(e.target.value)} />
    </div>
    <div className="mb-3">
      Amount per Claim:
      <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    </div>
    <div className="mb-3">
      Number of times the bounty can be claimed:
      <input type="number" onChange={(e) => onChangeTimes(e.target.value)} />
    </div>
    <div className="mb-3">
      Number of hours (after claim) until the deadline:
      <input type="number" onChange={(e) => onChangeDeadline(e.target.value)} />
    </div>
    <button className="btn btn-success" onClick={handleProposal}>
      Propose Bounty
    </button>
  </div>
);
