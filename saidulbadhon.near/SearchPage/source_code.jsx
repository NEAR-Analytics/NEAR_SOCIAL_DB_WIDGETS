function onSearchChange({ result, term }) {
  console.log(result, term);
  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}
const items = state.searchResults || components;

console.log(items);
return (
  <div
    style={{
      padding: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      width: "100%",
    }}
  >
    <div style={{ maxWidth: 500, width: "100%" }}>
      <Widget
        src="adminalpha.near/widget/ComponentSearch"
        props={{
          limit: 21,
          onChange: onSearchChange,
        }}
      />
    </div>

    <div
      style={{
        width: "100%",
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(1fr, 300px))",
      }}
    >
      {items.length > 0 &&
        items?.map((component, index) => (
          <div key={index}>
            <Widget
              src="saidulbadhon.near/widget/SearchPage.ComponentItem"
              props={{
                src: `${component.accountId}/widget/${component.widgetName}`,
                blockHeight: component.blockHeight,
                theme: props.theme,
              }}
            />
          </div>
        ))}
    </div>
  </div>
);
