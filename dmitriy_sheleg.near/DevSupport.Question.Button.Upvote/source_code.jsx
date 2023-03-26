const accountId = props.accountId;
const blockHeight = props.blockHeight;
// const accountId =
// "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055";
// const blockHeight = 84207156;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

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

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: 1px solid #DFE3E6;
  border-radius: 50px;
  color: #687076;
  padding: 8px 12px 12px;
  transition: all .15s ease;

  &:hover {
    color: #30A46C;
    border-color: #30A46C;
  }
`;

return (
  <div className="d-inline-flex">
    <Button
      disabled={state.loading || dataLoading || !context.accountId}
      onClick={likeClick}
    >
      {state.loading || dataLoading ? (
        <span
          class="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i class="bi bi-caret-up-fill" />
      )}
      {upvotes}
    </Button>
  </div>
);
