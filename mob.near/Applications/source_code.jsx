return (
  <div>
    <h4>Applications</h4>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          filterTag: "app",
          placeholder: "🔍 Search Applications",
          limit: 10,
          onChange: ({ result }) => State.update({ apps: result }),
        }}
      />
    </div>
    {state.apps && state.apps.length > 0 && (
      <div className="mb-2">
        <div className="w-100 d-flex flex-nowrap overflow-auto mb-3">
          {state.apps.map((app, i) => (
            <div key={i}>
              <Widget
                src="mob.near/widget/ApplicationCard"
                props={{ accountId: app.accountId, widgetName: app.widgetName }}
              />
            </div>
          ))}
        </div>
        <hr />
      </div>
    )}

    <Widget
      src="mob.near/widget/WidgetIcons"
      props={{ tag: "app", limit: 21 }}
    />
  </div>
);
