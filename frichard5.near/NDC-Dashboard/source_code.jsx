const user = "frichard5.near";
const refUrl = "https://api.stats.ref.finance/api/ft";
const ftList = fetch(refUrl);
State.init({
  selectedDao: "marketing.sputnik-dao.near",
});

const Balances = (
  <Widget
    src={`${user}/widget/account_balance`}
    props={{ account: state.selectedDao }}
  />
);

const NearTransfers = (
  <Widget
    src={`${user}/widget/near_transfers`}
    props={{ account: state.selectedDao }}
  />
);

const FTransfers = (
  <Widget
    src={`${user}/widget/ft_transfers`}
    props={{ account: state.selectedDao, ftList: ftList.body && ftList.body }}
  />
);

const ContractMetrics = (
  <Widget
    src={`${user}/widget/contract_metrics`}
    props={{ account: state.selectedDao }}
  />
);

const selectDao = ({ target: { value } }) => {
  State.update({ selectedDao: value });
};

return (
  <>
    <h1>NDC Dashboard</h1>
    <select onChange={selectDao}>
      <option value="marketing.sputnik-dao.near">Marketing</option>
      <option value="creativesdao.sputnik-dao.near">Creative</option>
      <option value="neardevgov.sputnik-dao.near">Gov</option>
    </select>
    {Balances}
    {NearTransfers}
    {FTransfers}
    {ContractMetrics}
  </>
);
