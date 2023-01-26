if (!context.accountId) {
  return "";
}

State.init({
  composeData: ({ content }) => {
    return {
      post: {
        main: JSON.stringify(content),
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
  },
  onChange: ({ content }) => {
    State.update({ content });
  },
});

return (
  <>
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        composeData: state.composeData,
        composeText: "Post",
        onChange: state.onChange,
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
