const accountId = props.accountId || context.accountId;

if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://near.org/signup" target="_blank" rel="noreferrer">
        <FakeButton>Create NEAR Wallet</FakeButton>
      </a>
    </div>
  );
}

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
  };
}

State.init(initGameState());

function startGame() {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      State.update({
        ...initGameState(), // Reset game state
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

function newGame() {
  State.update(initGameState()); // Reset the game state
}

return (
  <GameContainer>
    <Title>Marma J Forever!</Title>
    <Info>Total Love: {state.totalLove}</Info>
    <Info>Boss HP: {state.bossHP}</Info>
    <Info>Boss Level: {state.bossLevel}</Info>
    <Info>Boost Level: {state.boostLevel}</Info>
    <Info>Account ID: {accountId}</Info>
    {!state.gameStarted && (
      <GameButton onClick={startGame}>Start Game</GameButton>
    )}
    {state.gameStarted && (
      <div>
        <p>
          Don't forget to claim your love before spreading it. (Claim Love
          Counter: {state.claimLoveCounter})
        </p>
        <GameButton onClick={claimLove}>Claim Love</GameButton>
        <GameButton
          onClick={state.claimLoveCounter > 0 ? spreadLove : undefined}
        >
          Spread the Love
        </GameButton>
        <GameButton onClick={boostLove}>Boost Love</GameButton>
        <GameButton onClick={newGame}>New Game</GameButton>
      </div>
    )}
  </GameContainer>
);
