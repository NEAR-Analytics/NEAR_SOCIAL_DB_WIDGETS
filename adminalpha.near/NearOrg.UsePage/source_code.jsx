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
    --large-gap: 48px;
    --medium-gap: 24px;
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
    font-weight: 600;
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

const HR = styled.div`
  width: 100%;
  height: 1px;
  background: var(--sand5);
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
      gap: ${(p) =>
        p.mobileStack === true ? "var(--section-gap)" : p.mobileStack};
    }
  `}

  ${(p) =>
    p.tabletStack &&
    `
    @media (max-width: 1050px) {
      flex-direction: column;
      gap: ${(p) =>
        p.tabletStack === true ? "var(--section-gap)" : p.tabletStack};
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
  gap: ${(p) => p.gap ?? "24px"};
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

const UseCase = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  text-align: left;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

return (
  <Wrapper>
    <Section center>
      <H1>Your first steps to becoming a Web3 citizen</H1>
    </Section>

    <Section background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))">
      <Flex gap="24px" mobileStack="24px">
        <Card center>
          <i
            className="ph-duotone ph-user-circle-plus"
            style={{ color: "var(--violet8)", fontSize: "32px" }}
          />
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              Your Account
            </Text>
            <Text>
              The account is your web3 identity and keeps all your assets
            </Text>
          </Flex>
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
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              Explore dApps
            </Text>
            <Text>
              dApps are decentralized applications that use the blockchain
            </Text>
          </Flex>
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

        <Card center>
          <i
            className="ph-duotone ph-globe-hemisphere-west"
            style={{ color: "var(--violet8)", fontSize: "32px" }}
          />
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              Understand
            </Text>
            <Text>Become a web3 citizen and help build a better world</Text>
          </Flex>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#why-it-matters",
              iconRight: "ph-bold ph-arrow-down",
              label: "Learn More",
              variant: "primary",
              fill: "outline",
              size: "large",
            }}
          />
        </Card>
      </Flex>
    </Section>

    <Section id="set-up-account" center>
      <Flex direction="column" gap="16px">
        <Text as="h2" size="text-3xl" fontWeight="600" color="sand12">
          Set up your account
        </Text>
        <Text size="text-l">
          You need a wallet to use the web3. Choose a wallet that fits your
          needs.
        </Text>
      </Flex>

      <Flex gap="24px" mobileStack="24px">
        <Card center gap="12px">
          <i
            className="ph-duotone ph-wallet"
            style={{ color: "var(--sand10)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            1. Choose a wallet
          </Text>
          <Text>You need a wallet to create an account and use dApps</Text>
        </Card>

        <Card center gap="12px">
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

        <Card center gap="12px">
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
      background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))"
      id="explore-dapps"
      center
    >
      <Flex direction="column" gap="16px">
        <Text as="h2" size="text-3xl" color="sand12" fontWeight="600">
          Explore dApps built on NEAR
        </Text>
        <Text size="text-l">
          All these new paradigms are enabled and ensured by the core properties
          of the blockchain.
        </Text>
      </Flex>

      <HR />

      <UseCase>
        <Text size="text-l" color="red10">
          use case
          <br />
          <Text as="span" size="text-3xl" fontWeight="600" color="red10">
            DeFi
          </Text>
        </Text>

        <Text>
          <b>Decentralized Finance, of DeFi,</b> lies at the core of the Web3
          movement. This sector leverages how tokens are valued and exchanged
          without the barriers to access as with traditional finance. It
          illustrates the power of ownership by giving token holders complete
          control of their assets, and allowing them pseudo-anonymity in how
          they participate.
        </Text>
      </UseCase>

      <Card center>
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

      <Flex gap="16px" wrap="wrap" justifyContent="center">
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "#todo",
            iconRight: "ph-bold ph-arrow-up-right",
            label: "Learn about DeFi",
            variant: "primary",
            size: "large",
          }}
        />
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "https://awesomenear.com/categories/defi",
            target: "_blank",
            iconRight: "ph-bold ph-arrow-up-right",
            label: "Explore DeFi dApps",
            variant: "primary",
            fill: "outline",
            size: "large",
          }}
        />
      </Flex>

      <HR />

      <UseCase>
        <Text size="text-l" color="violet10">
          use case
          <br />
          <Text as="span" size="text-3xl" fontWeight="600" color="violet10">
            NFTs
          </Text>
        </Text>

        <Text>
          <b>Non-Fungible Tokens</b> are unique digital assets that are
          fundamental to the idea of ownership in Web3. The assets you own are
          recorded on the blockchain and are easily verifiable from anyone in
          the world at any time. More importantly, they are immutable–no
          authority can seize them. This powerful combination of transparency
          and permanence, make NFTs a remarkable tool for various use cases
          surrounding identity and ownership.
        </Text>
      </UseCase>

      <Flex gap="24px" mobileStack="24px">
        <Card center>
          <a href="https://www.seatlabnft.com/" target="_blank">
            <CircleImg src="https://awesomenear-spaces.fra1.digitaloceanspaces.com/production/projects/seatlab-nft/seatlab-nft.jpg" />
          </a>
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              New, Fairer Ticketing with NFTs
            </Text>
            <Text>
              <Text as="a" href="https://www.seatlabnft.com/" target="_blank">
                Seatlab
              </Text>{" "}
              is an NFT event ticketing marketplace helping artists foster
              closer connections with fans, eliminating fraud and reducing the
              impact of scalping.
            </Text>
          </Flex>
        </Card>

        <Card center>
          <a href="https://www.tamastream.io/" target="_blank">
            <CircleImg src="https://awesomenear-spaces.fra1.digitaloceanspaces.com/production/projects/seatlab-nft/seatlab-nft.jpg" />
          </a>
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              Artists, Creators and Fans First. No Gatekeeping. No Advertising.
            </Text>
            <Text>
              <Text as="a" href="https://www.tamastream.io/" target="_blank">
                Tamago
              </Text>{" "}
              offers a platform for decentralized audio streaming.
            </Text>
          </Flex>
        </Card>
      </Flex>

      <Flex gap="16px" wrap="wrap" justifyContent="center">
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "#todo",
            iconRight: "ph-bold ph-arrow-up-right",
            label: "Learn about NFTs",
            variant: "primary",
            size: "large",
          }}
        />
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "https://awesomenear.com/categories/nft",
            target: "_blank",
            iconRight: "ph-bold ph-arrow-up-right",
            label: "Explore NFT dApps",
            variant: "primary",
            fill: "outline",
            size: "large",
          }}
        />
      </Flex>

      <HR />

      <UseCase>
        <Text size="text-l" color="cyan10">
          use case
          <br />
          <Text as="span" size="text-3xl" fontWeight="600" color="cyan10">
            Social
          </Text>
        </Text>

        <Text>
          <b>Community thrives in Web3,</b> and the projects helping users
          freely interact and share information while maintaining ownership of
          their data give a glimpse of how connection will evolve in the open
          web.
        </Text>
      </UseCase>

      <Flex gap="24px" mobileStack="24px">
        <Card center>
          <a href="https://sweatco.in/" target="_blank">
            <CircleImg src="https://awesomenear-spaces.fra1.digitaloceanspaces.com/production/projects/sweat-economy/sweat-economy.jpg" />
          </a>
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              Healthier planet. Healthier, wealthier you
            </Text>
            <Text>
              <Text as="a" href="https://sweatco.in/" target="_blank">
                Sweatcoin
              </Text>{" "}
              is a free app which rewards your daily steps with a new-generation
              currency you can spend on cool products, donate to charity or
              convert into SWEAT.
            </Text>
          </Flex>
        </Card>

        <Card center>
          <a href="https://blogchain.app/home" target="_blank">
            <CircleImg src="https://awesomenear-spaces.fra1.digitaloceanspaces.com/production/projects/blogchain/blogchain.jpg" />
          </a>
          <Flex direction="column" gap="8px">
            <Text size="text-xl" fontWeight="600" color="sand12">
              Empowering writers both creatively and economically through
              decentralization
            </Text>
            <Text>
              <Text as="a" href="https://blogchain.app/home" target="_blank">
                Blogchain App
              </Text>{" "}
              is a publishing platform created for independent writers,
              providing them with a decentralized, censorship-resistant, and
              user-friendly space to engage and grow their audience.
            </Text>
          </Flex>
        </Card>
      </Flex>

      <Widget
        src="adminalpha.near/widget/DIG.Button"
        props={{
          href: "https://awesomenear.com/categories/social",
          target: "_blank",
          iconRight: "ph-bold ph-arrow-up-right",
          label: "Explore Social dApps",
          variant: "primary",
          fill: "outline",
          size: "large",
        }}
      />
    </Section>

    <Section
      id="why-it-matters"
      background="linear-gradient( 132.69deg, #02042f 39.58%, #dc5656 76.56%, #dca656 99.48% );"
      style={{
        padding: "var(--section-gap) var(--large-gap)",
      }}
      gap="var(--section-gap)"
    >
      <Flex direction="column" gap="12px" style={{ textAlign: "center" }}>
        <Text as="h2" size="text-3xl" fontWeight="600" color="white">
          Why it matters
        </Text>
        <Text size="text-l" color="white">
          Our world is in urgent need of change
        </Text>
      </Flex>

      <Flex
        gap="var(--large-gap)"
        tabletStack="var(--large-gap)"
        alignItems="center"
      >
        <Flex
          gap="12px"
          direction="column"
          alignItems="flex-start"
          style={{ width: "100%" }}
        >
          <Text size="text-l" fontWeight="600" color="white">
            Today, our world is in crisis
          </Text>
          <Text color="white">
            From climate change, to the increasing centralisation of power, the
            existential threat of a global collapse demands global action in
            every sector of society.
          </Text>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#todo",
              iconRight: "ph-bold ph-arrow-up-right",
              label: "Learn More",
              variant: "primary",
              fill: "outline",
              size: "small",
            }}
          />
        </Flex>

        <img
          src="https://near.org/wp-content/themes/near-21/assets/img/relaunch/use-world.png"
          style={{
            display: "block",
            width: "300px",
          }}
        />

        <Flex gap="12px" direction="column" style={{ width: "100%" }}>
          <Text size="text-l" fontWeight="600" color="white">
            We need a more inclusive, open and fair future
          </Text>
          <Text color="white">
            You can be part of this change. Become a Web3 citizen.
          </Text>
        </Flex>
      </Flex>
    </Section>

    <Section center>
      <Flex direction="column" gap="16px">
        <Text as="h2" size="text-3xl" fontWeight="600" color="sand12">
          How Web3 on NEAR empowers you
        </Text>
        <Text size="text-l">
          The basis for an inclusive, fair and open world
        </Text>
      </Flex>

      <Flex gap="24px" mobileStack="24px">
        <Card gap="12px" center>
          <i
            className="ph-duotone ph-user-circle"
            style={{ color: "var(--violet8)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            Regain ownership
          </Text>
          <Text>Your assets, your data, your identity</Text>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#regain-ownership",
              iconRight: "ph-bold ph-arrow-down",
              label: "Learn More",
              variant: "primary",
              fill: "outline",
            }}
          />
        </Card>

        <Card gap="12px" center>
          <i
            className="ph-duotone ph-graph"
            style={{ color: "var(--cyan10)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            Interact freely
          </Text>
          <Text>Free flow of values and information</Text>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#interact-freely",
              iconRight: "ph-bold ph-arrow-down",
              label: "Learn More",
              variant: "primary",
              fill: "outline",
            }}
          />
        </Card>

        <Card gap="12px" center>
          <i
            className="ph-duotone ph-circles-three-plus"
            style={{ color: "var(--red8)", fontSize: "32px" }}
          />
          <Text size="text-l" fontWeight="600" color="sand12">
            Participate in fair economies
          </Text>
          <Text>Value is distributed through transparent and fair rules</Text>
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "#fair-economies",
              iconRight: "ph-bold ph-arrow-down",
              label: "Learn More",
              variant: "primary",
              fill: "outline",
            }}
          />
        </Card>
      </Flex>
    </Section>
  </Wrapper>
);
