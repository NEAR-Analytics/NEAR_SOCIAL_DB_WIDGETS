if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const followEdge = Social.keys(
  `${context.accountId}/graph/follow/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = followEdge === null || inverseEdge === null;
const follow = followEdge && Object.keys(followEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

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
    {loading
      ? "Loading"
      : follow
      ? "Following"
      : inverse
      ? "Follow back"
      : "Follow"}
  </CommitButton>
);
