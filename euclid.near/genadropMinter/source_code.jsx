let accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

const handleProposal = () => {
  if (!(state.description && state.kind)) {
    return;
  }
  const proposal = {
    description: state.description,
    kind: state.kind,
    member_id: state.member_id,
    role: state.role,
  };
  {
    const gas = 200000000000000;
    const deposit = 10000000000000000000000;
    Near.call([
      {
        contractName: "global.sputnik-dao.near",
        methodName: "add_proposal",
        args: {
          proposal: {
            description: state.description,
            kind: {
              AddMemberToRole: {
                member_id: state.member_id,
                role: state.role,
              },
            },
          },
        },
        gas: gas,
        deposit: deposit,
      },
    ]);
  }
};

initState({
  description: "",
  kind: "",
});

const onChangeKind = (kind) => {
  State.update({
    kind,
  });
};

const onChangeDesc = (description) => {
  State.update({
    description,
  });
};

const onChangeRole = (role) => {
  State.update({
    role,
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
    <div></div>
    <div>
      <h3>Proposal Description</h3>
      <input type="text" onChange={(e) => onChangeDesc(e.target.value)} />
    </div>
    <div className="mb-3"></div>
    <div className="flex-grow-1 d-none">
      <h3>Proposal Kind</h3>
      <p>Available Options:</p>
      <ul>
        <li>ChangeConfig</li>
        <li>ChangePolicy</li>
        <li>AddMemberToRole</li>
        <li>RemoveMemberFromRole</li>
        <li>FunctionCall</li>
        <li>UpgradeSelf</li>
        <li>UpgradeRemote</li>
        <li>Transfer</li>
        <li>SetStakingContract</li>
        <li>AddBounty</li>
        <li>BountyDone</li>
        <li>Vote</li>
        <li>FactoryInfoUpdate</li>
        <li>ChangePolicyAddOrUpdateRole</li>
        <li>ChangePolicyRemoveRole</li>
        <li>ChangePolicyUpdateDefaultVotePolicy</li>
        <li>ChangePolicyUpdateParameters</li>
      </ul>
      <input type="text" onChange={(e) => onChangeKind(e.target.value)} />
    </div>
    <div className="mb-3"></div>
    <div>
      <h3>New Member ID</h3>
      <input type="text" onChange={(e) => onChangeMember(e.target.value)} />
    </div>
    <div className="mb-3"></div>
    <div>
      <h3>Role / Group Name</h3>
      <input type="text" onChange={(e) => onChangeRole(e.target.value)} />
    </div>
    <div className="mb-3"></div>
    <div>
      <button onClick={handleProposal}>Submit Proposal</button>
    </div>
  </div>
);
