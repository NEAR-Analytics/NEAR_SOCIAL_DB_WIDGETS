if (!context.accountId) {
  return "";
}

// Initialize state
State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});

// composeData function remains the same
const composeData = () => {
  const daoId = "test-og-sbt.sputnik-dao.near";

  const content = {
    text: state.content,
  };

  const post_args = JSON.stringify({
    data: {
      [daoId]: {
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
      },
    },
  });

  return post_args;
};

// function to compose and encode data
const composeEncodedArgs = () => {
  const data = composeData();
  const buffer = Buffer.from(JSON.stringify(data));
  const encodedArgs = buffer.toString("base64");
  return encodedArgs;
};

return (
  <>
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        placeholder: "What's happening?",
        onChange: state.onChange,
        onHelper: ({ extractMentionNotifications, extractHashtags }) => {
          State.update({ extractMentionNotifications, extractHashtags });
        },
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="btn btn-dark rounded-3"
            data={composeData}
            onCommit={() => {
              const encodedArgs = composeEncodedArgs();

              const proposal = {
                proposal: {
                  description:
                    "post on near.social from DAO$$$$https://near.social/#/mob.near/widget/ProfilePage?accountId=test-og-sbt.sputnik-dao.near$$$$ProposeCustomFunctionCall",
                  kind: {
                    FunctionCall: {
                      receiver_id: "social.near",
                      actions: [
                        {
                          method_name: "set",
                          args: encodedArgs,
                          deposit: "0",
                          gas: "2000000",
                        },
                      ],
                    },
                  },
                },
              };

              Near.call(
                "test-og-sbt.sputnik-dao.near",
                "add_proposal",
                proposal,
                "220Tg"
              );

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
