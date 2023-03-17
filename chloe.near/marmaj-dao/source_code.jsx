const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "marmaj.sputnik-dao.near";

if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://shard.dog/go" target="_blank" rel="noreferrer">
        <button>Create NEAR Wallet</button>
      </a>
    </div>
  );
}

return (
  <div>
    <div className="mb-3">
      <h2>DAO: {daoId}</h2>
    </div>
    <div className="mb-3">
      <h2>Groups:</h2>
      <Widget
        src="hack.near/widget/GroupMembers"
        props={{ accountId, daoId, groupId: "council" }}
      />
      <Widget
        src="hack.near/widget/GroupMembers"
        props={{ accountId, daoId, groupId: "advisors" }}
      />
    </div>
    <div className="mb-3">
      <h2>Proposals</h2>
      <h3>Membership</h3>
      <Widget
        src="hack.near/widget/AddMemberToRole"
        props={{ accountId, daoId }}
      />
      <Widget
        src="hack.near/widget/RemoveMemberFromRole"
        props={{ accountId, daoId }}
      />
    </div>
    <div className="mb-3">
      <h3>Transfer NEAR</h3>
      <Widget
        src="hack.near/widget/TransferProposal"
        props={{ accountId, daoId }}
      />
    </div>
    <div className="mb-3">
      <h3>Polling</h3>
      <Widget src="hack.near/widget/CreatePoll" props={{ accountId, daoId }} />
    </div>
    <div className="mb-3">
      <h3>Function Calls</h3>
      <Widget
        src="hack.near/widget/FunctionCallProposal"
        props={{ accountId, daoId }}
      />
    </div>
  </div>
);
