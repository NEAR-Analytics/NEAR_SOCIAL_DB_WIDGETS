const daoId = props.daoId ?? "bbclan.near";

return (
  <div>
    <h2 className="mb-3">apps</h2>
    <div className="mb-2">
      <Widget
        src="gordonjun.near/widget/ComponentSearch.dao.members.only"
        props={{
          boostedTag: "app",
          placeholder: "🔍  search for widgets",
          limit: 10,
          daoId: daoId,
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
      src="gordonjun.near/widget/WidgetIcons.dao.members.only"
      props={{ tag: "app", limit: 24, daoId: daoId }}
    />
  </div>
);
