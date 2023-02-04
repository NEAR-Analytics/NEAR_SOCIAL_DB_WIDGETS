const accountId = props.accountId;
const blockHeight = props.blockHeight;
const adminContract = props.adminContract;
const admins = props.admins;

if (!admins.includes(context.accountId)) {
  return "";
}

const onClick = () => {
  Near.call(adminContract, "mark_useful", {
    id: { account_id: accountId, block_height: blockHeight },
  });
};

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className="text-success border-0 bg-white mt-3"
    onClick={onClick}
  >
    <i class={`bi bi-check-square`}> </i>
    Mark as Valid
  </button>
);
