const buttonWidget = "chess-game.near/widget/ChessGameButton";

State.init({
  difficulty: "Easy",
});

const selectDifficulty = (event) => {
  State.update({
    difficulty: event.target.value,
  });
};
const createAiGame = () => {
  Near.call(contractId, "create_ai_game", {
    difficulty: state.difficulty,
  });
};

const GameCreator = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > *:not(h2) {
    margin: 0.2rem 0;
  }

  h2, h3, h4 {
    align-self: center;
  }
`;

return (
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
    <Widget
      src={buttonWidget}
      props={{
        onClick: createAiGame,
        fontSize: "1.4rem",
        content: "Create",
      }}
    />
  </GameCreator>
);
