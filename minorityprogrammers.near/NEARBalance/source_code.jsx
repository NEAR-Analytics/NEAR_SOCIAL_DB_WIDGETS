const balance = 0; // make it balance of account logged in
const accountId = context.accountId; // default for context
if (accountId) {
  accountId = "minorityprogrammers.near"; // for those not logged in
}
// if no context then should show root.near default
State.init({
  accountId: accountId,
  balance: balance,
  validReceiver: true,
});
// add balance change

const onChangeAccount = (accountId) => {
  const validReceiverLink = isNearAddress(accountId); // add error message or change button based on this
  State.update({
    accountId,
    validReceiver: validReceiverLink,
  });
};

const onChangeBalance = () => {
  // add balance logic
  // const balance1 =  near.account(accountId).getAccountBalance;
  State.update({
    balance,
  });
};

/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}
return (
  <div>
    <div
      x
      className="p-2"
      style={{
        background: "#fdfdfd",
        border: "solid 1px #dee2e6",
        borderTop: 0,
        borderBottomLeftRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        minHeight: "9em",
      }}
    >
      <div>
        Wallet Address
        <input
          type="text"
          placeholder={state.accountId}
          onChange={(e) => onChangeAccount(e.target.value)}
        />
        <div className="mt-2"></div>
        NEAR Balance
        <h2>{state.balance}</h2>
        {!state.validReceiver && (
          <div className="btn btn-danger ">Invalid Address</div>
        )}
      </div>
    </div>
  </div>
);
