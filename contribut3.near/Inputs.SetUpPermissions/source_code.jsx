const ownerId = "contribut3.near";

State.init({
  following: [],
  followingIsFetched: false,
  value: [],
})

if (!state.followingIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${context.accountId}/graph/follow/*`] },
    "final",
    false,
  ).then((data) => State.update({
    following: Object.keys(data[context.accountId].graph.follow).map((name) => ({ name })),
    followingIsFetched: true,
  }));
  return <>Loading...</>;
}

// console.log(Social.get(`${context.accountId}/graph/follow/*`, "final", {
//   // return_type: "BlockHeight",
//   // values_only: true,
// }));

return (<Widget
  src={`${ownerId}/widget/Inputs.MultiSelect`}
  props={{
    label: "Accounts to add permissions to",
    placeholder: "Add accounts",
    options: state.following,
    value: state.value,
    onChange: (value) => State.update({ value }),
  }}
/>);
