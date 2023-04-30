const limitPerPage = 18;
let components = [];
let totalApps = 0;
let totalComponents = 0;
const componentsUrl = "#/near/widget/ComponentsPage";
const searchPlaceholder = "Search";

const current_mode = Storage.get(
  "ref-mode",
  "ref-admin.near/widget/user-builder"
);

const { role } = props;

const addComponentIcon = (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.9979 4.76397C18.9979 4.74248 18.9893 4.72099 18.9871 4.6995C18.9828 4.62644 18.9742 4.55338 18.9549 4.48247C18.942 4.44164 18.9227 4.40511 18.9055 4.36643C18.8841 4.31701 18.8669 4.26759 18.839 4.22246C18.8132 4.18163 18.781 4.1451 18.751 4.10857C18.7209 4.07204 18.693 4.03336 18.6565 4.00113C18.6179 3.9646 18.5749 3.93667 18.532 3.90658C18.5062 3.88724 18.4826 3.86361 18.4547 3.84642C18.4418 3.83997 18.4268 3.83567 18.4139 3.82922C18.3967 3.82063 18.3838 3.80559 18.3645 3.79699L10.8697 0.255711C10.4232 0.0451256 9.92297 0 9.58161 0C9.07065 0 8.58545 0.100995 8.21619 0.281497L0.620506 3.98394C0.238361 4.17089 -0.0042377 4.54908 5.60765e-05 4.96166C5.60765e-05 4.97026 0.00434995 4.9767 0.00434995 4.98745C0.00434995 4.99604 5.60765e-05 5.00464 5.60765e-05 5.01323V14.077C5.60765e-05 14.7088 0.558247 15.4458 1.26887 15.7789L8.64986 18.8754C8.81517 18.9592 8.99551 19 9.178 19C9.3154 19 9.45065 18.9678 9.58161 18.9183C9.70184 18.9033 9.82206 18.8775 9.9337 18.8259L17.699 15.5554C18.4397 15.2073 19 14.4681 19 13.8385V4.77471V4.77041C18.9979 4.76827 18.9979 4.76612 18.9979 4.76397ZM9.7641 7.49729C9.62884 7.55101 9.25099 7.55745 9.12862 7.51663L3.66909 4.93802L9.24026 2.22404C9.26817 2.21115 9.39054 2.17677 9.58161 2.17677C9.74048 2.17677 9.84353 2.20041 9.87359 2.21115L15.3267 4.78761L9.7641 7.49729ZM16.7286 13.5828C16.72 13.5892 16.7114 13.5935 16.705 13.5978L10.5219 16.4515L10.3094 9.72993C10.3223 9.72133 10.3352 9.71273 10.3502 9.70629L16.7307 6.55825V13.5828H16.7286Z"
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

      const tags = Object.keys(
        tagsData[accountId].widget[widgetName]?.metadata?.tags || {}
      );

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
        tags: tags,
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
  padding-top: 18px;
  background: #101011;
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
  grid-template-columns: repeat(auto-fill, 415px);
  gap: 20px;
  height: 100%

`;

const Item = styled.div`
  :hover{
  transform: ${(p) => (p.role === "Builder" ? "" : "scale(1.05)")}

  }

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

const AddComponentWrapper = styled.a`

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

:hover{
    color: white;
    text-decoration:none;    
}
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
            placeholder: searchPlaceholder,
            filterTags: state.filters.length === 0 ? null : state.filters,
          }}
        />

        {role === "Builder" && (
          <AddComponentWrapper href={"#edit"}>
            {addComponentIcon}
            <span>Add Template</span>
          </AddComponentWrapper>
        )}
      </FlexStart>

      <FunctionArea>
        <FunctionWrapper>
          {sortIcon}

          <span>Latest</span>
        </FunctionWrapper>
      </FunctionArea>
    </div>

    <ContentWrapper>
      {state.searchResults?.length === 0 && (
        <Text>No components matched your search.</Text>
      )}

      <Items>
        <Item role={role}>
          <Widget
            key={"juaner.near" + "ref-home"}
            src="ref-admin.near/widget/ref-template-card"
            props={{
              src: `${"juaner.near"}/widget/${"ref-home"}`,
              blockHeight: component.blockHeight,
              banner: "null",
              role: role,
            }}
          />
        </Item>

        <Item role={role}>
          <Widget
            key={"ref-admin.near/widget/xBox"}
            src="ref-admin.near/widget/ref-template-card"
            props={{
              src: `ref-admin.near/widget/xBox`,
              blockHeight: component.blockHeight,
              banner: "null",

              role: role,
            }}
          />
        </Item>
      </Items>
    </ContentWrapper>
  </Wrapper>
);
