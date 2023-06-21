// pull sf follower account
const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

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

let sfSubscribers = Social.keys(`*/graph/follow/sfdao.near`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
let sfFollowers = 0;
if (sfSubscribers) {
  sfFollowers = Object.keys(sfSubscribers).length;
}
const currentBuilderCount = Object.keys(
  following["banyanq2"].graph.follow || {}
).length;

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
    <p> New BOS Component: {componentTarget}</p>
    <p>
      {" "}
      BOS Follower Target {followerTarget}. Progress:{" "}
      {(nycFollowers + sfFollowers) / followerTarget}
    </p>
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
