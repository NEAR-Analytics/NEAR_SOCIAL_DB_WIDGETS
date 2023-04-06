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
  Near.call(adminContract, "hide_element", {
    id: { account_id: accountId, block_height: blockHeight },
  });
};

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className={`btn ${props.className}`}
    onClick={onClick}
  >
    <i class="bi bi-eye-slash" />
    <span>{props.text}</span>
  </button>
);
