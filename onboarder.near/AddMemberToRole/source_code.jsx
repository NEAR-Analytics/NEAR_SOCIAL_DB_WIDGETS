let accountId = context.accountId;

const member_id = "onboarder.near";
// error check for DAO ends with .sputnik-dao.near

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  member_id: member_id,
  role: state.role,
});

const onChangeReciever = (reciever) => {
  State.update({
    reciever,
  });
};

const onChangeGas = (gas) => {
  State.update({
    gas,
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
      contractName: state.reciever,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: state.description ?? "potential member",
          kind: {
            AddMemberToRole: {
              member_id: state.member_id ?? accountId,
              role: state.role ?? "council",
            },
          },
        },
      },
      gas: state.gas ?? 200000000000000,
      deposit: state.deposit ?? 10000000000000000000000,
    },
  ]);
};

const onChangeMember = (member_id) => {
  State.update({
    member_id,
  });
};

const onChangeRole = (role) => {
  State.update({
    role,
  });
}; // pull roles from dao for input drop down once dao address is entered

return (
  <div className="mb-3">
    <h1>👋 Add Member to DAO Proposal</h1>
    DAO Address
    <input
      placeholder="onboarddao.sputnik-dao.near"
      onChange={(e) => onChangeReciever(e.target.value)}
    />
    <div className="mb-2">
      Account ID:
      <input
        type="text"
        placeholder="onboarder.near"
        onChange={(e) => onChangeMember(e.target.value)}
      />
    </div>
    <div className="mb-2">
      Role:
      <input
        type="text"
        placeholder="council"
        onChange={(e) => onChangeRole(e.target.value)}
      />
    </div>
    <div className="mb-2">
      tGas
      <input
        type="text"
        placeholder="200"
        onChange={(e) => onChangeGas(e.target.value * 1e12)}
      />
    </div>
    <div className="mb-2">
      Deposit
      <input
        type="text"
        placeholder="0.01"
        onChange={(e) => onChangeDeposit(e.target.value * 1e24)}
      />
    </div>
    <div className="mb-2">
      Description
      <input
        type="text"
        placeholder="add member"
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </div>
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Propose to Add Member to {state.reciever}
    </button>
  </div>
);
