const ipfsImages = {
  logos: {
    aurora: "bafkreidgbgeghpr257xhlaqkzdnsoigjgbdhf3exe5iw23h2bniipe7dwe",
    calimero: "bafkreifmztxlff3sxt2psgfm7vjo22xhyfiyjyp7sn3npcncfhck45f6ky",
    octopusNetwork:
      "bafkreiakazav5ddhr2fxdesqrv7vphraybp5u6lkdh6tcavgrkbpm5vtt4",
    pagoda: "bafkreieetpcono7u3n6j44bbrdvsxasmki7rtmvax53p4jf3einzdaudr4",
    proximity: "bafkreidk3cmyrxvi64mdp7i6ut5demlpxe6sbog42qnssume7ijqdfumze",
    sweatcoin: "bafkreidevsjnb5knn4h6cavxrkqvvirh7ukj574womlhgfkt4i4bxkpp4i",
  },
};

const web3Teams = [
  {
    url: "https://www.pagoda.co",
    name: "Pagoda",
    ipfsImage: ipfsImages.logos.pagoda,
  },
  {
    url: "https://aurora.dev",
    name: "Aurora",
    ipfsImage: ipfsImages.logos.aurora,
  },
  {
    url: "https://www.calimero.network",
    name: "Calimero",
    ipfsImage: ipfsImages.logos.calimero,
  },
  {
    url: "https://www.proximity.dev",
    name: "Proximity",
    ipfsImage: ipfsImages.logos.proximity,
  },
  {
    url: "https://sweatco.in",
    name: "Sweatcoin",
    ipfsImage: ipfsImages.logos.sweatcoin,
  },
  {
    url: "https://oct.network",
    name: "Octopus Network",
    ipfsImage: ipfsImages.logos.octopusNetwork,
  },
];

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

const Wrapper = styled.div`
    padding: 82px 0;
`;

const H1 = styled.h1`
    font-family: 'FK Grotesk', 'Mona Sans', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 80px;
    line-height: 1.1;
    text-align: center;
    letter-spacing: -0.015em;
    color: var(--sand12);
    margin: 0;
`;

const Text = styled.p`
    font: var(--${(p) => p.size ?? "text-base"});
    font-weight: ${(p) => p.fontWeight};
    color: var(--${(p) => p.color ?? "sand10"});
    margin: 0;
`;

const Flex = styled.div`
    display: flex;
    gap: ${(p) => p.gap};
    align-items: ${(p) => p.alignItems ?? "center"};
    justify-content: ${(p) => p.justifyContent ?? "center"};
    flex-direction: ${(p) => p.flexDirection ?? "row"};
    flex-wrap: ${(p) => p.wrap ?? "nowrap"};
`;

const Section = styled.div`
    display: flex;
    padding: 82px 0;
    gap: 48px;
    flex-direction: column;
    align-items: ${(p) => (p.center ? "center" : undefined)};
    justify-content: ${(p) => (p.center ? "center" : undefined)};
    text-align: ${(p) => (p.center ? "center" : undefined)};
`;

const LogoLink = styled.a`
    display: block;
    height: 28px;

    img {
        display: block;
        height: 100%;
    }
`;

return (
  <Wrapper>
    <Section center>
      <Flex gap="16px" flexDirection="column">
        <H1>Build the Open Web</H1>

        <Text size="text-l" style={{ maxWidth: "662px" }}>
          NEAR is the blockchain operating system – empowering developers to
          effortlessly compose, publish, and distribute new and innovative
          applications on the decentralized web.
        </Text>
      </Flex>

      <Flex gap="24px">
        <Widget
          src="adminalpha.near/widget/DS.Button"
          props={{
            href: "/",
            iconLeft: "ph-duotone ph-user-plus",
            label: "Create Account",
            variant: "secondary",
            size: "large",
          }}
        />
        <Widget
          src="adminalpha.near/widget/DS.Button"
          props={{
            href: "/",
            iconLeft: "ph-duotone ph-code-block",
            label: "Try It First",
            variant: "affirmative",
            size: "large",
          }}
        />
      </Flex>
    </Section>

    <Section center>
      <Text
        size="text-xs"
        fontWeight="600"
        style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
      >
        Trusted by Web3’s MOST innovative teams
      </Text>

      <Flex gap="68px" wrap="wrap">
        {web3Teams.map((team) => {
          return (
            <LogoLink href={team.url} target="_blank" title={team.name}>
              <Widget
                src="mob.near/widget/Image"
                props={{
                  image: returnIpfsImage(team.ipfsImage),
                  alt: team.name,
                }}
              />
            </LogoLink>
          );
        })}
      </Flex>
    </Section>
  </Wrapper>
);
