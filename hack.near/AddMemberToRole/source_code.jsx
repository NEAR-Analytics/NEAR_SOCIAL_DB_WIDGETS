const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  member_id: accountId,
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
              role: "community",
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

return (
  <button className="btn btn-primary" onClick={handleProposal}>
    Propose to Add Member
  </button>
);
