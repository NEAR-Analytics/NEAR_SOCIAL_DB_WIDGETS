const limitPerPage = 21;
let components = [];
let totalComponents = 0;
const componentsUrl = "/#/adminalpha.near/widget/ComponentsPage";

State.init({
  currentPage: 0,
  selectedTab: props.tab || "all",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const tagsData = Social.get("*/widget/*/metadata/tags/*", "final");

const data = Social.keys("*/widget/*", "final", {
  return_type: "BlockHeight",
});

if (data) {
  const result = [];

  Object.keys(data).forEach((accountId) => {
    return Object.keys(data[accountId].widget).forEach((widgetName) => {
      totalComponents++;

      if (state.selectedTab === "apps") {
        const hasAppTag =
          tagsData[accountId].widget[widgetName]?.metadata?.tags["app"] === "";
        if (!hasAppTag) return;
      }

      result.push({
        accountId,
        widgetName,
        blockHeight: data[accountId].widget[widgetName],
      });
    });
  });

  result.sort((a, b) => b.blockHeight - a.blockHeight);
  components = result.slice(0, state.currentPage * limitPerPage + limitPerPage);
}

function onSearchChange({ result, term }) {
  console.log(result, term);
  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}
const items = state.searchResults || components;

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 4,
      width: "100%",
    }}
  >
    <div
      style={{
        padding: "4px 8px",
        gap: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          color: props.theme.textColor2,
          fontWeight: 400,
          padding: 0,
          margin: 0,
          fontSize: 14,
        }}
      >
        Discover the latest widgets from the NEAR community.
      </p>

      <div style={{ width: "100%" }}>
        <Widget
          src="saidulbadhon.near/widget/SearchPage.Searchbar"
          props={{
            limit: 21,
            onChange: onSearchChange,
            theme: props.theme,
          }}
        />
      </div>
    </div>

    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
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
                onDetailsUrlClick: props?.onDetailsUrlClick,
              }}
            />
          </div>
        ))}
    </div>
  </div>
);
