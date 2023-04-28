const limitPerPage = 18;
let components = [];
let totalApps = 0;
let totalComponents = 0;
const componentsUrl = "#/near/widget/ComponentsPage";
const searchPlaceholder = "Search";

const refTags = [
  "Wallets",
  "Bridges",
  "Validators",
  "Expolorers",
  "Liquid staking",
  "Dex",
  "Lending",
  "Derivatives",
  "Insurance",
  "Stablecoins",
  "Yield Aggregators",
  "Launch Pad",
  "NFT marketplace",
  "Collectibles",
];

const { role } = props;

const addComponentIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.9534 7.40151H13.0906V4.71665C13.0906 3.75737 12.3243 2.89458 11.2685 2.89458H8.5855V2.03179C8.5855 1.07251 7.81919 0.209717 6.76343 0.209717C5.80415 0.209717 4.94136 0.976025 4.94136 2.03179V2.89458H2.25835C1.29907 2.89458 0.436279 3.66089 0.436279 4.71665V7.40151H1.29907C2.25835 7.40151 3.12114 8.16782 3.12114 9.22358C3.12114 10.1829 2.35483 11.0457 1.29907 11.0457H0.436279V13.7305C0.436279 14.6898 1.20259 15.5526 2.25835 15.5526H4.94321V14.6898C4.94321 13.7305 5.70952 12.8677 6.76528 12.8677C7.72456 12.8677 8.58735 13.634 8.58735 14.6898V15.5507H11.2722C12.2315 15.5507 13.0943 14.7844 13.0943 13.7287V11.0438H13.9571C14.9164 11.0438 15.7791 10.2775 15.7791 9.22173C15.7754 8.16782 14.9126 7.40151 13.9534 7.40151Z"
      fill="white"
    />
  </svg>
);

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

console.log(state.filters);

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

      //   if (state.selectedTab === "apps") {

      const tags = tagsData[accountId].widget[widgetName]?.metadata?.tags || [];

      const hasRefTag = tags.some((t) =>
        state.filters.map((f) => f.toLowerCase()).includes(t.toLowerCase())
      );

      if (!hasRefTag && state.filters.length > 0) return;

      //     const hasAppTag =
      //       tagsData[accountId].widget[widgetName]?.metadata?.tags["app"] === "";
      //     if (!hasAppTag) return;
      //     totalApps++;
      //   }

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
  height: 100%

`;

const FlexStart = styled.div`
    display:flex;
align-items:center;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  
`;

const FunctionArea = styled.div`
    display: flex;
    align-items:center;
    gap:12px;

`;

const FunctionWrapper = styled.div`

height: 36px;
display:flex;
align-items:center;
background: #2D4348;
border-radius: 10px;
padding: 8px 16px 8px 16px;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 19px;
gap:10px;
margin-left:12px;
cursor:pointer;


color: #FFFFFF;
`;

const sortIcon = (
  <svg
    width="12"
    height="10"
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="12" height="2" rx="1" fill="white" />
    <rect x="1" y="4" width="9" height="2" rx="1" fill="white" />
    <rect x="3" y="8" width="5" height="2" rx="1" fill="white" />
  </svg>
);

const gridView = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="6.2" height="6.2" rx="1.5" stroke="#7E8A93" />
    <rect
      x="0.5"
      y="9.30005"
      width="6.2"
      height="6.2"
      rx="1.5"
      stroke="#7E8A93"
    />
    <rect
      x="9.29999"
      y="0.5"
      width="6.2"
      height="6.2"
      rx="1.5"
      stroke="#7E8A93"
    />
    <rect
      x="9.29999"
      y="9.30005"
      width="6.2"
      height="6.2"
      rx="1.5"
      stroke="#7E8A93"
    />
  </svg>
);

const wideView = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="7" rx="2" fill="#00FFD1" />
    <rect y="9" width="16" height="7" rx="2" fill="#00FFD1" />
  </svg>
);

const CardView = styled.div`

width: 36px;
height: 36px;

background: #1A2E33;
border-radius: 10px;
display:flex;
align-items:center;
justify-content: center
`;

return (
  <Wrapper className="">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FlexStart>
        <Widget
          src="ref-admin.near/widget/ref-component-search"
          props={{
            limit: 21,
            onChange: onSearchChange,
            placeholder: searchPlaceholder,
            filterTags: state.filters.length === 0 ? null : state.filters,
          }}
        />

        {role === "Builder" && (
          <FunctionWrapper>
            {addComponentIcon}
            <span>Add Component</span>
          </FunctionWrapper>
        )}
      </FlexStart>

      <FunctionArea>
        <FunctionWrapper>
          {sortIcon}

          <span>Latest</span>
        </FunctionWrapper>

        <CardView>{gridView}</CardView>
        <CardView>{wideView}</CardView>
      </FunctionArea>
    </div>

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
                role: role,
              }}
            />
          ))}
        </Items>
      )}
    </ContentWrapper>
  </Wrapper>
);
