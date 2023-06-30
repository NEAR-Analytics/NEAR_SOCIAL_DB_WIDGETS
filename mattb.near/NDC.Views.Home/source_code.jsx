const { view, darkmode } = props;

const DEFAULT_BACKGROUND_COLOR = darkmode ? "#191919" : "#fff";
const DEFAULT_COMPONENT_COLOR = darkmode ? "rgba(0,0,0,.8)" : "#fff";
const DEFAULT_GRADIENT =
  "linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(79, 70, 229) 100%)";

const DEFAULT_TEXT_COLOR = darkmode ? "#fff" : "#000";

const DEFAULT_LOGO_URL = darkmode
  ? "https://ipfs.near.social/ipfs/bafkreihbueuso62ltstbcxdhlmdnacomlb2hxun5fxh34f4rvgtgb5pfi4"
  : "https://ipfs.near.social/ipfs/bafkreiavgky7fgrvwl4x4rxcypgew5ou6ahwf6mrcbtyswbvtbnrkrrobu";

const I_AM_HUMAN_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafybeibs7rgjyqlrhqg3o5iiy3i235mtz3nlntswmye32f3myqk4owbxzy";

const BACKGROUND_DECORATION_URL =
  "https://ipfs.near.social/ipfs/bafybeicwdaezq3bnsd7nocof2ktc3rlla6u5s5iqxe5p2c6at2leqnc7wi";

const Main = styled.div`
    width:100%;
    min-height:100vh;
    background-color:${DEFAULT_BACKGROUND_COLOR};
    background-image: url(${BACKGROUND_DECORATION_URL});
    background-size:1200px auto;
    background-repeat: no-repeat;
    background-position: bottom left;

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

const Navigation = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    max-width:1300px;
    margin:0 auto;
    padding:1rem;
    color:${DEFAULT_TEXT_COLOR};
    font-size:.9rem;
    letter-spacing:-.5px;
    min-height:70px;

    img {
        position:absolute;
        left:1rem;
        border:1rem;
    }

    ul {
        display:flex;
        align-items:center;
        padding:0;
        margin:0;
        list-style:none;
        flex-wrap:wrap;

        li {
            padding:0;
            
            &:not(:last-of-type) {
                margin-right:1rem;
            }

            a {
                cursor:pointer;
                transition:all .2s;
                border-radius:10px;
                background-color:rgba(0,0,0,.05);
                padding:.5rem 1rem;
                font-weight:bold;
                opacity:.6;
                color:${DEFAULT_TEXT_COLOR};

                &:hover {
                    opacity:1;
                }
            }
        }
    }
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
    background-color:${DEFAULT_COMPONENT_COLOR};
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
    color:${DEFAULT_TEXT_COLOR};
    margin:0;
    padding:0;
    font-size:1.5rem;
    font-weight:bold;
`;

const ProgressWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:2rem;
`;

let views = {
    home: () => <>
        <Title>Activity</Title>
          <PollContainer>
            <Widget
              src={`neardigitalcollective.near/widget/EasyPoll.Main`}
              props={{
                sharedBlockHeight: 0,
              }}
            />
            <Widget
              src={`neardigitalcollective.near/widget/NDCDocs_OneArticle`}
              props={{
                lastEditor: "blaze.near",
                blockHeight: "94478867",
                articleId: "TheNDC",
              }}
            />
          </PollContainer>
    </>,
    docs: () => <></>,
    funding: () => <></>,
    sayalot: () => <></>,
};

State.init({
    currentView: view || "home",
    render: ""
});

function changeView(view) {
    if (view in views) {
        State.update({render: views[view](), currentView: view});
    }
}

if (!state.render) {
    changeView("home");
}

return (
  <Main>
    <Header>
      <Navigation>
        <Logo src={DEFAULT_LOGO_URL} />
        <ul>
          <li>
            <a
              onClick={() => changeView("home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => changeView("docs")}
            >
              NDCDocs
            </a>
          </li>
          <li>
            <a
              onClick={() => changeView("funding")}
            >
              Funding dashboard
            </a>
          </li>
          <li>
            <a
              onClick={() => changeView("sayalot")}
            >
              Say A Lot
            </a>
          </li>
        </ul>
      </Navigation>
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

          <ProgressWrapper>
            <Widget
              src="mattb.near/widget/NDC.Components.ProgressMeterHumans"
              props={{
                width: 250,
                backgroundColor: DEFAULT_BACKGROUND_COLOR,
                color: DEFAULT_TEXT_COLOR,
              }}
            />
          </ProgressWrapper>
        </Section>
        <Section>
          {state.render}
        </Section>
        <Section>
          <Widget src="neardigitalcollective.near/widget/OfficeHours" />
        </Section>
      </Body>
    </Wrapper>
  </Main>
);
