// AllLabels
const ownerId = "zavodil.near";
const appName = "nametag";

const data = Social.get(`*/${appName}/*/tags/*`, "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const contracts = [];

accounts.map((account) => {
  Object.keys(account[1][appName]).map((contract) => {
    if (!contracts.includes(contract)) {
      contracts.push(contract);
    }
  });
});

const allWidgets = contracts.map((contractId) => {
  return (
    <div className="mb-2">
      <Widget
        src={`${ownerId}/widget/ContractPage`}
        props={{ contractId, shortMode: true }}
      />
    </div>
  );
});

return (
  <>
    <Widget src={`${ownerId}/widget/LabelEditor`} props={{}} />
    <hr />
    {allWidgets}
  </>
);
