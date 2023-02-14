// near call social.near grant_write_permission ' --accountId yourproject.near --deposit 0.000000000000000000000001

const connected_account = context.accountId;

const social_contract_id = "social.near";

State.init({
  account: "",
});

let data = {
  accountId: state.account,
};

const handleGrantAccount = () => {
  const account = data.accountId;

  Near.call([
    {
      contractName: social_contract_id,
      methodName: "grant_write_permission",
      args: { predecessor_id: data.accountId, keys: [connected_account] },
      deposit: "1",
    },
  ]);
};

return (
  <div>
    <input id="accountid" type="text" value={state.account}></input>
    <button
      onClick={() => {
        handleGrantAccount();
      }}
    >
      {" "}
      DUIT{" "}
    </button>
  </div>
);
