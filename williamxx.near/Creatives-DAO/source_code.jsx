const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "creativesdao.sputnik-dao.near";

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
      <h2>WELCOME TO CREATIVES DAO</h2>
      <Widget src="hack.near/widget/DAO" props={{ daoId }} />
    </div>
    <div className="mb-3">
      <h5>Congratulations on getting your proposals accepted</h5>
      <Widget src="hack.near/widget/CreatePoll" props={{ accountId, daoId }} />
    </div>
  </div>
);
