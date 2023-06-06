if (!context.accountId) {
  return "";
}

const item = props.item;

function extractMentions(text) {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  mentionRegex.lastIndex = 0;
  const accountIds = new Set();
  for (const match of text.matchAll(mentionRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
      match[1].length >= 2 &&
      match[1].length <= 64
    ) {
      accountIds.add(match[1].toLowerCase());
    }
  }
  return [...accountIds];
}

function extractTagNotifications(text, i) {
  return extractMentions(text || "")
    .filter((accountId) => accountId !== context.accountId)
    .map((accountId) => ({
      key: accountId,
      value: {
        type: "custom",
        message: "Tagged you on a discussion",
        widget: props.previewWidget,
        blockHeight: item.blockHeight,
        params: item,
      },
    }));
}

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

  let notifications = [];

  if (props.notifyAccountId) {
    notifications.push({
      key: props.notifyAccountId,
      value: {
        type: "custom",
        message: "Commented on a discussion",
        widget: props.previewWidget,
        blockHeight: item.blockHeight,
        params: item,
      },
    });
  }

  const tag_notifications = extractTagNotifications(state.content.text);
  notifications = notifications.concat(tag_notifications);

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
      src="dima_sheleg.near/widget/DevSupport.Compose"
      props={{
        placeholder: `Reply${
          props.notifyAccountId ? ` to ${props.notifyAccountId}` : ""
        }`,
        initialText: props.initialText,
        onChange: state.onChange,
        onHelper: ({ extractTagNotifications }) => {
          State.update({ extractTagNotifications });
        },
        withProfileImage: context.accountId,
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="commit-post-button"
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
