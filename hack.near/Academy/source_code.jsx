const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const role = props.role ?? "community";

const policyName = "email";
const acceptanceKey = policyName;

State.init({
  email: "",
  hasRegistered: false,
  agreeIsChecked: false,
});

const agreementsForUser = Social.index("policyAccept", acceptanceKey, {
  accountId: context.accountId,
  subscribe: true,
});

const policyVersions = Social.keys(policyName, "final", {
  return_type: "BlockHeight",
});

const policyPath = policyName.split("/");
const latestPolicyVersion = policyPath.reduce((acc, curr) => {
  return acc[curr];
}, policyVersions);

const ipfsImages = {
  logos: {
    pagoda: "bafkreicbpshopxasqhivaqugynulw6oan4lnypsphvwez3f5qidpa374ui",
    banyan: "Qmb1dfewMhs9VyBbwvQJFnn2BxQbRWnfHS7Cugqc96TTcD",
    proximity: "bafkreibi3xrwxlf5betvgmetaruwvpllc2ila4bg5ehfszoqow7f6edvom",
  },
};

const web3Teams = [
  {
    url: "https://www.pagoda.co",
    name: "Pagoda",
    ipfsImage: ipfsImages.logos.pagoda,
  },
  {
    url: "https://www.banyan.gg",
    name: "Banyan",
    ipfsImage: ipfsImages.logos.banyan,
  },
];

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

const handleSignup = () => {
  if (state.email !== "") {
    asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Everything": "subscription",
      },
      body: JSON.stringify({
        query:
          "mutation CreateEmail($email: String) { emails { create(name: $email) { entities { id } } } }",
        variables: {
          email: state.email,
        },
      }),
    });
  }
};

const handleJoin = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
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
              role: role,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const Wrapper = styled.div`
  --section-gap: 69px;
  padding-top: 69px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #fbfcfd;
    border: 1px solid #d7dbdf;
    color: #11181c !important;

    &.button--primary {
      width: 100%;
      color: #006adc !important;

      @media (max-width: 1200px) {
        width: auto;
      }
    }

    &:hover,
    &:focus {
      background: #ecedee;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7e868c;
    }

    .bi-16 {
      font-size: 16px;
    }
  }

  @media (max-width: 900px) {
    gap: 24px;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
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
  gap: 29px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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

const InputContainer = styled.div`
  width: 320px;
`;

const CheckWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
color: ${state.agreeIsChecked ? "#26A65A" : "inherit"}
`;

const CheckButton = styled.button`
  border: none;
  --bs-btn-hover-bg: transparent;
  --bs-btn-active-bg: transparent;
  --bs-btn-color: ${state.agreeIsChecked ? "#26A65A" : "black"};
  --bs-btn-hover-color: ${state.agreeIsChecked ? "#26A65A" : "var(--bs-green)"};
`;

const showRegistration =
  !state.hasRegistered &&
  context.accountId &&
  latestPolicyVersion &&
  agreementsForUser &&
  (!agreementsForUser.length ||
    agreementsForUser[agreementsForUser.length - 1].value < latestTosVersion);

return (
  <Wrapper>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <Container>
      <Flex>
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
        <div>
          <InputContainer>
            <Widget
              src={"nearhorizon.near/widget/Inputs.Text"}
              props={{
                label: "",
                placeholder: "Your Email Address",
                value: state.email,
                onChange: (email) => State.update({ email }),
              }}
            />
          </InputContainer>
          <CheckWrapper>
            <CheckButton
              onClick={() => {
                State.update({ agreeIsChecked: !state.agreeIsChecked });
              }}
              className="btn btn-outline-dark"
            >
              <div className="d-flex flex-row align-items-center gap-3">
                <i
                  className={`bi bi-${
                    state.agreeIsChecked ? "check-square" : "square"
                  }`}
                  style={{ fontSize: "1.5rem" }}
                />
                <span style={{ textAlign: "left" }}>Agree</span>
              </div>
            </CheckButton>
            <CommitButton
              style={{
                flexGrow: 1,
                flexBasis: "10rem",
              }}
              disabled={!state.agreeIsChecked}
              data={{
                index: {
                  policyAccept: JSON.stringify({
                    key: acceptanceKey,
                    value: latestPolicyVersion,
                  }),
                },
              }}
              onCommit={() => {
                State.update({ hasRegistered: true });
              }}
            >
              Get Email Updates
            </CommitButton>
          </CheckWrapper>
        </div>
        <div className="row">
          <div className="col-lg">
            <Widget src="hack.near/widget/Build.Follow" props={{ daoId }} />
          </div>
          <div className="col-lg">
            <a className="btn btn-outline-primary" onClick={handleJoin}>
              Join
            </a>
          </div>
        </div>
      </Flex>
      <Flex>
        <Text
          size="14px"
          weight="600"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.17em",
            textAlign: "center",
          }}
        >
          Made Possible by NEAR Builders
        </Text>

        <LogoLinks alignItems="center">
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
      </Flex>
    </Container>
  </Wrapper>
);
