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

const Button = styled.button`
    border: none;
    background-color: transparent;
`;

return (
  <Button
    disabled={state.loading || dataLoading || !context.accountId}
    className={props.className}
    onClick={onClick}
  >
    <i class="bi bi-check-circle me-1" />
    <span>{text}</span>
  </Button>
);
