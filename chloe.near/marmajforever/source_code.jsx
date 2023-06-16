const accountId = props.accountId || context.accountId;

const GameButton = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 10px;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  &:hover {
    background: white;
    color: palevioletred;
  }
`;

if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://near.org/signup" target="_blank" rel="noreferrer">
        <GameButton>Create NEAR Wallet</GameButton>
      </a>
    </div>
  );
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #282c34;
  color: white;
  font-size: calc(10px + 2vmin);
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-weight: bold;
  margin-top: 20px;
`;

const Info = styled.p`
  margin-top: 10px;
`;

const RulesContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

function initGameState() {
  return {
    clickCount: 0,
    love: 0,
    bossHP: 100,
    bossLevel: 1,
    totalLove: 0,
    loveSpent: 0,
    claimLoveCounter: 0,
    gameStarted: false,
    startingBlockHeight: 0,
    highScore: 0,
  };
}

State.init(initGameState());

function startGame() {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      const blockHeight = data.sync_info.latest_block_height;
      State.update({
        ...initGameState(),
        blockHeight: blockHeight,
        startingBlockHeight: blockHeight,
        gameStarted: true,
      });
    } else {
      console.error("Error fetching data: ", data.error);
    }
  });
}

function claimLove() {
  const oldBlockHeight = state.blockHeight;
  const oldLove = state.love;
  let totalLove = state.totalLove;
  let claimLoveCounter = state.claimLoveCounter;

  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      const newBlockHeight = data.sync_info.latest_block_height;
      if (newBlockHeight > oldBlockHeight) {
        const blockDifference = newBlockHeight - oldBlockHeight;
        const love = blockDifference;

        totalLove += love;
        claimLoveCounter++;

        State.update({
          blockHeight: newBlockHeight,
          love: oldLove + love,
          totalLove: totalLove,
          claimLoveCounter: claimLoveCounter,
        });
      } else {
        State.update({ blockHeight: newBlockHeight });
      }
    } else {
      console.error("Error fetching data: ", data.error);
    }
  });
}

function newGame() {
  const score = calculateScore();
  const previousHighScore = state.highScore || 0;

  State.update({
    ...initGameState(),
    highScore: Math.max(score, previousHighScore),
  });
}

function spreadLove() {
  const love = state.totalLove;
  let bossHP = state.bossHP;
  let bossLevel = state.bossLevel;
  const clickCount = state.clickCount + 1;

  bossHP -= love;

  if (bossHP <= 0) {
    bossLevel++;
    bossHP = 100 * bossLevel + clickCount * 2;
  }

  State.update({
    bossHP: bossHP,
    bossLevel: bossLevel,
    clickCount: clickCount,
    totalLove: 0,
    claimLoveCounter: 0,
    loveSpent: state.loveSpent + love,
  });
}

function calculateScore() {
  if (state.gameStarted) {
    const { bossLevel, startingBlockHeight, blockHeight } = state;
    const blockDifference = blockHeight - startingBlockHeight;
    if (blockDifference <= 0) {
      return 0;
    }
    const previousScore = state.score || 0;
    const score = previousScore + bossLevel * blockDifference;
    return Math.max(score, 0);
  } else {
    return 0;
  }
}

return (
  <GameContainer>
    <Title>Marma J Forever!</Title>
    {!state.gameStarted && (
      <div>
        <Info>Player ID: {accountId}</Info>
        <div>High Score: {state.highScore}</div>
        <GameButton onClick={startGame}>Start Game</GameButton>
      </div>
    )}
    {state.gameStarted && (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <div>
            <Info>Current Love: {state.totalLove}</Info>
            <Info>Love Spent: {state.loveSpent}</Info>
            <GameButton onClick={claimLove}>Claim Love</GameButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Info>Boss Level: {state.bossLevel}</Info>
            <Info>Boss HP: {state.bossHP}</Info>
            <GameButton
              onClick={state.claimLoveCounter > 0 ? spreadLove : undefined}
              disabled={state.claimLoveCounter === 0}
              style={{
                backgroundColor:
                  state.claimLoveCounter === 0 ? "grey" : "palevioletred",
              }}
            >
              {state.claimLoveCounter > 0 ? "Spread Love" : "Claim First"}
            </GameButton>
          </div>
        </div>
        <RulesContainer>
          <p>
            <Info>Player ID: {accountId}</Info>
          </p>
          <ol>
            <li>Claim Love</li>
            <li>Spread it to attack the boss</li>
            <li>New Game to reset</li>
          </ol>
        </RulesContainer>
        <GameButton onClick={newGame}>New Game</GameButton>
        <div>Current Score: {calculateScore()}</div>
      </div>
    )}
  </GameContainer>
);
