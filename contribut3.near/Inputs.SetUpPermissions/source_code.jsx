const ownerId = "contribut3.near";
const onSave = props.onSave ?? (() => { });

State.init({
  following: [],
  followingIsFetched: false,
  value: [],
  accountsWithPermissions: [],
  accountsWithPermissionsIsFetched: false,
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
}

if (!state.accountsWithPermissionsIsFetched) {
  Near.asyncView(
    "social.near",
    "debug_get_permissions",
    { account_id: context.accountId },
    "final",
    false,
  ).then((data) => State.update({
    accountsWithPermissions: data.map(([info]) => info).filter((info) => "AccountId" in info).map(({ AccountId }) => AccountId),
    accountsWithPermissionsIsFetched: true,
  }));
}

if (!state.followingIsFetched || !state.accountsWithPermissionsIsFetched) {
  return <>Loading...</>;
}


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
