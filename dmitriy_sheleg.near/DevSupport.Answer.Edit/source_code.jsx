if (!context.accountId) {
  return "";
}

const item = props.item;

const composeData = () => {
  const data = {
    question: {
      answer: JSON.stringify(Object.assign({ item }, state.content)),
    },
    index: {
      answer: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  const notifications = state.extractTagNotifications(state.content.text, {
    type: "social",
    path: `${context.accountId}/question/answer`,
  });

  if (props.notifyAccountId) {
    notifications.push({
      key: props.notifyAccountId,
      value: {
        type: "answer",
        item,
      },
    });
  }

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
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Compose"
      props={{
        placeholder: `Reply${
          props.notifyAccountId ? ` to ${props.notifyAccountId}` : ""
        }`,
        initialText: props.initialText,
        onChange: state.onChange,
        onHelper: ({ extractTagNotifications }) => {
          State.update({ extractTagNotifications });
        },
        composeButton: (onCompose) => (
          <CommitButton
            style={{
              backgroundColor: "#59E692",
              color: "#09342E",
              borderRadius: "50px",
              border: "none",
              padding: ".5rem 1.75rem",
            }}
            disabled={!state.content}
            force
            className="btn"
            data={composeData}
            onCommit={() => {
              onCompose();
              props.onComment && props.onComment(state.content);
            }}
          >
            Reply
          </CommitButton>
        ),
      }}
    />
  </>
);
