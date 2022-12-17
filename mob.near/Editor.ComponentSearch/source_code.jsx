return (
  <div>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          limit: 10,
          onChange: ({ result }) => State.update({ components: result }),
        }}
      />
    </div>
    {state.components && state.components.length > 0 && (
      <div className="mb-2">
        {state.components.map((component, i) => (
          <div key={i}>
            <Widget
              src="mob.near/widget/Editor.ComponentSearch.Item"
              props={{
                accountId: component.accountId,
                widgetName: component.widgetName,
              }}
            />
          </div>
        ))}
      </div>
    )}
  </div>
);
