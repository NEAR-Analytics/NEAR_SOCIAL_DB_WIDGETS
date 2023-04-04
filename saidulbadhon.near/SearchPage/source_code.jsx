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
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      width: "100%",
    }}
  >
    {/*
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <h1 style={{ color: props.theme.textColor, fontWeight: 700 }}>
        BOS Widgets
      </h1>
    </div>
      */}
    <p
      style={{
        color: props.theme.textColor2,
        fontWeight: 400,
        padding: 0,
        margin: 0,
      }}
    >
      Discover the latest widgets from the NEAR community.
    </p>

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
        display: "flex",
        flexDirection: "column",
        gap: 8,
        // gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
