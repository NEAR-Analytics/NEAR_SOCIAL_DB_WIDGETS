const ipfsImages = props.ipfsImages;
const fundingCards = props.fundingCards;
const fundingHugeCards = props.fundingHugeCards;

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

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

return (
  <Wrapper>
    <Section center>
      <Flex gap="16px" direction="column" alignItems="center">
        <H1>Get Funded. Build the Future.</H1>
        <Text size="text-xl" color="sand12" style={{ maxWidth: "662px" }}>
          The NEAR ecosystem offers multiple funding options to support
          initiatives aimed at decentralizing, growing, and innovating on NEAR.
        </Text>
      </Flex>
    </Section>

    <Section center>
      <Flex
        gap="16px"
        direction="column"
        alignItems="stretch"
        style={{ width: "100%" }}
      >
        <Text size="text-3xl" color="sand12">
          Funding sources
        </Text>
        <Text size="text-xl" color="sand12">
          We’ve helped hundreds of projects and teams realize their ideas, and
          bring them to market.
        </Text>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: returnIpfsImage(ipfsImages.arrows),
            className: "img-fluid d-none d-lg-block mx-auto",
            style: { maxWidth: "1000px" },
          }}
        />
        <div class="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-4">
          {fundingCards.map((item) => (
            <div class="col" key={item.key}>
              <Card center>
                <SocialIcon
                  className={item.iconClassName}
                  color={`var(--${item.iconColor})`}
                />
                <Text size="text-m" color="sand12">
                  {item.content}
                </Text>
              </Card>
            </div>
          ))}
        </div>
      </Flex>
    </Section>

    <Section gap="32px">
      {fundingHugeCards.map((card) => (
        <Card center key={card.key} id={card.id}>
          <SocialIcon
            className={card.iconClassName}
            color={`var(--${card.iconColor})`}
            size="32px"
          />
          <Text size="text-3xl" color="sand12">
            {card.title}
          </Text>
          <Text size="text-l" color="sand12">
            {card.content}
          </Text>
          <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4 justify-content-center">
            {card.cards.map((item) => (
              <div class="col" key={item.ipfsImage}>
                <Card background="transparent" border="none" direction="row">
                  <Widget
                    src="mob.near/widget/Image"
                    props={{
                      image: returnIpfsImage(item.ipfsImage),
                      className: "img-fluid",
                      style: {
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      },
                    }}
                  />
                  <Flex gap="16px" direction="column" alignItems="start">
                    <Text
                      size="text-l"
                      color="sand12"
                      fontWeight="600"
                      align="left"
                    >
                      {item.title}
                    </Text>
                    {item.content && (
                      <Text size="text-m" color="sand12" align="left">
                        {item.content}
                      </Text>
                    )}
                    {item.href ? (
                      <div>
                        <Widget
                          src="adminalpha.near/widget/DIG.Button"
                          props={{
                            href: item.href,
                            iconRight: "ph-bold ph-arrow-up-right",
                            label: "Learn more",
                            variant: "primary",
                            fill: "outline",
                            size: "small",
                            as: "a",
                            target: "_blank",
                          }}
                        />
                      </div>
                    ) : (
                      <Text
                        size="text-m"
                        color="sand12"
                        align="left"
                        fontWeight="600"
                      >
                        Comming Soon
                      </Text>
                    )}
                  </Flex>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </Section>

    <Section center>
      <Text size="text-3xl" color="sand12">
        What funding program is best for me?
      </Text>
      <Text size="text-xl" color="sand12" style={{ maxWidth: "662px" }}>
        There are several options to get financial support for your idea –
        whether it is a grant from an ecosystem fund, joining an accelerator, or
        getting venture support through our Ecosystem partners.
      </Text>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: returnIpfsImage(ipfsImages.longImage),
          className: "img-fluid",
          style: {
            maxWidth: "800px",
            height: "auto",
          },
        }}
      />
      <div>
        <Widget
          src="adminalpha.near/widget/DIG.Button"
          props={{
            href: `#ecosystem_grants`,
            label: "Explore programs",
            variant: "affirmative",
            size: "large",
          }}
        />
      </div>
    </Section>
  </Wrapper>
);
