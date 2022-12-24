const item = props.item;

if (!item) {
  return "";
}

const likes = Social.index("like", item);

const dataLoading = likes === null;

const likesByUsers = {};

(likes || []).forEach((like) => {
  if (like.value.type === "like") {
    likesByUsers[like.accountId] = like;
  } else if (like.value.type === "unlike") {
    delete likesByUsers[like.accountId];
  }
});
if (state.hasLike === true) {
  likesByUsers[context.accountId] = true;
} else if (state.hasLike === false) {
  delete likesByUsers[context.accountId];
}

const numLikes = Object.keys(likesByUsers).length;
const hasLike = context.accountId && !!likesByUsers[context.accountId];

const LikeButton = styled.button`
  &:hover {
    color: red;
    .heart {
      background: pink;
    }
  }
  .bi-heart-fill {
    color: red;
  }
`;

const likeClick = () => {
  if (state.loading) {
    return;
  }
  State.update({
    loading: true,
  });
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
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "like",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasLike: !hasLike }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = hasLike ? "Unlike" : "Like";

const liAccountId = styled.div`
  width: 8em;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
`;

const accountsWithLikes = Object.keys(likesByUsers) ?? [];

return (
  <OverlayTrigger
    placement="right"
    overlay={
      <Tooltip>
        <div>
          {accountsWithLikes.slice(0, 10).map((account_id) => (
            <liAccountId>{account_id}</liAccountId>
          ))}
        </div>
        {accountsWithLikes.length > 10 ? (
          <liAccountId>
            ... and {accountsWithLikes.length - 10} more
          </liAccountId>
        ) : (
          ""
        )}
      </Tooltip>
    }
  >
    <LikeButton
      disabled={state.loading || dataLoading || !context.accountId}
      className={`btn border-0`}
      title={title}
      onClick={likeClick}
    >
      {state.loading ? (
        <span
          className="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : dataLoading ? (
        "Loading"
      ) : hasLike ? (
        <i className="heart p-2 rounded-circle bi bi-heart-fill"></i>
      ) : (
        <i className="heart p-2 rounded-circle bi bi-heart"></i>
      )}
      {numLikes > 0 ? <span className="text-muted">{numLikes}</span> : ""}
    </LikeButton>
  </OverlayTrigger>
);
