// pull sf follower account
const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

let accountId = "banyanq2.near";
let followerTarget = 100;
let builderTarget = 30;
let componentTarget = 30;
let nycSubscribers = Social.keys(`*/graph/follow/nycdao.near`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
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
          infoTitle:
            "Q2 Builders (doesn't exclude builders who haven't shipped",
          numerator: currentBuilderCount,
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
    <Widget
      src="devs.near/widget/dev.rank"
      props={{
        ownerId: "banyanq2.near",
      }}
    />
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
