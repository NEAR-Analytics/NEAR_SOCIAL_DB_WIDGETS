if (!context.accountId) {
  return "";
}

const item = props.item;

if (!context.accountId) {
  return "";
}

const composeData = () => {
  const data = {
    post: {
      comment: JSON.stringify(Object.assign({ item }, state.content)),
    },
    index: {
      comment: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  if (props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "comment",
        item,
      },
    });
  }
  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
  onCompose: () => {},
});

return (
  <>
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        placeholder: "Reply",
        onChange: state.onChange,
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="btn btn-dark rounded-3"
            data={composeData}
            onCommit={() => {
              onCompose();
              props.onComment && props.onComment(state.content);
            }}
          >
            Comment
          </CommitButton>
        ),
      }}
    />
    {state.content && (
      <div className="mt-3">
        <Widget
          src="mob.near/widget/MainPage.Comment"
          props={{
            item,
            accountId: context.accountId,
            content: state.content,
            blockHeight: "now",
          }}
        />
      </div>
    )}
  </>
);
