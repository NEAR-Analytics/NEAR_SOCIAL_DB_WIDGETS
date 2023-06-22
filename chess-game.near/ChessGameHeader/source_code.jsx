const profileIcon = "chess-game.near/widget/ProfileIcon";
const githubIcon = "chess-game.near/widget/GithubIcon";
const twitterIcon = "chess-game.near/widget/TwitterIcon";

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;

  a {
    display: block;
    align-items: center;
    color: inherit;
    text-decoration: inherit;
    font-size: 1.4rem;
    border-radius: 0.4rem;
    border: 1px solid lightblue;
    padding: 0.2rem;

    &:hover {
      border: 1px solid blue;
      color: darkblue;
    }
  }
`;
const Disclaimer = styled.div`
  margin-top: 1rem;
  font-style: italic;
  font-size: 1.2rem;
`;

return (
  <Header>
    <h1>Protocol Pawns</h1>
    <Disclaimer>
      Play chess fully on chain powered by Near Protocol and the BOS. If you
      want to learn more please visit the profile page.
    </Disclaimer>
    <a href="https://chess-game.near.social" target="_blank">
      <Widget src={profileIcon} props={{ height: "2rem" }} />
      <span>Profile</span>
    </a>
    <a href="https://github.com/Protocol-Pawns" target="_blank">
      <Widget src={githubIcon} props={{ height: "2rem" }} />
      <span>Github</span>
    </a>
    <a href="https://twitter.com/protocolpawns" target="_blank">
      <Widget src={twitterIcon} props={{ height: "2rem" }} />
      <span>Twitter</span>
    </a>
  </Header>
);
