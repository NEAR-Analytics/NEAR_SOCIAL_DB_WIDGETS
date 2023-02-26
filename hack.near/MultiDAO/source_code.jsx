const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

return (
  <div>
    <div className="mb-3">
      <Widget src="hack.near/widget/AddMemberToRole" props={{ accountId }} />
      <Widget
        src="hack.near/widget/RemoveMemberFromRole"
        props={{ accountId }}
      />
    </div>
    <div className="mb-3">
      <Widget src="hack.near/widget/TransferProposal" props={{ accountId }} />
    </div>
    <div className="mb-3">
      <Widget src="hack.near/widget/CreatePoll" props={{ accountId }} />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/FunctionCallProposal"
        props={{ accountId }}
      />
    </div>
  </div>
);
