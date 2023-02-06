//Claim Tokens
if (!context.accountId) {
  return "Please sign in with NEAR wallet to claim tokens";
}

const onButtonClick = () => {
  const gas = 300 * 1000000000000;
  const deposit = 0;

  Near.call("lockup.burrow.near", "claim", {}, gas, deposit);
};

return (
  <div>
    <h1>Claim Locked Tokens </h1>
    <button
      disabled={context.loading}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onButtonClick}
    >
      Claim
    </button>
  </div>
);
