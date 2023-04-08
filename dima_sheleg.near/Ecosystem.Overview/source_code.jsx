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
const ColoredWrapper = styled.div`
    background-color: ${(p) => p.color ?? "var(--white)"}
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
const Small = styled.span`
  font: inherit;
  color: inherit;
  margin: 0;
  font-size: ${(p) => p.size}
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
  padding: 32px;
  border-radius: 8px;
  border: 1px solid var(--sand4);
  align-items: ${(p) => (p.center ? "center" : "flex-star")};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  background: var(--sand1);
`;
const NumericLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 21px 14px 21px;
    border-radius: 10px;
    background-color: ${(p) => p.backgroundColor ?? "var(--white)"};
`;
const StickyNav = styled.div`
  position: sticky;
  top: 10px;
`;

const navLinks = [
  {
    name: "Projects & DAOs",
    href: "anker_projects_daos",
  },
  {
    name: "Community",
    href: "anker_community",
  },
  {
    name: "Venture support",
    href: "anker_venture_support",
  },
  {
    name: "Tech base",
    href: "anker_tech_base",
  },
  {
    name: "Regional hubs",
    href: "anker_regional_hubs",
  },
  {
    name: "Web3 career",
    href: "anker_web3_career",
  },
  {
    name: "Web3 career",
    href: "anker_web3_career",
  },
];

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

const ipfsImages = {
  headerImage: "bafkreifzci2sberaa2xixrvmziefyankzeydqesv662e6egpea6gd3tedu",
  projectDAOs: "bafkreibj5poz4hg4acprnn4mo4ohn6hpku256gs2mvewo2nthzy65fvwiu",
  homepageApps: "bafkreihmam4sppi5p3jpzynzh5gjx6zgr2gbp5kmutbwywjj5le4tvohvu",
  nearWeek: "bafkreidcxi2e77yqguht7csjxsn42uk7f7rlxqvryrxog5m2y7acffgnli",
  humanGuild: "bafkreia2q267cf7apo6r3o3uw35lpbrp43jb3c5udfgquee2clbkdbks4e",
  tenkDao: "bafkreiajzdfp6vwyfn27dfvplczqrp24ncuppt7qlvgpvvraks6vx234wu",
  unchainLogo: "bafkreiath5t7igknmarvotq7u6ly7gd6yfqygbuhueo6q4vwjdgc7vg32m",
  ecosystemCommunity:
    "bafkreih4l27eegfkvkr4t4hqvnwq2bsxw4rx6o74sty62mhyao2o6waiia",
};

