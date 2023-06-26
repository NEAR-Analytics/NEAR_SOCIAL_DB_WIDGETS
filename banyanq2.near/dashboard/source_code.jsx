const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;
// add nice header
const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
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
const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #6CE89F;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;
const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

return (
  <div>
    <Wrapper>
      <Container>
        <H1>
          Banyan Q2{" "}
          <span>
            {" "}
            Dashboard{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
        </H1>
        (Apr 1 - Jun 30)
      </Container>
    </Wrapper>
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
    <Widget
      src="near/widget/AccountProfileCard"
      props={{ accountId: "liberty.sputnik-dao.near" }}
    />
    <br />
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
        {componentList.components.map((component) => (
          <Widget
            src="banyanq2.near/widget/ComponentMetadata"
            props={{ src: component }}
          />
        ))}{" "}
        Made Possible by
      </Text>
      <Widget src="hack.near/widget/banyan.logo" />
    </Flex>
  </div>
);
// need to add profile tracker
