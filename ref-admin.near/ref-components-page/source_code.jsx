const limitPerPage = 18;
let components = [];
let totalApps = 0;
let totalComponents = 0;
const componentsUrl = "#/near/widget/ComponentsPage";
const searchRequiredTag = state.selectedTab === "apps" ? "app" : null;
const searchPlaceholder = "Search";

State.init({
  currentPage: 0,
  selectedTab: props.tab || "all",
  filters: [],
  counts: {
    Chain: 0,
    Infrastructure: 0,
    Dapps: 0,
    NFT: 0,
  },
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const tagsData = Social.get("*/widget/*/metadata/tags/*", "final");

console.log(tagsData, "tagsdata");

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
        totalApps++;
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
  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}

const items = state.searchResults || components;

console.log(items);

const Wrapper = styled.div`
  gap: 48px;
  padding-bottom: 48px;
  padding-top: 48px;
  background: #101011;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: grid;
  width: 100%;
    grid-template-columns: repeat(auto-fill, 350px);

  gap: 20px;


`;

const Item = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  
`;

console.log(state.filters);

return (
  <Wrapper className="">
    <Widget
      src="ref-admin.near/widget/ref-component-search"
      props={{
        limit: 21,
        onChange: onSearchChange,
        placeholder: searchPlaceholder,
        filterTag: searchRequiredTag,
      }}
    />

    <ContentWrapper>
      <Widget
        src="ref-admin.near/widget/ref-component-left-bar"
        props={{
          filters: state.filters,
          counts: state.counts,
          updateFilters: (newFilters) => {
            State.update({
              filters: newFilters,
            });
          },
        }}
      />
      {state.searchResults?.length === 0 && (
        <Text>No components matched your search.</Text>
      )}

      {items.length > 0 && (
        <Items>
          {items.map((component, i) => (
            <Widget
              key={component.accountId + component.widgetName}
              src="ref-admin.near/widget/ref-component-card-wide"
              props={{
                src: `${component.accountId}/widget/${component.widgetName}`,
                blockHeight: component.blockHeight,
              }}
            />
          ))}
        </Items>
      )}
    </ContentWrapper>
  </Wrapper>
);
