let totalComponents = 0;
const componentsData = Social.keys("*/widget/*", "final", {
  return_type: "BlockHeight",
});
if (componentsData) {
  Object.keys(componentsData).forEach((accountId) => {
    totalComponents += Object.keys(componentsData[accountId].widget).length;
  });
}

const ipfsImages = {
  logos: {
    pagoda: "bafkreicbpshopxasqhivaqugynulw6oan4lnypsphvwez3f5qidpa374ui",
    banyan: "Qmb1dfewMhs9VyBbwvQJFnn2BxQbRWnfHS7Cugqc96TTcD",
    proximity: "bafkreibi3xrwxlf5betvgmetaruwvpllc2ila4bg5ehfszoqow7f6edvom",
  },
};

const web3Teams = [
  {
    url: "https://www.proximity.dev",
    name: "Proximity",
    ipfsImage: ipfsImages.logos.proximity,
  },
  {
    url: "https://www.banyan.gg",
    name: "Banyan",
    ipfsImage: ipfsImages.logos.banyan,
  },
  {
    url: "https://www.pagoda.co",
    name: "Pagoda",
    ipfsImage: ipfsImages.logos.pagoda,
  },
];

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

const Wrapper = styled.div`
  --section-gap: 82px;
  padding-top: 100px;

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
  font-size: 80px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #00ec97;
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

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: ${(p) => p.columns};
  align-items: ${(p) => p.alignItems};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  position: relative;
  background-color: ${(p) => p.backgroundColor};
  padding: 208px 24px ${(p) => p.paddingBottom ?? "var(--section-gap)"};
  overflow: hidden;

  @media (max-width: 900px) {
    padding-top: var(--section-gap);
    padding-bottom: ${(p) => p.paddingBottomMobile ?? "var(--section-gap)"};
  }
`;

const SectionTitle = styled.div`
  position: relative;
  z-index: 15;
  display: inline-block;
  background: #fff;
  padding: 16px 42px;
  border-radius: 20px;
  align-self: ${(p) => (p.center ? "center" : undefined)};
  margin-left: ${(p) => (p.center ? "0px" : p.marginLeft)};

  @media (max-width: 1365px) {
    margin-left: ${(p) => (p.center ? "0px" : "-100px")};
  }

  @media (max-width: 1160px) {
    margin-left: 0;
  }

  @media (max-width: 900px) {
    margin-left: ${(p) => (p.center ? "0px" : "-42px")};
    margin-bottom: calc(var(--section-gap) * -0.5);

    h2 {
      font-size: 42px;
    }
  }
`;

const SectionContent = styled.div`
  position: relative;
  display: flex;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: flex-start;
  z-index: 15;
  max-width: 790px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 900px) {
    h3 {
      font-size: 30px;
    }
  }
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
  padding: var(--section-gap) 24px;
`;

const LogoLinks = styled.div`
  display: flex;
  gap: 72px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  a {
    display: block;
    height: 24px;
    color: var(--sand10);

    img {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    a {
      height: 20px;
    }
  }
`;

const IconAndContent = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  position: relative;

  svg {
    width: 48px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const Line = styled.div`
  --size: 10px;
  --radius: 80px;
  --color: #fff;
  --left: -45px;
  border: var(--size) solid var(--color);
  position: absolute;
  z-index: 10;
  pointer-events: none;

  ${(p) =>
    p.straightVertical &&
    `
    border: none;
    width: var(--size);
    background: var(--color);
  `}

  ${(p) =>
    p.straightHorizontal &&
    `
    border: none;
    height: var(--size);
    background: var(--color);
  `}

  @media (max-width: 1160px) {
    display: none !important;
  }
`;

const LineSpacer = styled.div`
  @media (max-width: 1160px) {
    display: none;
  }
`;

const LineRoundedCorners = (props) => {
  return (
    <svg
      width="50"
      height="20"
      viewBox="0 0 50 20"
      {...props}
      className="line-rounded-corners"
      style={{
        zIndex: 10,
        position: "absolute",
        pointerEvents: "none",
        ...props.style,
      }}
    >
      <path
        d="M 30.015 0 L 50 0 C 39.059 0 30.171 8.763 30.017 19.63 L 30.017 20.003 L 19.982 20.003 L 19.982 19.57 C 19.795 8.733 10.919 0.004 0 0.004 L 19.982 0.004 L 19.982 0.003 L 30.015 0.003 L 30.015 0 Z"
        fill="#fff"
      ></path>
    </svg>
  );
};

return (
  <Wrapper>
    <Container center>
      <Flex gap="32px" direction="column" alignItems="center">
        <H1>
          Blockchain for
          <span>
            JS{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#7269E1"
              />
            </svg>
          </span>
          Developers
        </H1>

        <Text style={{ maxWidth: "670px" }}>
          Learn to create anything on the blockchain operating system (bOS), and
          help build a more open web that is greater than the sum of its
          components.
        </Text>

        <Text size="23px" weight="600">
          Workshops + Hackathon
        </Text>

        <Text
          size="18px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          Summer 2023
        </Text>

        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "/#/hack.near/widget/CYOA",
            label: "Join the Community",
            variant: "negative",
            size: "large",
          }}
        />
      </Flex>

      <Text
        size="14px"
        weight="600"
        style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
      >
        Made Possible by NEAR Builders
      </Text>

      <LogoLinks>
        {web3Teams.map((team) => {
          return (
            <a href={team.url} target="_blank" title={team.name}>
              <Widget
                src="mob.near/widget/Image"
                props={{
                  image: returnIpfsImage(team.ipfsImage),
                  alt: team.name,
                }}
              />
            </a>
          );
        })}
      </LogoLinks>
    </Container>
  </Wrapper>
);
