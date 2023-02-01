const accountId = props.accountId;
const blockHeight = props.blockHeight;

const item = {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const likes = Social.index("upvote", item);

const dataLoading = likes === null;

let upvotes = 0;
let downvotes = 0;

(likes || []).forEach((like) => {
  if (like.value.type === "upvote") {
    upvotes += 1;
  }
  if (like.value.type === "downvote") {
    downvotes += 1;
  }
});

// state.hasLike === true

// const hasLike = context.accountId && !!likesByUsers[context.accountId];

const likeClick = () => {
  if (state.loading) {
    return;
  }
  State.update({
    loading: true,
  });
  const data = {
    index: {
      upvote: JSON.stringify({
        key: item,
        value: {
          type: hasLike ? "downvote" : "upvote",
        },
      }),
    },
  };

  if (!hasLike && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "upvote",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasLike: !hasLike }),
    onCancel: () => State.update({ loading: false }),
  });
};

return (
  <div className="d-inline-flex align-items-center">
    <button
      disabled={state.loading || dataLoading || !context.accountId}
      className="text-primary border-0 bg-white"
      onClick={likeClick}
    >
      {state.loading || dataLoading ? (
        <span
          className="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i class={`bi bi-arrow-up-square`}> </i>
      )}
      Upvote [{upvotes}]
    </button>
  </div>
);
