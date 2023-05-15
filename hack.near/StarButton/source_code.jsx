const item = props.item;

if (!item) {
  return "";
}

const stars = Social.index("star", item);

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
    onCommit: () => State.update({ starred: !starred }),
  });
};

const title = starred ? "Starred" : "Star";

return (
  <div className="d-inline-flex align-items-center">
    <CommitButton title={title} onCommit={starClick}>
      <i className={`bi fs-4 pt-1 ${starred ? "bi-star-fill" : "bi-star"}`} />
      {`${starred ? "Starred" : "Star"}`}
    </CommitButton>
    <Widget src="hack.near/widget/StarButton.Faces" props={{ starsByUsers }} />
  </div>
);
