const accountId = context.accountId;

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
      contractName: "global.sputnik-dao.near",
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
  <div>
    <button className="btn btn-success" onClick={handleProposal}>
      Apply for Membership
    </button>
  </div>
);
