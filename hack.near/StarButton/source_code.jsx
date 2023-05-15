const item = props.item;

if (!item) {
  return "";
}

const stars = Social.index("star", item);

const dataLoading = stars === null;

const starsByUsers = {};

(stars || []).forEach((star) => {
  if (star.value.type === "star") {
    starsByUsers[star.accountId] = star;
  } else if (star.value.type === "unstar") {
    delete starsByUsers[star.accountId];
  }
});
if (state.hastar === true) {
  starsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.starred === false) {
  delete starsByUsers[context.accountId];
}

const accountsWithStars = Object.keys(starsByUsers);
const starred = context.accountId && !!starsByUsers[context.accountId];

const StarButton = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  &:hover {
    color: red;
    background: pink;
  }
  .bi-heart-fill {
    color: red;
  }
`;

const starClick = () => {
  if (state.loading) {
    return;
  }
  State.update({
    loading: true,
  });
  const data = {
    index: {
      star: JSON.stringify({
        key: item,
        value: {
          type: starred ? "unstar" : "star",
        },
      }),
    },
  };

  if (!starred && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "star",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, starred: !starred }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = starred ? "Unstar" : "Star";

return (
  <div className="d-inline-flex align-items-center">
    <StarButton
      disabled={state.loading || dataLoading || !context.accountId}
      className="btn me-1"
      title={title}
      onClick={starClick}
    >
      {state.loading || dataLoading ? (
        <span
          className="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i
          className={`bi fs-4 pt-1 ${starred ? "bi-heart-fill" : "bi-heart"}`}
        />
      )}
    </StarButton>
    <Widget src="hack.near/widget/StarButton.Faces" props={{ starsByUsers }} />
  </div>
);
