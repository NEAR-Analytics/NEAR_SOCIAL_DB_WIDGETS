return (
  <div>
    <h5>Applications</h5>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          boostedTag: "eth",
          placeholder: "🔍 Search Applications",
          limit: 10,
          onChange: ({ result }) => {
            State.update({ apps: result });
          },
        }}
      />
    </div>
    {state.apps && (
      <div className="mb-2">
        {state.apps.map((app, i) => (
          <div key={i}>
            <Widget
              src="mob.near/widget/ComponentSearch.Item"
              props={{
                link: `#/${app.widgetSrc}`,
                accountId: app.accountId,
                widgetName: app.widgetName,
                onHide: () => State.update({ apps: null }),
                extraButtons: ({ widgetPath }) => (
                  <a
                    target="_blank"
                    className="btn btn-outline-secondary"
                    href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
                  >
                    Source
                  </a>
                ),
              }}
            />
          </div>
        ))}
      </div>
    )}

    <Widget
      src="mob.near/widget/WidgetIcons"
      props={{ tag: "eth", limit: 333 }}
    />
    <h3>#Ethereum</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "ethereum" }} />
    <h3>#ETHDenver2023</h3>
    <Widget
      src="mob.near/widget/WidgetIcons"
      props={{ tag: "ethdenver2023" }}
    />
  </div>
);
