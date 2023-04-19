const ownerId = "contribut3.near";

console.log(Social.get(`${context.accountId}/graph/follow/*`, "final", {
  // return_type: "BlockHeight",
  // values_only: true,
}));

return (<Widget
  src={`${ownerId}/widget/Inputs.MultiSelect`}
  props={{
    label: "Accounts to add permissions to",
    placeholder: "Add accounts",
    options: [{ name: "wallets" }, { name: "games" }],
    value: state.tags,
    onChange: (tags) => State.update({ tags }),
  }}
/>);
