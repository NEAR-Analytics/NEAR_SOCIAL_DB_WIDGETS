const DEFAULT_BACKGROUND_COLOR = !!props.darkmode ? "rgba(0,0,0,.9)" : "#fff";
const DEFAULT_COMPONENT_COLOR = !!props.darkmode
  ? "rgba(0,0,0,.8)"
  : "rgb(248, 248, 249)";
const DEFAULT_GRADIENT =
  "linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(79, 70, 229) 100%)";

const DEFAULT_TEXT_COLOR = !!props.darkmode ? "#fff" : "#000";

const DEFAULT_LOGO_URL = !!props.darkmode
  ? "https://ipfs.near.social/ipfs/bafkreihbueuso62ltstbcxdhlmdnacomlb2hxun5fxh34f4rvgtgb5pfi4"
  : "https://ipfs.near.social/ipfs/bafkreiavgky7fgrvwl4x4rxcypgew5ou6ahwf6mrcbtyswbvtbnrkrrobu";

const I_AM_HUMAN_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafybeibs7rgjyqlrhqg3o5iiy3i235mtz3nlntswmye32f3myqk4owbxzy";

const Main = styled.div`
    width:100%;
    min-height:100vh;
    background-color:${DEFAULT_BACKGROUND_COLOR};

    * {
        font-family: 'Avenir', sans-serif;
    }

`;

const Header = styled.div`
    width:100%;
    background-color:transparent;
`;

const Logo = styled.img`
    max-width:30px;
`;

const Wrapper = styled.div`
    max-width:1300px;
    margin:0 auto;
    padding:1rem;
`;

const Body = styled.div`
    display: grid;
    grid-template-columns: 290px minmax(0px, 1fr) 290px;
    gap: 16px;
`;

const Section = styled.div`
`;

const PollContainer = styled.div`
    overflow:hidden;
    border-radius:20px;
`;

const ScoreBoard = styled.a`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    max-width:300px;
    border-radius:10px;
    box-sizing:border-box;
    padding: .8rem;
    background-color:#fff;
    border: 2px solid rgba(0,0,0,.05);
    margin-bottom:.8rem;
    cursor:pointer;
    transition: all .2s;
    color:${DEFAULT_TEXT_COLOR};
    
    &:hover {
        transition: all .2s;
        border: 2px solid rgb(79, 70, 229);
        background: linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%);
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 30px;
    }

    & > div {
        h1 {
            font-size:.9rem;
            font-weight:bold;
            letter-spacing:-.5px
        }

        p {
            font-size:.8rem;
            margin:0;
            padding:0;
        }
    }
`;

const Info = styled.div`
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 30px;
    border-radius: 10px;
    border: 1px solid rgb(79, 70, 229);
    background: ${DEFAULT_GRADIENT};
    color: #fff;
    box-sizing:border-box;
    padding:.8rem;
    margin-bottom:.8rem;
    box-shadow:0 0 20px 5px rgba(0,0,0,.1);

    h1 {
        font-size:.9rem;
        font-weight:bold;
        letter-spacing:-.5px
    }

    p {
        font-size:.8rem;
    }

    a {
        font-size:.8rem;
        border:0;
        letter-spacing:-.5px;
        padding:.5rem 1rem;
    }

    a.primary {
        background-color:#fff!important;
        color:rgb(147, 51, 234)!important;
        border:2px solid #fff;
    }

    a.secondary {
        color:#fff;
        border:2px solid #fff;
    }
`;

const Title = styled.h1`
    margin:0;
    padding:0;
    font-size:2rem;
    font-weight:bold;
`;

return (
  <Main>
    <Header>
      <Wrapper>
        <Logo src={DEFAULT_LOGO_URL} />
      </Wrapper>
    </Header>
    <Wrapper>
      <Body>
        <Section>
          <Info>
            <h1>I-AM-HUMAN Onboarding Competition</h1>
            <p>
              Get your personal tracking links to onboard humans and see scores
              here. For more information, join this telegram group for
              competition details.
            </p>
            <a
              className="btn primary"
              target="_blank"
              href="https://t.me/+fcNhYGxK891lMjMx"
            >
              Join the community
            </a>
            <a
              className="btn secondary"
              target="_blank"
              href="https://t.me/+gVXWvooKWzozNmE0"
            >
              Learn more
            </a>
          </Info>
          <ScoreBoard
            href="https://i-am-human.app/community-scoreboard"
            target="_blank"
          >
            <div>
              <h1>
                <Logo
                  src={I_AM_HUMAN_LOGO_URL}
                  style={{
                    maxWidth: "30px",
                  }}
                />{" "}
                Community Scoreboard
              </h1>
              <div></div>
              <p>See which communities are onboarding the most humans</p>
            </div>
          </ScoreBoard>
        </Section>
        <Section>
          <Title>Activity</Title>
          <PollContainer>
            <Widget
              src={`neardigitalcollective.near/widget/EasyPoll.Questions`}
              props={{
                sharedBlockHeight: 0,
                whitelist: [
                  "neardigitalcollective.near",
                  "blaze.near",
                  "jlw.near",
                  "joep.near",
                  "sarahkornfeld.near",
                  "yuensid.near",
                ],
                indexVersion: "3.2.0",
                canOperate: false,
              }}
            />
          </PollContainer>
        </Section>
        <Section>...</Section>
      </Body>
    </Wrapper>
  </Main>
);
