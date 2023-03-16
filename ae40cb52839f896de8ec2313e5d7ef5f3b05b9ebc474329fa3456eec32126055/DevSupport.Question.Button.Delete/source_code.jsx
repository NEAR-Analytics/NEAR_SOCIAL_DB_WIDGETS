const accountId = props.accountId;
const blockHeight = props.blockHeight;
const adminContract = props.adminContract;
const admins = props.admins;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

if (!admins.includes(context.accountId)) {
  return "";
}

const onClick = () => {
  Near.call(adminContract, "hide_element", {
    id: { account_id: accountId, block_height: blockHeight },
  });
};

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className="text-black border-0 bg-white ms-3"
    onClick={onClick}
  >
    <i class={`bi bi-trash`}> </i>
    Delete
  </button>
);
