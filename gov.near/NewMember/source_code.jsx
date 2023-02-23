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
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <div className="mb-3"></div>
    <div>
      <h2>Group Membership</h2>
      <h3>NEAR Account ID</h3>
      <input type="text" />
    </div>
    <div className="mb-3"></div>
    <div>
      <button onClick={handleProposal}>Submit</button>
    </div>
  </div>
);
