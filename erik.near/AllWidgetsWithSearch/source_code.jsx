return (
  <div>
    <h4>Widgets</h4>
    <p>
      This gives you a way to discover widgets by searching for them. Unlike the
      <a href="https://near.social/#/mob.near/widget/Applications">
        Applications search widget
      </a>
      , it doesn't filter by tag.
    </p>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          filterTag: "",
          placeholder: "🔍 Search Widgets",
          limit: 10,
          onChange: ({ result }) => State.update({ widgets: result }),
        }}
      />
    </div>
    {state.widgets && state.widgets.length > 0 && (
      <div className="mb-2">
        <div className="w-100 p-2 gap-2 d-flex flex-nowrap overflow-auto mb-3">
          {state.widgets.map((widget, i) => (
            <div key={i}>
              <Widget
                src="mob.near/widget/ApplicationCard"
                props={{
                  accountId: widget.accountId,
                  widgetName: widget.widgetName,
                }}
              />
            </div>
          ))}
        </div>
        <hr />
      </div>
    )}

    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "", limit: 21 }} />
  </div>
);
