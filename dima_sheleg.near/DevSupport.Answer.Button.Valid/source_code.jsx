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

if (!admins.includes(context.accountId)) {
  return "";
}

return (
  <button
    disabled={state.loading || dataLoading || !context.accountId}
    className={`btn ${props.className}`}
    onClick={onClick}
  >
    <i class="bi bi-check-circle me-1" />
    <span>{text}</span>
  </button>
);
