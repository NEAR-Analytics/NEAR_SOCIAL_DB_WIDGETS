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

const data = {
  graph: { follow: { [props.accountId]: follow ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "follow",
      value: {
        type: follow ? "unfollow" : "follow",
        accountId: props.accountId,
      },
    }),
  },
};

return (
  <CommitButton
    disabled={loading}
    className={`btn ${loading || follow ? "btn-outline-dark" : "btn-primary"}`}
    data={data}
  >
    {loading ? "Loading" : follow ? "Following" : "Follow"}
  </CommitButton>
);
