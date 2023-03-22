if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

State.init({ hoveringElement: "" });

const standardButtonStyles = {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 1.5rem",
  backgroundColor: "#010A2D",
  borderRadius: "12px",
  color: "white",
  textDecoration: "none",
  marginBottom: "1rem",
};

const hoveringButtonStyles = {
  border: "2px solid black",
  color: "black",
  backgroundColor: "white",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 1.5rem",
  borderRadius: "12px",
  textDecoration: "none",
  marginBottom: "1rem",
};

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

const type = follow ? "unfollow" : "follow";

const data = {
  graph: { follow: { [props.accountId]: follow ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "follow",
      value: {
        type,
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type,
      },
    }),
  },
};

return (
  <CommitButton
    disabled={loading}
    style={
      state.hoveringElement == "followButton"
        ? hoveringButtonStyles
        : standardButtonStyles
    }
    disabled={loading || follow}
    data={data}
    onMouseEnter={() => {
      State.update({ hoveringElement: "followButton" });
    }}
    onMouseLeave={() => {
      State.update({ hoveringElement: "" });
    }}
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
