const ipfsImages = {};

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

const Wrapper = styled.div`
  --section-gap: 162px;
  --large-gap: 82px;
  --medium-gap: 48px;
  margin: calc(var(--body-top-padding) * -1) calc(var(--bs-gutter-x) * -.5) 0;

  @media (max-width: 900px) {
    --section-gap: 60px;
    --large-gap: 24px;
    --medium-gap: 16px;
  }
`;

const H1 = styled.h1`
  font: var(--text-hero);
  text-align: center;
  letter-spacing: -0.015em;
  color: var(--sand12);
  margin: 0;
  max-width: 960px;

  @media (max-width: 900px) {
    font: var(--text-2xl);
  }
`;

const Text = styled.p`
  font: var(--${(p) => p.size ?? "text-base"});
  font-weight: ${(p) => p.fontWeight};
  color: var(--${(p) => p.color ?? "sand10"});
  margin: 0;

  [href] {
    color: var(--violet8);
    &:hover {
      color: var(--violet11);
      text-decoration: none;
    }
    &:focus {
      text-decoration: underline;
      outline: none;
    }
  }

  ${(p) =>
    p.flex &&
    `
    display: flex;
    align-items: center;
    gap: 16px;
  `}
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

const Section = styled.div`
  display: flex;
  padding: calc(var(--section-gap) / 2) 24px;
  gap: ${(p) => p.gap ?? "var(--medium-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  background: ${(p) => p.background};
`;

const Icon = styled.div`
  display: inline-flex;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  color: 1px solid ${(p) => `var(--${p.color})` ?? "var(--sand10)"};
  background: ${(p) => `var(--${p.backgroundColor})` ?? "var(--sand3)"};
  border: 1px solid ${(p) => `var(--${p.borderColor})` ?? "var(--sand5)"};

  i {
    font-size: 28px;
    line-height: 28px;
  }
`;

const ContentWithImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--large-gap);

  &:nth-child(odd) {
    flex-direction: ${(p) => (p.alternate ? "row-reverse" : undefined)};
  }

  @media (max-width: 900px) {
    flex-direction: column !important;
  }
`;

const ContentWithImage_Image = styled.div`
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--sand5);
  width: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--medium-gap);
  width: 100%;
`;

const ContentBlock_Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid var(--sand4);
  align-items: ${(p) => (p.center ? "center" : "flex-star")};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  background: var(--sand1);
`;

const CircleImg = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

return (
  <Wrapper>
    <Section center>
      <H1>Your first steps to becoming a Web3 citizen</H1>
    </Section>

    <Section
      gap="24px"
      background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))"
    >
      <Flex gap="24px" mobileStack>
        <Card center>
          <i
            className="ph-duotone ph-user-circle-plus"
            style={{ color: "var(--violet8)", fontSize: "32px" }}
          />
          <Text size="text-xl" fontWeight="600" color="sand12">
            Set up your account
          </Text>
          <Text>
            The account is your web3 identity and keeps all your assets
          </Text>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#set-up-account",
              iconRight: "ph-bold ph-arrow-down",
              label: "Start Setup",
              variant: "primary",
              fill: "outline",
              size: "large",
            }}
          />
        </Card>

        <Card center>
          <i
            className="ph-duotone ph-squares-four"
            style={{ color: "var(--violet8)", fontSize: "32px" }}
          />
          <Text size="text-xl" fontWeight="600" color="sand12">
            Explore dApps
          </Text>
          <Text>
            dApps are decentralized applications that use the blockchain
          </Text>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#explore-dapps",
              iconRight: "ph-bold ph-arrow-down",
              label: "Explore Now",
              variant: "primary",
              fill: "outline",
              size: "large",
            }}
          />
        </Card>
      </Flex>

      <Card center>
        <i
          className="ph-duotone ph-globe-hemisphere-west"
          style={{ color: "var(--violet8)", fontSize: "32px" }}
        />
        <Text size="text-xl" fontWeight="600" color="sand12">
          Understand why it matters
        </Text>
        <Text>Become a web3 citizen and help build a better world</Text>
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "#why-it-matters",
            iconRight: "ph-bold ph-arrow-down",
            label: "Explore Now",
            variant: "primary",
            fill: "outline",
            size: "large",
          }}
        />
      </Card>
    </Section>

    <Section id="set-up-account" center>
      <Flex direction="column" gap="16px">
        <Text as="h2" size="text-3xl" color="sand12">
          Set up your account
        </Text>
        <Text size="text-l">
          You need a wallet to use the web3. Choose a wallet that fits your
          needs.
        </Text>
      </Flex>

      <Flex gap="24px" mobileStack>
        <Card center>
          <i
            className="ph-duotone ph-wallet"
            style={{ color: "var(--sand10)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            1. Choose a wallet
          </Text>
          <Text>You need a wallet to create an account and use dApps</Text>
        </Card>

        <Card center>
          <i
            className="ph-duotone ph-user-circle-plus"
            style={{ color: "var(--sand10)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            2. Create your account
          </Text>
          <Text>
            Use your wallet to create the account, and create a backup to keep
            it safe
          </Text>
        </Card>

        <Card center>
          <i
            className="ph-duotone ph-coins"
            style={{ color: "var(--sand10)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            3. Fund your account
          </Text>
          <Text>
            You need some $NEAR tokens in your account for most dApps to work
          </Text>
        </Card>
      </Flex>

      <Widget
        src="adminalpha.near/widget/DIG.Button"
        props={{
          href: "#todo",
          iconRight: "ph-bold ph-arrow-up-right",
          label: "Set up your account",
          variant: "affirmative",
          size: "large",
        }}
      />
    </Section>

    <Section
      gap="24px"
      background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))"
      id="explore-dapps"
      center
    >
      <Flex direction="column" gap="16px">
        <Text as="h2" size="text-3xl" color="sand12">
          Explore dApps built on NEAR
        </Text>
        <Text size="text-l">
          All these new paradigms are enabled and ensured by the core properties
          of the blockchain.
        </Text>
      </Flex>

      <Card center style={{ maxWidth: "694px" }}>
        <a href="https://www.ref.finance/" target="_blank">
          <CircleImg src="https://awesomenear-spaces.fra1.digitaloceanspaces.com/production/projects/ref-finance/ref-finance.jpg" />
        </a>
        <Flex direction="column" gap="8px">
          <Text size="text-xl" fontWeight="600" color="sand12">
            Putting community first in DeFi
          </Text>
          <Text>
            <Text as="a" href="https://www.ref.finance/" target="_blank">
              Ref.Finance
            </Text>{" "}
            is a community-led, multi-purpose DeFi platform built on NEAR
            Protocol.
          </Text>
        </Flex>
      </Card>

      <Widget
        src="adminalpha.near/widget/DIG.Button"
        props={{
          href: "https://awesomenear.com/projects",
          target: "_blank",
          iconRight: "ph-bold ph-arrow-up-right",
          label: "More dApps on AwesomeNEAR",
          variant: "primary",
          size: "large",
        }}
      />
    </Section>
  </Wrapper>
);
