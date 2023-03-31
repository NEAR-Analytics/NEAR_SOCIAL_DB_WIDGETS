const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  amount: "",
  claims: "",
});

const YoctoToNear = (amount) =>
  new Big(amount).div(new Big(10).pow(24)).toString();

const keyInfo = Near.view("v2.keypom.near", "get_key_information");
const new_public_key = keyInfo.key;

const handleFunctionCall = () => {
  Near.call([
    {
      public_keys: keyInfo.key,
      contractName: "v2.keypom.near",
      methodName: "create_drop",
      gas: "100000000000000",
      args: {
        public_keys: [new_public_key],
        deposit_per_use: state.amount ?? "5",
        drop_config: {
          max_claims_per_key: state.claims ?? "1",
        },
      },
    },
  ]);
};

const onChangeClaims = (claims) => {
  State.update({
    claims,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

return (
  <div className="mb-3">
    <div className="mb-3">
      Amount per Drop:
      <input type="text" onChange={(e) => onChangeAmount(e.target.value)} />
    </div>
    <div className="mb-3">
      # of Claims per Drop:
      <input type="text" onChange={(e) => onChangeClaims(e.target.value)} />
    </div>
    <button
      className="btn btn-outline-danger mt-3"
      onClick={handleFunctionCall}
    >
      Create Drop
    </button>
  </div>
);
