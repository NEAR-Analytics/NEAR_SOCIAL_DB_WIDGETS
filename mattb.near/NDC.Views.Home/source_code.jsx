const DEFAULT_COMPONENT_COLOR = !!props.darkmode ? "rgba(0,0,0,.8)" : "#fff";
const DEFAULT_BACKGROUND_COLOR = !!props.darkmode
  ? "rgba(0,0,0,.9)"
  : "rgba(0,0,0,.02)";
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
    background-color:${DEFAULT_COMPONENT_COLOR};
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

const ScoreBoard = styled.div`
    display:flex;
    width:100%;
    max-width:300px;
    border-radius:10px;
    box-sizing:border-box;
    padding: .8rem;
    background-color:${DEFAULT_COMPONENT_COLOR};
    margin-bottom:.8rem;

    h1 {
        font-size:1rem;
    }
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
          <Widget
            src="ndcplug.near/widget/NDC.linkCard"
            props={{
              title: "Community Leaderboard",
              subtitle: "See which communities are onboarding the most humans",
              link: "https://i-am-human.app/community-scoreboard",
              imgSrc: I_AM_HUMAN_LOGO_URL,
            }}
          />
        </Section>
        <Section>
          <PollContainer>
            <Widget src="neardigitalcollective.near/widget/EasyPoll.Main@94242300" />
          </PollContainer>
        </Section>
        <Section>...</Section>
      </Body>
    </Wrapper>
  </Main>
);
