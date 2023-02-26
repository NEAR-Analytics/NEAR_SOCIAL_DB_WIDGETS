const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  member_id: accountId ?? state.member_id,
  role: state.role ?? "council",
});

const handleProposal = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "potential member",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
              role: state.role,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
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
};

return (
  <div>
    <div className="mb-2">
      Account ID:
      <input type="text" onChange={(e) => onChangeMember(e.target.value)} />
    </div>
    <div className="mb-2">
      Role:
      <input type="text" onChange={(e) => onChangeRole(e.target.value)} />
    </div>
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Propose to Add Member
    </button>
  </div>
);
