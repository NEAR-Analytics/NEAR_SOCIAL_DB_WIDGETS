const accountId = props.accountId;
const blockHeight = props.blockHeight;
const adminContract = props.adminContract;
const admins = props.admins;

if (!admins.includes(context.accountId)) {
  return "";
}

const onClick = () => {
  Near.call(adminContract, "hide_element", { id: { accountId, blockHeight } });
};

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className="text-black border-0 bg-white"
    onClick={onClick}
  >
    <i class={`bi bi-trash`}> </i>
    Delete
  </button>
);
