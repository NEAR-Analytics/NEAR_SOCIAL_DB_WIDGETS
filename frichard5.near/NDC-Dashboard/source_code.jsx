// Constants
const widgetProvider = "frichard5.near";
const refUrl = "https://api.stats.ref.finance/api/ft";

// Initial state
State.init({
  selectedDao: "marketing.sputnik-dao.near",
  selectedTab: "treasury",
});

// Style
const avenirFontFamily = fetch(
  "https://fonts.cdnfonts.com/css/avenir-lt-std"
).body;
const theme = {
  main: "#FFD50D",
  secondaryPink: "#F29BC0",
  secondaryBlue: "#4498E0",
};

//    background: ${(props) => props.theme.secondaryBlue};

const DashboardContainer = styled.div`
  * {
    font-family: 'avenir lt std';    
  }
  h2 {
    font-weight: 750;
  }
  padding: 28px;
  background: #e2e8f0;
  background-size: contain;
  background-repeat: no-repeat;
  ${avenirFontFamily}
`;

const Test = styled.h1`
    font-family: Avenir Heavy;
`;

// Fetch
const ftList = fetch(refUrl);

// Components
const Banner = <Widget src={`${widgetProvider}/widget/NDC-Banner`} />;

const Balances = (
  <Widget
    src={`${widgetProvider}/widget/account_balance`}
    props={{ account: state.selectedDao }}
  />
);

const NearTransfers = (
  <Widget
    src={`${widgetProvider}/widget/near_transfers`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const FTransfers = (
  <Widget
    src={`${widgetProvider}/widget/ft_transfers`}
    props={{
      account: state.selectedDao,
      ftList: ftList.body && ftList.body,
      widgetProvider,
    }}
  />
);

const ContractMetrics = (
  <Widget
    src={`${widgetProvider}/widget/contract_metrics`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const Tabs = (
  <Widget
    src={`${widgetProvider}/widget/NDC-Tabs`}
    props={{
      tabs: [
        {
          value: "money",
          label: "Money",
        },
        {
          value: "metrics",
          label: "Metrics",
        },
        {
          value: "proposals",
          label: "Proposals",
        },
        {
          value: "members",
          label: "Members",
        },
      ],
      tabSelect: (selectedTab) => State.update({ selectedTab }),
      widgetProvider,
    }}
  />
);

// State function
const selectDao = ({ target: { value } }) => {
  State.update({ selectedDao: value });
};

return (
  <>
    <DashboardContainer theme={theme}>
      {Banner}
      <select onChange={selectDao}>
        <option value="marketing.sputnik-dao.near">Marketing</option>
        <option value="creativesdao.sputnik-dao.near">Creative</option>
        <option value="neardevgov.sputnik-dao.near">Gov</option>
      </select>
      {Balances}
      {NearTransfers}
      {FTransfers}
      {ContractMetrics}
    </DashboardContainer>
  </>
);
