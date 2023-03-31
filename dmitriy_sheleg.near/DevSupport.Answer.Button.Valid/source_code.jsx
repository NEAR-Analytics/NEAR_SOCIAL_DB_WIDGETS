const accountId = props.accountId;
const blockHeight = props.blockHeight;
const adminContract = props.adminContract;
const admins = props.admins || [];
const text = props.text || "Mark as Valid";
const onClick = props.onClick;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

if (context.loading) {
  return "Loading";
}

// if (!admins.includes(context.accountId)) {
//   return "";
// }

// const onClick = () => {
//   Near.call(adminContract, "mark_useful", {
//     id: { account_id: accountId, block_height: blockHeight },
//     amount: "1",
//   });
// };

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className={props.className ?? "border-0 bg-white mt-3"}
    onClick={onClick}
  >
    <i class="bi bi-exclamation-circle" />
    {text}
  </button>
);
