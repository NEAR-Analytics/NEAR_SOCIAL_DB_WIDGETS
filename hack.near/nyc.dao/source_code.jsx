const ownerId = props.ownerId ?? "hack.near";
const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "liberty.sputnik-dao.near";
const role = props.role ?? "community";

let isBuilder = false;
let widgets = Social.get(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
let widgetCount = 0;
if (widgets) {
  widgetCount = Object.keys(widgets).length;
}
if (widgetCount > 0) {
  isBuilder = true;
}

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.name === "community")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const check = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === accountId).length > 0;
})?.[0];

State.init({
  isMember,
});

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
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1155px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 998px) {
    padding-top: 0;
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
    background: #96d2b7;
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
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          🗽 Liberty
          <span>
            DAO{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
        </H1>
        <div className="mt-3">
          <Text style={{ maxWidth: "670px" }}>
            Building a better future with fellow citizens of NYC and our global
            communities.
          </Text>
        </div>
      </Flex>
      {isBuilder ? (
        <div>
          <Text
            size="18px"
            weight="600"
            style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
          >
            Your Adventure Has Begun
          </Text>
          <div>
            <div className="m-2">
              <Widget
                src="near/widget/DIG.Button"
                props={{
                  href: "https://nearbuilders.com",
                  label: "Community Groups",
                  variant: "outline-success",
                  size: "large",
                }}
              />
            </div>
            {check ? (
              <div className="m-2">
                <Widget
                  src="near/widget/DIG.Button"
                  props={{
                    href: "https://wallet.near.org/linkdrop/v2.keypom.near/2BNMVyPgjXgHtn9xiQkcRLzZYmsh5JyGoeaRV9Tb5rmsbqNrAsuwGPziL6ztsfjxLVzQRwGERA3JGSQ28VEA8NtL",
                    label: "Get Started",
                    variant: "outline-secondary",
                    size: "large",
                  }}
                />
              </div>
            ) : (
              <div>
                <button className="btn btn-success" onClick={handleJoin}>
                  Join DAO
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Flex>
          <Text
            size="18px"
            weight="600"
            style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
          >
            Begin a New Adventure
          </Text>
          <div>
            <div className="m-2">
              <Widget
                src="near/widget/DIG.Button"
                props={{
                  href: "https://nearbuilders.com",
                  label: "Community Groups",
                  variant: "outline-success",
                  size: "large",
                }}
              />
            </div>
            {check ? (
              <div>
                <Widget
                  src="near/widget/DIG.Button"
                  props={{
                    href: "#/hack.near/widget/Academy",
                    label: "Get Started",
                    variant: "outline-secondary",
                    size: "large",
                  }}
                />
              </div>
            ) : (
              <div>
                <button className="btn btn-success" onClick={handleJoin}>
                  Join DAO
                </button>
              </div>
            )}
          </div>
        </Flex>
      )}
      <br />
    </Container>
    <hr />

    <Widget src="sking.near/widget/DAO.Page" props={{ daoId }} />
    <hr />
    <br />
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
        Made Possible by Collaboration
      </Text>
      <Widget src="hack.near/widget/dev.Badge" />
    </Flex>
  </Wrapper>
);
