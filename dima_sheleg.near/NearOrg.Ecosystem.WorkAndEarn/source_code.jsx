const Wrapper = styled.div`
  --section-gap: 162px;
  --large-gap: 82px;
  --medium-gap: 48px;
  margin: calc(var(--body-top-padding) * -1) calc(var(--bs-gutter-x) * -.5) 0;
  padding: calc(var(--section-gap) / 2) 0;
  position: relative;


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

  @media (max-width: 900px) {
    font: var(--text-2xl);
  }
`;

const Text = styled.p`
  font: var(--${(p) => p.size ?? "text-base"});
  font-weight: ${(p) => p.fontWeight};
  color: var(--${(p) => p.color ?? "sand10"});
  margin: 0;
  text-align: ${(p) => p.align};

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
  background: ${(p) => p.background};
`;
const Card = styled.div`
  display: flex;
  flex-direction: ${(p) => p.direction ?? "column"};
  gap: ${(p) => p.gap ?? "24px"};
  width: 100%;
  padding: ${(p) => p.padding ?? "32px"};
  border-radius: 8px;
  border: ${(p) => p.border ?? "1px solid var(--sand4)"};
  align-items: ${(p) => (p.center ? "center" : "flex-star")};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  background: ${(p) => p.background ?? "var(--sand1)"};
`;
const SocialIcon = styled.i`
  font-size: ${(p) => p.size ?? "30px"};
  text-align: ${(p) => p.align};
  color: ${(p) => p.color};
`;

return (
  <Wrapper>
    <Section>
      <Flex gap="16px" direction="column" alignItems="start">
        <H1>Work & Earn</H1>
        <Text size="text-xl" color="sand12">
          If Web3 and blockchain are the future then NEAR is the vehicle to take
          you there. Jump in!
        </Text>
      </Flex>
    </Section>

    <Section>
      <Text size="text-3xl" color="sand12">
        Explore opportunities
      </Text>

      <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        <div class="col">
          <Card background="transparent" border="none">
            <SocialIcon
              className="ph ph-list-magnifying-glass"
              color="var(--cyan7)"
            />
            <Text size="text-xl" color="sand12" fontWeight="600">
              Find a job
            </Text>
            <Text size="text-m" color="sand12">
              Entities across the NEAR Collective are actively looking for
              individuals to fill technical and non-technical roles. Click below
              to find a full-time job aimed at professionals and students or
              become an ambassador.
            </Text>
            <Flex gap="24px" alignItems="start" direction="column">
              <Widget
                src="adminalpha.near/widget/DIG.Button"
                props={{
                  href: "https://careers.near.org/jobs",
                  iconRight: "ph-bold ph-arrow-up-right",
                  label: "Full-time Jobs across the Ecosystem",
                  variant: "primary",
                  fill: "outline",
                  size: "small",
                  as: "a",
                  target: "_blank",
                }}
              />
              <Widget
                src="adminalpha.near/widget/DIG.Button"
                props={{
                  href: "https://www.near.university/#earn",
                  iconRight: "ph-bold ph-arrow-up-right",
                  label: "Become an ambassador or teacher",
                  variant: "primary",
                  fill: "outline",
                  size: "small",
                  as: "a",
                  target: "_blank",
                }}
              />
            </Flex>
          </Card>
        </div>
        <div class="col">
          <Card background="transparent" border="none">
            <SocialIcon className="ph ph-globe-stand" color="var(--green7)" />
            <Text size="text-xl" color="sand12" fontWeight="600">
              Get a grant for your project
            </Text>
            <Text size="text-m" color="sand12">
              Want to build on NEAR? Our foundation has grants to help you get
              started.
            </Text>
            <Flex gap="24px" alignItems="start" direction="column">
              <Widget
                src="adminalpha.near/widget/DIG.Button"
                props={{
                  href: "https://near.org/ecosystem/get-funding",
                  iconRight: "ph-bold ph-arrow-right",
                  label: "Learn more about Grants",
                  variant: "primary",
                  fill: "outline",
                  size: "small",
                }}
              />
            </Flex>
          </Card>
        </div>
        <div class="col">
          <Card background="transparent" border="none">
            <SocialIcon className="ph ph-chart-polar" color="var(--violet7)" />
            <Text size="text-xl" color="sand12" fontWeight="600">
              Complete a bounty
            </Text>
            <Text size="text-m" color="sand12">
              Want to help improve the NEAR ecosystem? Join our bounties
              program. Collaborate with others in the community to solve
              problems and earn rewards.
            </Text>
            <Flex gap="24px" alignItems="start" direction="column">
              <Widget
                src="adminalpha.near/widget/DIG.Button"
                props={{
                  href: "https://gitcoin.co/near/active",
                  iconRight: "ph-bold ph-arrow-right",
                  label: "View Bounties",
                  variant: "primary",
                  fill: "outline",
                  size: "small",
                }}
              />
            </Flex>
          </Card>
        </div>
      </div>
    </Section>
  </Wrapper>
);
