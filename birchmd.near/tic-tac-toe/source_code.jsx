const account_id = "ttt.nearcon.birchmd.near";
const method_name = "get_move";
const default_state = [".", ".", ".", ".", ".", ".", ".", ".", "."];

initState({
  board: default_state,
  player: "X",
  pendingPlayer: "X",
  winner: null,
});

const resetState = () => {
  const player = state.pendingPlayer;
  State.update({
    board: default_state,
    player,
    winner: null,
  });
  if (player == "O") {
    computerMove();
  }
};

const setPendingPlayer = (pendingPlayer) => {
  State.update({ pendingPlayer });
};

const computerMove = () => {
  const response = Near.view(account_id, method_name, {
    state: state.board.join(""),
  });
  let winner;
  if (response.winner) {
    if (response.winner == "Empty") {
      winner = "Draw";
    } else {
      winner = ["Winner:", response.winner].join(" ");
    }
  } else {
    winner = null;
  }
  State.update({
    board: Array.from(response.updated_state),
    winner,
  });
};

const playerMove = (index) => {
  if (!state.winner && state.board[index] == ".") {
    state.board[index] = state.player;
    computerMove();
  }
};

const getCell = (index) => {
  let value = state.board[index];
  if (value == ".") {
    value = "kk";
  }
  value;
};

const BottomCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
`;
const TopLeftCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-right: 1px solid;
    border-bottom: 1px solid;
`;
const TopCenterCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-bottom: 1px solid;
`;
const TopRightCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-left: 1px solid;
    border-bottom: 1px solid;
`;
const MiddleLeftCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-right: 1px solid;
    border-bottom: 1px solid;
`;
const MiddleCenterCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-bottom: 1px solid;
`;
const MiddleRightCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-left: 1px solid;
    border-bottom: 1px solid;
`;
const BottomLeftCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-right: 1px solid;
`;
const BottomCenterCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
`;
const BottomRightCell = styled.td`
    padding: 15px;
    border-collapse: collapse;
    border-left: 1px solid;
`;

return (
  <>
    <table>
      <tr>
        <TopLeftCell onClick={() => playerMove(0)}>
          {state.board[0]}
        </TopLeftCell>
        <TopCenterCell onClick={() => playerMove(1)}>
          {state.board[1]}
        </TopCenterCell>
        <TopRightCell onClick={() => playerMove(2)}>
          {state.board[2]}
        </TopRightCell>
      </tr>
      <tr>
        <MiddleLeftCell onClick={() => playerMove(3)}>
          {state.board[3]}
        </MiddleLeftCell>
        <MiddleCenterCell onClick={() => playerMove(4)}>
          {state.board[4]}
        </MiddleCenterCell>
        <MiddleRightCell onClick={() => playerMove(5)}>
          {state.board[5]}
        </MiddleRightCell>
      </tr>
      <tr>
        <BottomLeftCell onClick={() => playerMove(6)}>
          {state.board[6]}
        </BottomLeftCell>
        <BottomCenterCell onClick={() => playerMove(7)}>
          {state.board[7]}
        </BottomCenterCell>
        <BottomRightCell onClick={() => playerMove(8)}>
          {state.board[8]}
        </BottomRightCell>
      </tr>
    </table>
    <br></br>
    {state.winner && <div>{state.winner}</div>}
    <br></br>
    <label for="selectPlayer">Play as:</label>
    <select
      id="selectPlayer"
      onChange={(e) => setPendingPlayer(e.target.value)}
    >
      <option value="X">X</option>
      <option value="O">O</option>
    </select>
    <div class="mb-3">
      <button onClick={() => resetState()}>New Game</button>
    </div>
  </>
);
