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
  margin-top: 20px; /* Added margin top */
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
    boostLevel: 1,
    totalLove: 0,
    claimLoveCounter: 0,
    gameStarted: false,
    startingBlockHeight: 0, // Add startingBlockHeight property
    highScore: 0, // Add highScore property
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
        startingBlockHeight: blockHeight, // Set starting block height
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
  const boostLevel = state.boostLevel;
  let totalLove = state.totalLove;
  let claimLoveCounter = state.claimLoveCounter;

  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      const newBlockHeight = data.sync_info.latest_block_height;
      if (newBlockHeight > oldBlockHeight) {
        const blockDifference = newBlockHeight - oldBlockHeight;
        const love = oldLove + blockDifference * boostLevel; // Increase love based on block difference * boost level

        // Update totalLove
        totalLove += blockDifference * boostLevel;
        claimLoveCounter++;

        State.update({
          blockHeight: newBlockHeight,
          love: love,
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
  const score = calculateScore(); // Calculate the current score
  const previousHighScore = state.highScore || 0; // Retrieve the previous high score from state

  // Update the game state and include the high score
  State.update({
    ...initGameState(),
    highScore: Math.max(score, previousHighScore), // Save the higher score between the current and previous high scores
  });
}

function spreadLove() {
  const love = state.totalLove; // Use totalLove to spread love
  let bossHP = state.bossHP;
  let bossLevel = state.bossLevel;
  const clickCount = state.clickCount + 1;

  bossHP -= love; // Decrease boss HP by love value

  if (bossHP <= 0) {
    bossLevel++;
    bossHP = 100 * bossLevel + clickCount * 2;
  }

  const difference = state.love - state.totalLove; // Calculate the difference between love and totalLove
  const totalLove = difference > 0 ? state.totalLove + difference : 0; // Add the difference back to totalLove (minimum 0)

  State.update({
    bossHP: bossHP,
    bossLevel: bossLevel,
    clickCount: clickCount,
    totalLove: totalLove, // Update totalLove with the new value
    love: 0, // Reset love to 0
    claimLoveCounter: 0, // Reset claimLoveCounter to 0
  });
}

function boostLove() {
  const clickCount = state.clickCount + 1;
  const updatedLove = state.love * clickCount;
  const updatedBoostLevel = state.boostLevel + 1;

  State.update({
    love: updatedLove,
    boostLevel: updatedBoostLevel,
    clickCount: clickCount,
  });
}

function calculateScore() {
  if (state.gameStarted) {
    const { bossLevel, startingBlockHeight, blockHeight } = state;
    const blockDifference = blockHeight - startingBlockHeight;
    if (blockDifference <= 0) {
      return 0; // Return 0 if no or negative block difference
    }
    const previousScore = state.score || 0; // Retrieve the previous score from state
    const score = previousScore + bossLevel * blockDifference;
    return Math.max(score, 0); // Return the score or 0 (whichever is higher)
  } else {
    return 0; // Return 0 if the game hasn't started yet
  }
}

return (
  <GameContainer>
    <Title>Marma J Forever!</Title>
    {!state.gameStarted && (
      <div>
        <Info>Player ID: {accountId}</Info> {/* Display Player ID */}
        <div>High Score: {state.highScore}</div> {/* Display High Score */}
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
            <Info>Total Love: {state.totalLove}</Info>
            <Info>Boost Level: {state.boostLevel}</Info>{" "}
            {/* Display Boost Level */}
            <GameButton onClick={claimLove}>Claim Love</GameButton>
            <GameButton onClick={boostLove}>Boost Love</GameButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Info>Boss Level: {state.bossLevel}</Info>{" "}
            {/* Display Boss Level */}
            <Info>Boss HP: {state.bossHP}</Info> {/* Display Boss HP */}
            <GameButton
              onClick={state.claimLoveCounter > 0 ? spreadLove : undefined}
              disabled={state.claimLoveCounter === 0}
              style={{
                backgroundColor:
                  state.claimLoveCounter === 0 ? "grey" : "palevioletred",
              }}
            >
              {state.claimLoveCounter > 0 ? "Spread Love" : "Claim Love First"}
            </GameButton>
          </div>
        </div>
        <RulesContainer>
          <p>
            <Info>Player ID: {accountId}</Info> {/* Display Player ID */}
          </p>
          <ol>
            <li>Claim Love</li>
            <li>Spread it to attack the boss</li>
            <li>Boost to generate love faster</li>
            <li>New Game to reset</li>
          </ol>
        </RulesContainer>
        <GameButton onClick={newGame}>New Game</GameButton>
        <div>Current Score: {calculateScore()}</div>{" "}
        {/* Display Current Score */}
      </div>
    )}
  </GameContainer>
);
