const CONTRACT = "sudoku.bozon.near";

if (context.accountId === null) return "login";

const player = Near.view(CONTRACT, "get_player", {
  account_id: context.accountId,
});
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
    player === null ? "3930000000000000000000" : undefined
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

const Board = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(9, auto);
`;

// const BoardOuter = styled.div`
//   display: grid;
//   gap: 15px;
//   grid-template-columns: repeat(3, auto);
// `;

// const BoardInner = styled.div`
//   display: grid;
//   //gap: var(--gap);
//   gap: 5px;
//   grid-template-columns: repeat(3, auto);
// `;

const Cell = styled.input`
  height: 36px;
  width: 36px;
  border-radius: 10px;

  background-color: rgb(202, 240, 248);
  color: black;
    
  display: grid;
  place-items: center;
  font-size: 20px;
  cursor: pointer;
  border: none;
  text-align: center;

  &:disabled {
    background-color: rgb(143 217 165);
    cursor: not-allowed;
  }

  &:hover {
    border: 2px solid rgb(143 217 165);
  }

  &:focus {
    border: 2px solid rgb(143 217 165);
  }
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
      {player === null && (
        <div>
          <Button onClick={startGame}>Play</Button>
        </div>
      )}
      {player && (
        <div>
          <Board>
            {state.current_board.map((row, x) => {
              return (
                //<BoardInner>
                row.map((el, y) => {
                  return (
                    <Cell
                      style={{
                        marginRight: (y + 1) % 3 == 0 && y < 8 ? "10px" : "0px",
                        marginBottom:
                          (x + 1) % 3 == 0 && y < 8 ? "10px" : "0px",
                      }}
                      disabled={state.player.sudoku[x][y] != 0}
                      onKeyDown={(event) => {
                        if (state.player.sudoku[x][y] != 0) return;

                        if (event.key.match(/^$|^[1-9]$/)) {
                          return setValue(x, y, parseInt(event.key));
                        }

                        if (event.key == "Backspace") {
                          return setValue(x, y, 0);
                        }
                      }}
                      value={
                        state.current_board[x][y] == 0
                          ? ""
                          : state.current_board[x][y]
                      }
                    />
                  );
                })
                //</BoardInner>
              );
            })}
          </Board>

          <div class="mt-3">
            <Button
              disabled={state.current_board.find((row) => {
                return row.find((el) => el === 0) === 0;
              })}
              onClick={finishGame}
            >
              Send answer
            </Button>
            <Button onClick={startGame}>Generate game</Button>
          </div>
        </div>
      )}
    </Content>
  </Main>
);
