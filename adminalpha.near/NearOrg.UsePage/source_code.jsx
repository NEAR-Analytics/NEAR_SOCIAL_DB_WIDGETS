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
  padding: calc(var(--section-gap) / 2) 0;

  @media (max-width: 900px) {
    --section-gap: 60px;
    --large-gap: 24px;
    --medium-gap: 16px;
    padding-top: 0;
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
  padding: calc(var(--section-gap) / 2) 16px;
  gap: ${(p) => p.gap ?? "var(--medium-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
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
  padding: 32px;
  border-radius: 8px;
  border: 1px solid var(--sand4);
  align-items: ${(p) => (p.center ? "center" : "flex-star")};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
`;

return (
  <Wrapper>
    <Section center>
      <H1>Your first steps to becoming a Web3 citizen</H1>
    </Section>

    <Section gap="24px">
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
              href: "/#/adminalpha.near/widget/PeoplePage",
              iconRight: "ph-bold ph-arrow-up-right",
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

    <Section id="why-it-matters">
      <Text>Hello</Text>
    </Section>
  </Wrapper>
);
