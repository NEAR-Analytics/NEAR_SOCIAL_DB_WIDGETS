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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Components for BOS.gg</h1>
      <p>Discover the latest components from the NEAR community.</p>
    </div>

    <div style={{ maxWidth: 500, width: "100%" }}>
      <Widget
        src="saidulbadhon.near/widget/SearchPage.Searchbar"
        props={{
          limit: 21,
          onChange: onSearchChange,
          theme: props.theme,
        }}
      />
    </div>

    <div
      style={{
        width: "100%",
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
