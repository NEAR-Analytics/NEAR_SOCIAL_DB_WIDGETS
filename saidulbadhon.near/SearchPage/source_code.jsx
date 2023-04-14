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
    style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}
  >
    <Widget
      src="adminalpha.near/widget/ComponentSearch"
      props={{
        limit: 21,
        onChange: onSearchChange,
      }}
    />

    {items.length > 0 &&
      items?.map((component, index) => (
        <div key={index}>
          <Widget
            src="saidulbadhon.near/widget/SearchPage.ComponentItem"
            props={{
              src: `${component.accountId}/widget/${component.widgetName}`,
              blockHeight: component.blockHeight,
            }}
          />
        </div>
      ))}
  </div>
);
