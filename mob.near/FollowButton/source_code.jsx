if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const o = Social.keys(
  `${context.accountId}/graph/follow/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = o === null;
const follow = o && Object.keys(o).length;

return (
  <CommitButton
    disabled={loading}
    className={`btn ${loading || follow ? "btn-outline-dark" : "btn-primary"}`}
    data={{
      graph: { follow: { [props.accountId]: follow ? null : "" } },
    }}
  >
    {loading ? "Loading" : follow ? "Following" : "Follow"}
  </CommitButton>
);
