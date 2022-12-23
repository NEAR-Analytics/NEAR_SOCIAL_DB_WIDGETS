const item = props.item;

if (!item) {
  return "";
}

const likes = Social.index("like", item);

const loading = likes === null;

const likesByUsers = {};

(likes || []).forEach((like) => {
  if (like.value.type === "like") {
    likesByUsers[like.accountId] = like;
  } else if (like.value.type === "unlike") {
    delete likesByUsers[like.accountId];
  }
});

const numLikes = Object.keys(likesByUsers).length;
const hasLike =
  context.accountId && (state.hasLike || !!likesByUsers[context.accountId]);

const data = {
  index: {
    like: JSON.stringify({
      key: item,
      value: {
        type: hasLike ? "unlike" : "like",
      },
    }),
  },
};

if (!hasLike && props.notifyAccountId) {
  data.notify = JSON.stringify({
    key: props.notifyAccountId,
    value: {
      type: "like",
      item,
    },
  });
}

const LikeButton = styled.CommitButton`
  &:hover {
    color: red;
    background: pink;
  }
`;

return (
  <LikeButton
    disabled={loading || !context.accountId}
    className={`btn border-0 rounded-circle`}
    data={data}
    onCommit={() => State.update({ hasLike: !hasLike })}
    title={hasLike ? "Unlike" : "Like"}
  >
    {loading ? (
      "Loading"
    ) : hasLike ? (
      <i className="bi bi-heart-fill"></i>
    ) : (
      <i className="bi bi-heart"></i>
    )}
    {numLikes > 0 ? numLikes : ""}
  </LikeButton>
);
