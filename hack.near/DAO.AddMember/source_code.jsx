const accountId = context.accountId;
const memberId = props.memberId;
const roleId = props.roleId ?? "council";
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "";
}

const policy = Near.view(daoId, "get_policy");
const deposit = policy.proposal_bond;

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "add member to DAO",
          kind: {
            AddMemberToRole: {
              member_id: memberId ?? accountId,
              role: role ?? "council",
            },
          },
        },
      },
      gas: 300000000000000,
      deposit: deposit,
    },
  ]);
};

return (
  <div>
    <button className="btn btn-outline-success" onClick={handleProposal}>
      Add to {roleId}
    </button>
  </div>
);
