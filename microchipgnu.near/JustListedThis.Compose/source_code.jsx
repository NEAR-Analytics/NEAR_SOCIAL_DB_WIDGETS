if (!context.accountId) {
  return "";
}

const composeData = () => {
  const data = {
    post: {
      main: JSON.stringify(state.content),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };

  const notifications = state.extractTagNotifications(state.content.text, {
    type: "social",
    path: `${context.accountId}/post/main`,
  });

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});

return (
  <>
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        placeholder: "What's happening?",
        onChange: state.onChange,
        onHelper: ({ extractTagNotifications }) => {
          State.update({ extractTagNotifications });
        },
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="btn btn-dark rounded-3"
            data={composeData}
            onCommit={() => {
              onCompose();
            }}
          >
            Post
          </CommitButton>
        ),
      }}
    />
    {state.content && (
      <div className="mt-3">
        <Widget
          src="mob.near/widget/MainPage.Post"
          props={{
            accountId: context.accountId,
            content: state.content,
            blockHeight: "now",
          }}
        />
      </div>
    )}
  </>
);
