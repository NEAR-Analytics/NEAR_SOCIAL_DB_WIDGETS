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
    </div>
    <div className="mb-3">
      <h5>Congratulations on getting your proposal accepted!</h5>
      <Widget
        src="williamxx.near/widget/CreatePoll-CreativesDAO"
        props={{ accountId, daoId }}
      />
    </div>
  </div>
);
