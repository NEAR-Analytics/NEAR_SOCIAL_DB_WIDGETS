const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "onboarddao.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

return (
  <div>
    <div className="mb-3">
      {" "}
      <h1>👋 OnboardDAO</h1>
    </div>
    <div className="mb-3">
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
