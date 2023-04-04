// Constants
const widgetProvider = "frichard5.near";
const refUrl = "https://api.stats.ref.finance/api/ft";

// Style
const theme = {
  main: "#FFD50D",
  secondaryPink: "#F29BC0",
  secondaryBlue: "#4498E0",
};

const DashboardContainer = styled.div`
    background: ${(props) => props.theme.secondaryBlue};
    padding: 24px;
`;

// Fetch
const ftList = fetch(refUrl);
State.init({
  selectedDao: "marketing.sputnik-dao.near",
});

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

// State function
const selectDao = ({ target: { value } }) => {
  State.update({ selectedDao: value });
};

return (
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
);
