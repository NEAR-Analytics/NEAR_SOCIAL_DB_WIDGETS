let accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const handleProposal = () => {
  const proposal = {
    description: "proposal to add member",
    kind: {
      AddMemberToRole: {
        member_id: accountId,
        role: "community",
      },
    },
  };
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: "global.sputnik-dao.near",
      methodName: "add_proposal",
      args: proposal,
      gas: gas,
      deposit: deposit,
    },
  ]);
};

return (
  <div>
    <button onClick={handleProposal}>Apply for Membership</button>
  </div>
);
