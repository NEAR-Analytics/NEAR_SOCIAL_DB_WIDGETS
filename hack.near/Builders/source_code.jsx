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
  <div className="container">
    <div className="row mb-3"></div>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <div className="row mb-3">
      <div className="mb-3"></div>
      <div>
        <h1>Evolving Guides for Builders</h1>
        <p>
          Let's collaborate to gather knowledge and improve common resources for
          open web developers. Choose your own adventure to discover what is
          possible! #NEAR
        </p>
        <div className="mb-3"></div>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Dev"
        >
          Widgets
        </a>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Docs"
        >
          APIs
        </a>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Data"
        >
          Data
        </a>
      </div>
      <div className="mb-3"></div>
      <div className="alert alert-primary">
        <h2>Near Social Hackathon</h2>
        <h3>
          <b>February 8-24</b>
        </h3>
        <h5>
          <b>Goal:</b> Onboarding Devs Quickly and Easily
        </h5>
        <p>
          To get started, check out ideas on the{" "}
          <a href="https://devgovgigs.near.social">Gigs Board</a>.
        </p>
        <div className="mb-3"></div>
        <a
          className="btn btn-outline-primary"
          href="https://devgovgigs.near.social"
        >
          Explore Ideas
        </a>
        <a className="btn btn-outline-primary" href="https://t.me/NearSocial">
          Group Chat
        </a>
        <div className="mb-3"></div>
        <div>
          <h3>Prize Pools</h3>
          <ul>
            <li>
              Onboarding Solutions: <b>$5000</b>
            </li>
            <li>
              Gaming Use Cases: <b>1000 NEAR</b>
            </li>
          </ul>
        </div>
        <div className="mb-3"></div>
        <div>
          <h4>Submit Your Project</h4>
          <h5>Create a Summary Post</h5>
          <p>
            These project submissions will appear in the{" "}
            <a href="https://near.social/#/mob.near/widget/MainPage.Content">
              main page
            </a>{" "}
            content.
          </p>
          <p>Be sure to include any relevant links by using Markdown format:</p>
          <p>
            <i>[link text](URL)</i>
          </p>
          <p>
            Remember to notify the jury by mentioning @hack.near in your post.
            We are looking for any useful contributions and helpful
            documentation.
          </p>
          <p>
            Follow <a href="https://devs.near.social">@devs.near</a> to learn
            more!
          </p>
        </div>
        <div className="mb-3"></div>
        <Widget
          src="mob.near/widget/Common.Compose"
          props={{
            placeholder: "Hackathon Project Submission @hack.near",
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
                Submit
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
      </div>
      <div className="mb-3"></div>
    </div>
  </div>
);
