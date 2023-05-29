const accountId = props.accountId ?? context.accountId;
const contractId = props.contractId ?? "ndcconstellationnft.sharddog.near";

const nftData = Near.view(contractId, "nft_supply_for_owner", {
  account_id: accountId,
});

const isOwner = nftData > 0;

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

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 93px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 500px;

  span {
    display: inline-block;
    background: #efa9ca;
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

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
      gap: var(--section-gap);
    }
  `}
`;

const Banner = styled.div`
  width: 100%
`;

const Content = styled.div`
  @media (max-width: 1200px) {
    > div:first-child {
      border-top: none;
    }
  }
`;

const GroupsWrapper = styled.div`
  border-top: 1px solid #eceef0;
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  padding: var(--section-gap) 23px;
`;

return (
  <Wrapper>
    <img
      src="https://ipfs.near.social/ipfs/bafybeihklk2hvvhse3ootfrljxuxnxqz4jdwlv3t2h22hotevcry2giwme"
      style={{ width: "100%" }}
    />
    <Container center>
      {!accountId && (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://shard.dog/ndcconstellation",
            label: "Create Account",
            variant: "outline-dark",
            size: "large",
          }}
        />
      )}
    </Container>

    <Container>
      {!isOwner ? (
        <Flex gap="23px" direction="column" alignItems="center">
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "https://shard.dog/ndcconstellation",
              label: "Get Your NFT",
              variant: "outline-primary",
              size: "large",
            }}
          />
        </Flex>
      ) : (
        <Content>
          <GroupsWrapper>
            <Widget src="devs.near/widget/community.Groups" />
          </GroupsWrapper>
        </Content>
      )}
    </Container>
    <Container>
      <Flex gap="23px" direction="column" alignItems="center">
        <Text
          size="14px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          Made Possible by{" "}
          <a href="https://near.org/blog/what-is-the-near-digital-collective">
            NDC
          </a>
          <Widget src="hack.near/widget/dev.Badge" />
        </Text>
      </Flex>
    </Container>
  </Wrapper>
);