return (
  <Wrapper>
    <Section center>
      <Flex gap="16px" direction="column" alignItems="center">
        <H1>Building the Open Web together</H1>
        <Text size="text-xl" color="sand12" style={{ maxWidth: "662px" }}>
          Projects building on NEAR are at the center. The Ecosystem is
          supporting them with everything they need to succeed.
        </Text>
      </Flex>
      <StickyNav>
        <Flex gap="16px" alignItems="center">
          {navLinks.map((nav) => (
            <Text key={nav.href} as="a" href={`#${nav.href}`}>
              {nav.name}
            </Text>
          ))}
        </Flex>
      </StickyNav>
    </Section>
    <Section center>
      <Flex gap="var(--large-gap)" wrap="wrap" justifyContent="center">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: returnIpfsImage(ipfsImages.headerImage),
            className: "img-fluid",
          }}
        />
      </Flex>
    </Section>
    <Section background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))">
      <Flex gap="32px">
        <div class="col-12 col-md-6">
          <Flex gap="16px" direction="column">
            <Text size="text-3xl" color="sand12">
              Hundreds of Projects and DAOs
            </Text>
            <Text size="text-xl" color="sand12">
              Projects and DAOs bring value to users, and change to the world.
            </Text>
            <Flex gap="32px">
              <NumericLabel>
                <Text size="text-3xl" color="cyan8" fontWeight="600">
                  750
                </Text>
                <Text size="text-l" color="sand12">
                  Active projects
                </Text>
              </NumericLabel>
              <NumericLabel>
                <Text size="text-3xl" color="cyan8" fontWeight="600">
                  125
                </Text>
                <Text size="text-l" color="sand12">
                  DAOs
                </Text>
              </NumericLabel>
            </Flex>
          </Flex>
        </div>
        <div class="col-12 col-md-6">
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: returnIpfsImage(ipfsImages.projectDAOs),
              className: "img-fluid",
            }}
          />
        </div>
      </Flex>

      <Section center id="anker_projects_daos">
        <Text size="text-3xl" color="sand12">
          Projects: Building the future on NEAR
        </Text>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: returnIpfsImage(ipfsImages.homepageApps),
            className: "img-fluid px-5",
          }}
        />
        <Text size="text-3xl" color="sand12">
          Explore hundreds of dApps already built on NEAR
        </Text>
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "https://awesomenear.com/",
            iconRight: "ph-bold ph-arrow-up-right",
            label: "Visit AwesomeNEAR",
            variant: "affirmative",
            size: "large",
            as: "a",
            target: "_blank",
          }}
        />
      </Section>

      <Section center>
        <Text size="text-3xl" color="sand12">
          DAOs: A new way to organize, fund, and empower communities
        </Text>
        <Text size="text-xl" color="sand12">
          DAOs offer a new way for communities to collaborate. Members own the
          organization and receive rewards in proportion to their contributions.
          There are no bosses and no hierarchy. Instead, a common purpose unites
          the participants. One way to think of a DAO is a Facebook group with
          its own bank account.
        </Text>
      </Section>

      <Section center>
        <Text size="text-3xl" color="sand12">
          Explore DAOs, participate or get funding
        </Text>
        <Flex gap="24px" mobileStack="24px">
          <Card center>
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: returnIpfsImage(ipfsImages.nearWeek),
                className: "img-fluid",
              }}
            />
            <Flex direction="column" gap="8px">
              <Text size="text-xl" fontWeight="600" color="sand12">
                NEARWEEK
              </Text>
              <Text>
                NEARWEEK is a Web3 news & community platform. Community members
                earn rewards by submitting news items to the NEARWEEK DAO.
              </Text>
            </Flex>
            <Widget
              src="adminalpha.near/widget/DIG.Button"
              props={{
                href: "https://nearweek.com/",
                iconRight: "ph-bold ph-arrow-up-right",
                label: "Learn more",
                variant: "primary",
                fill: "outline",
                size: "large",
                as: "a",
                target: "_blank",
              }}
            />
          </Card>

          <Card center>
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: returnIpfsImage(ipfsImages.humanGuild),
                className: "img-fluid",
              }}
            />
            <Flex direction="column" gap="8px">
              <Text size="text-xl" fontWeight="600" color="sand12">
                Human Guild
              </Text>
              <Text>
                Human Guild awards grants to promising gaming projects building
                on NEAR and supports them in an advisory role along with other
                services.
              </Text>
            </Flex>
            <Widget
              src="adminalpha.near/widget/DIG.Button"
              props={{
                href: "https://humanguild.io/",
                iconRight: "ph-bold ph-arrow-up-right",
                label: "Learn more",
                variant: "primary",
                fill: "outline",
                size: "large",
                as: "a",
                target: "_blank",
              }}
            />
          </Card>

          <Card center>
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: returnIpfsImage(ipfsImages.tenkDao),
                className: "img-fluid",
              }}
            />
            <Flex direction="column" gap="8px">
              <Text size="text-xl" fontWeight="600" color="sand12">
                TenK DAO
              </Text>
              <Text>
                TenK DAO offers professional services to help artists build
                generative art projects. The DAO is compensated with a
                percentage of sales and royalties.
              </Text>
            </Flex>
            <Widget
              src="adminalpha.near/widget/DIG.Button"
              props={{
                href: "https://tenk.dev/",
                iconRight: "ph-bold ph-arrow-up-right",
                label: "Learn more",
                variant: "primary",
                fill: "outline",
                size: "large",
                as: "a",
                target: "_blank",
              }}
            />
          </Card>
        </Flex>
        <Flex gap="32px" mobileStack="32px">
          <Card center direction="row">
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: returnIpfsImage(ipfsImages.unchainLogo),
                className: "img-fluid me-4",
              }}
            />
            <Flex
              direction="column"
              gap="16px"
              alignItems="start"
              justifyContent="start"
            >
              <Text size="text-xl" fontWeight="600" color="sand12" align="left">
                How crypto became a major source of relief for embattled Ukraine
              </Text>
              <Text align="left">
                Created on AstroDAO, a DAO-launching platform built on NEAR,
                Unchain Fund raises funds for humanitarian efforts in in
                Ukraine, including evacuation, shelter, food, and more. In under
                a month, Unchain has collected over $7 million USD and counting
                across a range of cryptocurrencies including, BSC, ETH, Harmony,
                NEAR, and Polygon.
              </Text>
              <Widget
                src="adminalpha.near/widget/DIG.Button"
                props={{
                  href: "https://unchain.fund/",
                  iconRight: "ph-bold ph-arrow-up-right",
                  label: "Learn more",
                  variant: "primary",
                  fill: "outline",
                  size: "large",
                  as: "a",
                  target: "_blank",
                }}
              />
            </Flex>
          </Card>
        </Flex>
        <Flex gap="32px">
          <Widget
            src="adminalpha.near/widget/DIG.Button"
            props={{
              href: "https://astrodao.com/",
              iconRight: "ph-bold ph-arrow-up-right",
              label: "Browse DAOs on AstroDAO",
              variant: "affirmative",
              size: "large",
              as: "a",
              target: "_blank",
            }}
          />
        </Flex>
      </Section>
      <Section gap="24px">
        <Card>
          <Text size="text-xl" fontWeight="600" color="sand12" align="left">
            Looking for funding to start a project or DAO?
          </Text>
          <Text align="left">
            The NEAR ecosystem has plenty of options available to fund promising
            projects or initiatives that bring the ecosystem forward.
          </Text>
          <div>
            <Widget
              src="adminalpha.near/widget/DIG.Button"
              props={{
                href: "https://near.org/ecosystem/get-funding/",
                iconRight: "ph-bold ph-arrow-right",
                label: "Explore funding options",
                variant: "affirmative",
                size: "large",
              }}
            />
          </div>
        </Card>

        <Card>
          <Text size="text-xl" fontWeight="600" color="sand12" align="left">
            Thinking about starting a DAO?
          </Text>
          <Text align="left">
            Whether you want to organize your annual tailgate party so you can
            enjoy it more or manage the budget of your first film, you can set
            up a DAO that supports your needs. Platforms like SputnikDAO and
            AstroDAO are ways for organizations around the world to represent
            membership, facilitate governance, make decisions, and interact with
            other DAOs. Create your own DAO today!
          </Text>
          <div>
            <Widget
              src="adminalpha.near/widget/DIG.Button"
              props={{
                href: "https://near.org/ecosystem/get-funding/",
                iconRight: "ph-bold ph-arrow-up-right",
                label: "Create a new DAO",
                variant: "affirmative",
                size: "large",
                as: "a",
                target: "_blank",
              }}
            />
          </div>
        </Card>
      </Section>
    </Section>

    <Section>
      <Flex gap="32px">
        <div class="col-12 col-md-6">
          <Flex gap="16px" direction="column">
            <Text size="text-3xl" color="sand12">
              A vibrant, welcoming community
            </Text>
            <Text size="text-xl" color="sand12">
              NEAR’s vibrant community is a globally distributed home for
              developers, token holders, validators, and members supporting the
              protocol’s platform, ecosystem, and applications.
            </Text>
            <Flex gap="32px">
              <NumericLabel backgroundColor="var(--sand3)">
                <Text size="text-3xl" color="cyan8" fontWeight="600">
                  550<Small size="20px">k</Small>
                </Text>
                <Text size="text-l" color="sand12">
                  Members
                </Text>
              </NumericLabel>
              <NumericLabel backgroundColor="var(--sand3)">
                <Text size="text-3xl" color="cyan8" fontWeight="600">
                  4<Small size="20px">k</Small>
                </Text>
                <Text size="text-l" color="sand12">
                  Developers
                </Text>
              </NumericLabel>
              <NumericLabel backgroundColor="var(--sand3)">
                <Text size="text-3xl" color="cyan8" fontWeight="600">
                  120
                </Text>
                <Text size="text-l" color="sand12">
                  Guilds
                </Text>
              </NumericLabel>
            </Flex>
          </Flex>
        </div>
        <div class="col-12 col-md-6">
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: returnIpfsImage(ipfsImages.ecosystemCommunity),
              className: "img-fluid",
            }}
          />
        </div>
      </Flex>
      <div>
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: "#/community",
            iconRight: "ph-bold ph-arrow-right",
            label: "Explore all parts of the Community",
            variant: "affirmative",
            size: "large",
          }}
        />
      </div>
    </Section>
  </Wrapper>
);
