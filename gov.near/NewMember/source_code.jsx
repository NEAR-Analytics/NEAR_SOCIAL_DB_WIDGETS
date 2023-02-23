let accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

State.init({
  member_id: accountId,
});

const handleProposal = () => {
  if (!state.member_id) {
    return;
  }
  const proposal = {
    description: "proposal to add member",
    kind: {
      AddMemberToRole: {
        member_id: state.member_id,
        role: "community",
      },
    },
  };
  console.log("check", proposal);
  asyncFetch().then(() => {
    const gas = 200000000000000;
    const deposit = 100000000000000000000000;
    Near.call([
      {
        contractName: "global.sputnik-dao.near",
        methodName: "add_proposal",
        args: {
          proposal: {
            description: "proposal to add member",
            kind: {
              AddMemberToRole: {
                member_id: state.member_id,
                role: "community",
              },
            },
          },
        },
        gas: gas,
        deposit: deposit,
      },
    ]);
  });
};

const onChangeMember = (member_id) => {
  State.update({
    member_id,
  });
};

return (
  <div>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <div className="mb-3"></div>
    <div>
      <h2>Group Membership</h2>
      <h3>NEAR Account ID</h3>
      <input type="text" onChange={(e) => onChangeMember(e.target.value)} />
    </div>
    <div className="mb-3"></div>
    <div>
      <button onClick={handleProposal}>Submit</button>
    </div>
  </div>
);
