const accountId = context.accountId;
const daoId = props.daoId ?? "liberty.sputnik-dao.near";

State.init({
  nftHolder: false,
  isFollower,
  isMember,
});

const nftData = Near.view("mint.sharddog.near", "nft_supply_for_owner", {
  account_id: accountId,
});

if (nftData > 0) {
  State.update({ nftHolder: true });
}

// get DAO followers
let followers = Social.keys(`*/graph/follow/${daoId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (followers === null) {
  return "Loading followers...";
}

followers = Object.entries(followers || {});
followers.sort(
  (a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]
);

//check if user is a member of a group: [1]
const isFollower = followers.includes(accountId);

// get DAO policy data
const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.name === "community")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

//check if user is a member of a group: [1]
const isMember = groups.some((group) => group.includes(accountId));

// function call used for membership requests
const handleJoin = () => {
  const deposit = policy.proposal_bond;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "potential member",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
              role: "community",
            },
          },
        },
      },
      gas: 300000000000000,
      deposit: deposit,
    },
  ]);
};

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin-botton: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

return (
  <Container>
    {isFollower ? (
      <Flex>
        <Text
          size="18px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          Your Adventure Has Begun
        </Text>
        {nftHolder ? (
          <FlexContainer>
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/devs.near/widget/dev.social",
                label: "Demo Day Voting",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          </FlexContainer>
        ) : (
          <FlexContainer>
            <button className="btn btn-success" onClick={handleJoin}>
              Join Community
            </button>
          </FlexContainer>
        )}
      </Flex>
    ) : (
      <Flex>
        <Text
          size="18px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          Begin a New Adventure
        </Text>
        <FlexContainer>
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "#/hack.near/widget/Academy",
              label: "Learn Together",
              variant: "outline-secondary",
              size: "large",
            }}
          />
        </FlexContainer>
      </Flex>
    )}
  </Container>
);
