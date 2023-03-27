const { accountId } = context;

State.init({
  game_id: null,
  difficulty: "Easy",
});

const gameIds = Near.view("app.chess-game.near", "get_game_ids", {
  account_id: accountId,
});

const LobbyView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;

    > * {
        margin: 0.4rem 0;
    }
`;
const GameSelector = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > * {
        margin: 1rem;
    }
`;
const GameCreator = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > * {
        margin: 0.2rem 0;
    }

    h2 {
        margin-bottom: 1.2rem;
    }
`;
const Button = styled.button`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 4px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
`;
const Disclaimer = styled.div`
    margin-top: 1rem;
    font-style: italic;
    font-size: 1.2rem;
`;

const selectGame = (gameId) => () => {
  State.update({
    game_id: gameId,
  });
};
const returnToLobby = () => {
  State.update({
    game_id: null,
  });
};
const resign = () => {
  Near.call("app.chess-game.near", "resign", {
    game_id: state.game_id,
  });
};
const createAiGame = () => {
  Near.call("app.chess-game.near", "create_ai_game", {
    difficulty: state.difficulty,
  });
};
const selectDifficulty = (event) => {
  State.update({
    difficulty: event.target.value,
  });
};

const renderGameIds = () =>
  gameIds.map((gameId) => {
    const gameInfo = Near.view("app.chess-game.near", "game_info", {
      game_id: gameId,
    });
    return (
      <Button onClick={selectGame(gameId)}>
        <div>ID: {gameId[0]}</div>
        <div>VS: AI ({gameInfo.black.Ai})</div>
      </Button>
    );
  });

return (
  <LobbyView>
    {state.game_id ? (
      <>
        <Button onClick={returnToLobby}>Return To Lobby</Button>
        <Button onClick={resign}>Resign</Button>
        <Widget
          src="shrm.near/widget/ChessGame"
          props={Object.assign({}, { game_id: state.game_id })}
        />
      </>
    ) : (
      <>
        {gameIds.length > 0 && (
          <>
            <h2>Select Game:</h2>
            <GameSelector>{renderGameIds()}</GameSelector>
          </>
        )}
        <GameCreator>
          <h2>Create New AI Game:</h2>
          <span>Difficulty:</span>
          <select onChange={selectDifficulty} value={state.difficulty}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <span>
            <i>Higher difficulties consume more gas!</i>
          </span>
          <Button onClick={createAiGame} fontSize="1.4rem">
            Create
          </Button>
        </GameCreator>
      </>
    )}
    <Disclaimer>
      If you won or lost a game it will no longer be displayed. You can check
      the most recent transactions status on{" "}
      <a
        target="_blank"
        href="https://explorer.near.org/accounts/app.chess-game.near"
      >
        Near Explorer
      </a>{" "}
      or{" "}
      <a
        target="_blank"
        href="https://nearblocks.io/address/app.chess-game.near"
      >
        Nearblocks
      </a>
      . Game results and history will be displayed once we implemented an
      indexer and an API!
    </Disclaimer>
  </LobbyView>
);
