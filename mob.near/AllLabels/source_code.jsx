// AllLabels
const ownerId = "zavodil.near";
const appName = "nametag";

const data = Social.keys(`*/${appName}/*`, "final");

if (!data) {
  return "Loading";
}

const contracts = {};

Object.values(data).forEach((account) => {
  Object.keys(account[appName]).forEach((contract) => {
    contracts[contract] = true;
  });
});

const allWidgets = Object.keys(contracts).map((contractId) => {
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
