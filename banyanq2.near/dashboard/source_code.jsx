const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;
// add nice header

let accountId = props.accountId ?? "banyanq2.near";
let followerTarget = 100;
let builderTarget = 30;
let componentTarget = 30;
let nycSubscribers = Social.keys(`*/graph/follow/nycdao.near`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const accountWidgetCount = [];
let numberOfBuildersWhoDeployed = 0;

let accounts = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (accounts === null) {
  return "Loading...";
}

accounts = Object.entries(accounts[accountId].graph.follow || {});
accounts.sort((a, b) => b[1] - a[1]);

for (let i = 0; i < accounts.length; ++i) {
  let accountId = accounts[i][0];
  let widgets = Social.get(`${accountId}/widget/*`, "final", {
    return_type: "BlockHeight",
    values_only: true,
  });
  let widgetCount = 0;
  if (widgets) {
    widgetCount = Object.keys(widgets).length;
    numberOfBuildersWhoDeployed++;
  }
  accountWidgetCount.push({
    accountId: accountId,
    count: widgetCount,
  });
}

const accountWidgetSort = accountWidgetCount.sort((a, b) => b.count - a.count);
const numAccounts = accountWidgetSort.length;
accountWidgetSort = accountWidgetSort.slice(0, limit);
console.log(accountWidgetSort);
// add number of accounts with no widget
const totalWidgetCount = accountWidgetCount.reduce(
  (sum, account) => sum + account.count,
  0
);
let nycFollowers = 0;
if (nycSubscribers) {
  nycFollowers = Object.keys(nycSubscribers).length;
}
let numQualityComponents = 0;
// make a list asnd then check length of that
let sfSubscribers = Social.keys(`*/graph/follow/sfdao.near`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
let sfFollowers = 0;
if (sfSubscribers) {
  sfFollowers = Object.keys(sfSubscribers).length;
}
const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const currentBuilderCount = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;

const Flex = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;
let componentsURL =
  "https://raw.githubusercontent.com/NEARBuilders/BuildDAO/main/tracker/q2components.json";
function loadComponents() {
  const res = fetch(componentsURL);
  return res.body && JSON.parse(res.body);
}

const componentList = loadComponents();
if (!componentList) {
  return "⧗ Loading Components...";
}
numQualityComponents = componentList.components.length;
console.log(componentList);

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

return (
  <div>
    <h1>Banyan Q2 Dashboard (April 1 - June 30)</h1>
    <p> New BOS Builder Target: {builderTarget}</p>
    <div className="row p-2">
      <Widget
        src="hackerhouse.near/widget/ProgressBar"
        props={{
          infoTitle: "Q2 Builders Who Shipped 1+ Component",
          numerator: numberOfBuildersWhoDeployed,
          total: builderTarget,
        }}
      />
      <Widget
        src="hackerhouse.near/widget/ProgressBar"
        props={{
          infoTitle: "BOS Follower (NYC + SF) Target",
          numerator: nycFollowers + sfFollowers,
          total: followerTarget,
        }}
      />
      <Widget
        src="hackerhouse.near/widget/ProgressBar"
        props={{
          infoTitle: "# Builders Listed Who Need to Ship",
          numerator: currentBuilderCount - numberOfBuildersWhoDeployed,
          total: currentBuilderCount,
        }}
      />
      <a href={componentsURL} rel="noopener noreferrer" target="_blank">
        <Widget
          src="hackerhouse.near/widget/ProgressBar"
          props={{
            infoTitle: "New Quality BOS Components ",
            numerator: numQualityComponents,
            total: componentTarget,
          }}
        />
      </a>
    </div>
    <p> Current NYC Followers: {nycFollowers}</p>
    <p> Current SF Followers: {sfFollowers}</p>
    <h3 className="m-2">Q2 BOS Builders</h3>
    <div className="m-2">Total Widgets: {totalWidgetCount}</div>{" "}
    {accountWidgetCount.map((rank, index) => {
      let accountId = rank.accountId;
      return (
        <div className="d-flex m-2" key={accountId}>
          <div className="me-4" style={{ width: "45%" }}>
            <Widget
              src="chaotictempest.near/widget/AccountProfileCard"
              props={{ accountId }}
            />
          </div>
          <div className="d-flex flex-column" style={{ width: "30%" }}>
            <div>
              Rank:
              <span
                style={{
                  backgroundColor: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  color: "white",
                }}
              >
                {index + 1}
              </span>
            </div>
            <div>
              Widgets:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {rank.count}
              </span>
            </div>
          </div>
        </div>
      );
    })}
    <h2>City Node Accounts</h2>
    <Widget
      src="near/widget/AccountProfileCard"
      props={{ accountId: "nycdao.near" }}
    />
    <Widget
      src="near/widget/AccountProfileCard"
      props={{ accountId: "sfdao.near" }}
    />
    <br />
    // ADD COMPONENT MAPPING
    <Flex>
      <Text
        size="14px"
        weight="600"
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.17em",
          textAlign: "center",
        }}
      >
        Made Possible by
      </Text>
      <Widget src="hack.near/widget/banyan.logo" />
    </Flex>
  </div>
);
// need to add profile tracker
