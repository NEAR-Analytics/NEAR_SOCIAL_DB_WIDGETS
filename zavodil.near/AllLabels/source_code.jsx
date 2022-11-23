// AllLabels
const ownerId = "zavodil.near";
const appName = "nametag";

let tag = props.tag ?? "*";
const data = Social.keys(`*/${appName}/*/tags/${tag}`, "final");

if (!data) {
  return "Loading";
}

const contracts = {};

Object.values(data).forEach((account) => {
  Object.keys(account[appName]).forEach((contract) => {
    contracts[contract] = true;
  });
});

const allWidgets = Object.keys(contracts).map((accountId) => {
  return (
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate">
          <Widget src={`${ownerId}/widget/ProfileLine`} props={{ accountId }} />
        </div>
        <Widget src={`${ownerId}/widget/PublicTags`} props={{ accountId }} />
      </div>
    </div>
  );
});

return (
  <>
    <Widget
      src={`${ownerId}/widget/PublicTagEditor`}
      key={`public-tag-editor-${props.accountId}`}
      props={{ contractId: props.accountId }}
    />
    <hr />
    {allWidgets}
    <hr />
    {tag !== "*" && (
      <Widget src={`${ownerId}/widget/LabelDetails`} props={{ tag: tag }} />
    )}
  </>
);
