const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "liberty.sputnik-dao.near";

// Check if the user has an NFT
const nftData = Near.view("mint.sharddog.near", "nft_supply_for_owner", {
  account_id: accountId,
});

const isNftHolder = false;

if (nftData > 0) {
  isNftHolder = true;
}

// Get DAO followers
const followEdge = Social.keys(
  `${accountId}/graph/follow/${daoId}`,
  undefined,
  {
    values_only: true,
  }
);

if (followEdge === null) {
  return "Loading...";
}

const follow = followEdge && Object.keys(followEdge).length;
const isFollower = false;

// Check if the user is a follower
if (follow > 0) {
  isFollower = true;
}

// Get DAO policy data
const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.name === "community")
  .map((role) => role.kind.Group);

// Check if the user is a member of a group
const isMember = groups.some((group) => group.includes(accountId));

// Function call used for membership requests
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
  margin-bottom: 8px;
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
        <FlexContainer>
          {isNftHolder ? (
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/nycdao.near/widget/demo",
                label: "Demo Day Voting",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          ) : (
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/near/widget/ProfileEditor",
                label: "Update Your Profile",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          )}
        </FlexContainer>
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
        {accountId ? (
          <FlexContainer>
            <Widget
              src="nycdao.near/widget/nyc.join"
              props={{
                accountId,
              }}
            />
          </FlexContainer>
        ) : (
          <FlexContainer>
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://shard.dog/go?url=https://near.social",
                label: "Create Account",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          </FlexContainer>
        )}
      </Flex>
    )}
  </Container>
);
