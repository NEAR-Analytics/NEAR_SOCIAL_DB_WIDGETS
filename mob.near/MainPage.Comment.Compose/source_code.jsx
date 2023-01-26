if (!context.accountId) {
  return "";
}

const item = props.item;

if (!context.accountId) {
  return "";
}

State.init({
  composeData: ({ content }) => {
    const data = {
      post: {
        comment: JSON.stringify(Object.assign({ item }, content)),
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
  },
  onChange: ({ content }) => {
    State.update({ content });
  },
  onCompose: () => {
    props.onComment && props.onComment(state.content);
  },
});

return (
  <>
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        composeData: state.composeData,
        composeText: "Comment",
        placeholder: "Reply",
        onChange: state.onChange,
        onCompose: state.onCompose,
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
