const accountId = context.accountId;
const daoId = props.daoId ?? "onboarddao.sputnik-dao.near";
const role = props.role ?? "council";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

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
              role: role,
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
  <div className="mb-3">
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Request to Join
    </button>
  </div>
);
