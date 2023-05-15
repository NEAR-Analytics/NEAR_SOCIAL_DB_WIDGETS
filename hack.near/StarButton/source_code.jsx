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
if (state.starred === true) {
  starsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.starred === false) {
  delete starsByUsers[context.accountId];
}

const accountsWithStars = Object.keys(starsByUsers);
const starred = context.accountId && !!starsByUsers[context.accountId];

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
          type: starred ? false : true,
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

const title = starred ? "Starred" : "Star";

return (
  <div className="d-inline-flex align-items-center">
    <CommitButton
      disabled={state.loading || dataLoading || !context.accountId}
      title={title}
      onCommit={starClick}
    >
      {state.loading || dataLoading ? (
        <span
          className="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i className={`bi fs-4 pt-1 ${starred ? "bi-star-fill" : "bi-star"}`} />
      )}
    </CommitButton>
    <Widget src="hack.near/widget/StarButton.Faces" props={{ starsByUsers }} />
  </div>
);
