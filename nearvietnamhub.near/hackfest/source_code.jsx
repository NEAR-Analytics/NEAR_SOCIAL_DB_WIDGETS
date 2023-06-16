const accountId = props.accountId ?? context.accountId;

State.init({
  email: "",
  hasRegistered: false,
  registerMsg: "",
});

const handleSignup = () => {
  if (state.email !== "") {
    console.log("handleSignup for email " + state.email);

    asyncFetch("https://nearvietnamhub.org/register-hackfest.php", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        wallet: accountId,
        email: state.email,
      }),
    })
      .then((res) => {
        console.log("response: ", res);
        if (res.body.status == "success") {
          State.update({ hasRegistered: true });
          State.update({ registerMsg: "🎉 Register succesfully! See you~ 🙌" });
        } else {
          State.update({ registerMsg: "😰 Something wrong, plz try again" });
        }
      })
      .catch((res) => {
        State.update({ registerMsg: "😰 Something wrong, plz try again" });
        console.log(res);
      });
  }
};

const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const LogoStyle = styled.div`
  img{
    max-width: 100px;
  }
`;
const H1 = styled.h1`
  font-family:  sans-serif;
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
    background: #0ea4e8;
    border-radius: 20px;
    position: relative;
    color:white;
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
  font-family: sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: 15px;
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

const InputContainer = styled.div`
  width: 320px;
`;

const CheckWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const CheckButton = styled.button`
  border: none;
  --bs-btn-hover-bg: transparent;
  --bs-btn-active-bg: transparent;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    margin-top: 23px;

`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
`;

const TimelineDate = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const TimelineText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          <span>
            UNLIMITED{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#0ea4e8"
              />
            </svg>
          </span>
          HACKER
        </H1>
        <Text style={{ maxWidth: "670px" }}>
          The Web3 Hackfest, with the theme “Unlimited Hacker”, is a large
          hackathon festival for Web2 & Web3 startup builders, developers, and
          creators. The Web3 Hackfest features multichain developer bootcamps,
          uni tours, workshops, and a hackathon, and will run 4 months from June
          to September 2023.
          <br />
          <br />
          Web3 is still small and Web3 Hackfest’s goal is to unify Web3 builders
          to push the boundaries of what’s possible, bridge Web3 builders with
          outside communities, and accelerate Web3 adoption across the world.
          <br />
          <br />
          Now is the time to build the next breakthrough project!
        </Text>

        {/* HACKATHON TIMELINE */}
        <Flex>
          <Text size="24px" weight="600" style={{ letterSpacing: "0.17em" }}>
            💰 $100K+ in prizes!
          </Text>
          <TimelineContainer>
            <h5>
              <b>HACKATHON timeline:</b>
            </h5>

            <TimelineItem>
              <TimelineDate>1ST JULY - 31ST JULY:</TimelineDate>
              <TimelineText>Register open!</TimelineText>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>1ST AUG - 26TH AUG:</TimelineDate>
              <TimelineText>WORKSHOP & MENTORING</TimelineText>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>27TH AUG:</TimelineDate>
              <TimelineText>DEADLINE FOR SUBMISSIONS</TimelineText>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>1ST SEP:</TimelineDate>
              <TimelineText>TOP 10 ANNOUNCEMENT</TimelineText>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>9-10TH SEP:</TimelineDate>
              <TimelineText>PITCHING & AWARD CEREMONY</TimelineText>
            </TimelineItem>
          </TimelineContainer>

          {/* REGISTER FORM  */}
          <Text size="23px" weight="600">
            👨‍💻 Register for Workshops & Hackathon
          </Text>

          {!state.hasRegistered && (
            <>
              <InputContainer>
                <Widget
                  src={"nearhorizon.near/widget/Inputs.Text"}
                  props={{
                    label: "",
                    placeholder: "Email",
                    placeholder: "Your Email Address",
                    value: state.email,
                    onChange: (email) => State.update({ email }),
                  }}
                />
              </InputContainer>

              <div className="row">
                <button
                  className="btn btn-primary"
                  disabled={!isValidEmail(state.email)}
                  onClick={handleSignup}
                >
                  Register for updates
                </button>
              </div>
            </>
          )}

          {state.hasRegistered && (
            <>
              <Text size="20px" weight="500">
                {state.registerMsg}
              </Text>
            </>
          )}
        </Flex>
        {/* END REGISTER FORM  */}
      </Flex>
      <br />
      {/* END HACKATHON TIMELINE */}
      <div>
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://web3hackfest.org/",
            label: "🌐 Learn more at Web3Hackfest.org ",
            variant: "outline-secondary",
            size: "large",
          }}
        />
      </div>

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
          UNLIMITED HACKER powered by @NEARVIETNAMHUB
        </Text>
        <LogoStyle>
          <Widget src="nearvietnamhub.near/widget/nearvietnamhub.logo" />
        </LogoStyle>
      </Flex>
    </Container>
  </Wrapper>
);
