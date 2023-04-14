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

const allLabels = Object.keys(contracts).map((accountId) => {
  return (
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate">
          <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
        </div>
        <Widget src={`${ownerId}/widget/PublicTags`} props={{ accountId }} />
      </div>
    </div>
  );
});

let header = props.tag
  ? `All contracts with tag "${props.tag}":`
  : "All contracts with public tags:";

let allLabelsButton = props.tag ? (
  <a
    className="btn btn-outline-primary mt-2"
    href={`#/${ownerId}/widget/AllLabels`}
  >
    All Public Tags
  </a>
) : null;

return (
  <>
    <Widget
      src={`${ownerId}/widget/PublicTagEditor`}
      key={`public-tag-editor-${props.accountId}`}
      props={{ contractId: props.accountId }}
    />
    <hr />
    <h4>{header}</h4>
    {allLabels}
    {allLabelsButton}
  </>
);
