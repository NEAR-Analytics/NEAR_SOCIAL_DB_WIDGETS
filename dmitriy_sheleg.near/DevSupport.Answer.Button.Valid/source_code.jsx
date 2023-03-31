const accountId = props.accountId;
const blockHeight = props.blockHeight;
const adminContract = props.adminContract;
const admins = props.admins || [];

if (accountId === undefined || blockHeight === undefined) {
  return;
}

if (context.loading) {
  return "Loading";
}

// if (!admins.includes(context.accountId)) {
//   return "";
// }

const onClick = () => {
  Near.call(adminContract, "mark_useful", {
    id: { account_id: accountId, block_height: blockHeight },
    amount: "1",
  });
};

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className="text-success border-0 bg-white mt-3 float-right"
    onClick={onClick}
  >
    <i class="bi bi-exclamation-circle" />
    Mark as Valid
  </button>
);
