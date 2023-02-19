const CONTRACT = "sudoku.bozon.near";
const STORAGE = "4030000000000000000000";

if (context.accountId === null) return "login";

const player = Near.view(CONTRACT, "get_player", {
  account_id: context.accountId,
});
console.log(player);
const slove = Near.view(CONTRACT, "get_solved", {
  array: player.sudoku,
});
console.log(slove);

const savedBoard = Storage.privateGet("board");

function isEqualBoard(savedBoard, boardInContract) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (
        boardInContract[x][y] !== 0 &&
        savedBoard[x][y] != boardInContract[x][y]
      ) {
        return false;
      }
    }
  }
  return true;
}

function startGame() {
  Near.call(
    CONTRACT,
    "start_game",
    {},
    "30000000000000",
    player === null ? STORAGE : undefined
  );

  // State.update({
  //   player: result,
  // });
}

async function finishGame() {
  const isSloved = Near.view(CONTRACT, "check_sloved", {
    array: state.current_board,
  });

  if (!isSloved) {
    return State.update({ message: "sudoku not sloved" });
  }

  Near.call(CONTRACT, "finish_game", {}, "30000000000000");
}

function setValue(x, y, value) {
  state.current_board[x][y] = value;
  Storage.privateSet("board", state.current_board);
  State.update();
}

if (player !== null) {
  State.init({
    player,
    current_board: isEqualBoard(savedBoard, player.sudoku)
      ? savedBoard
      : player.sudoku,

    message: null,
  });
}

const Header = styled.div`
  color: rgb(143 217 165);
  width: 100%;

  margin-bottom: 20px;

  border-bottom: 2px solid rgb(143 217 165);
`;

const Main = styled.div`
`;

const Content = styled.div`
  display: grid;
  place-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: rgb(143 217 165);
  border-radius: 10px;
  padding: 10px;

  &:disabled {
    cursor: not-allowed;
  }
`;

return (
  <Main>
    <Header>
      <h1>Sudoku</h1>
    </Header>
    <div>{state.message}</div>
    <Content>
      {state.player.sudoku === null && (
        <div>
          <div>First transaction may cost {parseInt(STORAGE) / 1e24}</div>
          <Button onClick={startGame}>Play</Button>
        </div>
      )}
      {state.player.sudoku == null && <div>{JSON.stringify(state.player)}</div>}
      {state?.player?.sudoku && (
        <div>
          <Widget
            src="bozon.near/widget/Sudoku.Board"
            props={{
              current_board: state.current_board,
              init_board: state.player.sudoku,
              update: setValue,
            }}
          />

          <div class="mt-3">
            <Button
              disabled={state.current_board.find((row) => {
                return row.find((el) => el === 0) === 0;
              })}
              onClick={finishGame}
            >
              Send answer
            </Button>
            <Button onClick={startGame}>Generate new game</Button>
            <Widget
              src="bozon.near/widget/Sudoku.Timer"
              props={{ startTime: state.player.start_time }}
            />
          </div>
        </div>
      )}
    </Content>
  </Main>
);
