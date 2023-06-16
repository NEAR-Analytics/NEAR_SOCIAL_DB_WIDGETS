const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #282c34;
  color: white;
  font-size: calc(10px + 2vmin);
`;

const GameButton = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  &:hover {
    background: white;
    color: palevioletred;
  }
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Info = styled.p`
  margin-top: 1em;
`;

State.init({
  blockHeight: 0,
  clickCount: 0,
  love: 0,
  bossHP: 100,
  bossLevel: 1,
  gameStarted: false,
});

function startGame() {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      let newBlockHeight = data.sync_info.latest_block_height;
      State.update({
        blockHeight: newBlockHeight,
        gameStarted: true,
      });
    } else {
      console.error("Error fetching data: ", data.error);
    }
  });
}

function fetchDataAndUpdateState() {
  const oldBlockHeight = state.blockHeight;
  const oldLove = state.love;
  const oldClickCount = state.clickCount;
  let bossHP = state.bossHP;
  let bossLevel = state.bossLevel;

  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      let newBlockHeight = data.sync_info.latest_block_height;
      let love = oldLove;
      let clickCount = oldClickCount;
      if (newBlockHeight > oldBlockHeight) {
        love += newBlockHeight - oldBlockHeight;
        clickCount++;
      }

      bossHP -= love;
      love = 0;
      if (bossHP <= 0) {
        bossHP = 100;
        bossLevel++;
      }

      State.update({
        blockHeight: newBlockHeight,
        clickCount: clickCount,
        love: love,
        bossHP: bossHP,
        bossLevel: bossLevel,
      });
    } else {
      console.error("Error fetching data: ", data.error);
    }
  });
}

return (
  <GameContainer>
    <Title>Block Battle!</Title>
    <Info>Block Height: {state.blockHeight}</Info>
    <Info>Times Attacked: {state.clickCount}</Info>
    <Info>Love: {state.love}</Info>
    <Info>Boss HP: {state.bossHP}</Info>
    <Info>Boss Level: {state.bossLevel}</Info>
    {!state.gameStarted && (
      <GameButton onClick={startGame}>Start Game</GameButton>
    )}
    {state.gameStarted && (
      <GameButton onClick={fetchDataAndUpdateState}>Attack!</GameButton>
    )}
  </GameContainer>
);
