const CONTRACT = "sudoku.bozon.near";
const STORAGE = "4030000000000000000000";

if (context.accountId === null) return "login";

const player = Near.view(
  CONTRACT,
  "get_player",
  {
    account_id: context.accountId,
  },
  "final",
  { subscribe: true }
);
const leaderboard = Near.view(CONTRACT, "get_leaderboard", {}, "final", {
  subscribe: true,
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
    player === null ? STORAGE : undefined
  );

  // State.update({
  //   player: result,
  // });
}

async function finishGame() {
  console.log("aa");

  const isSloved = Near.view(CONTRACT, "check_sloved", {
    array: state.current_board,
  });

  console.log(isSloved);

  if (!isSloved) {
    return State.update({ message: "sudoku not sloved" });
  }

  Near.call(
    CONTRACT,
    "finish_game",
    { array: state.current_board },
    "30000000000000"
  );
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
    leaderboard: false,
  });
}

const Header = styled.div`
  color: rgb(143 217 165);
  width: 100%;

  padding: 10px;

  margin-bottom: 20px;

  border-bottom: 2px solid rgb(143 217 165);

  display: flex;
  justify-content: space-between;
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
      <Button
        onClick={() => {
          State.update({ leaderboard: !state.leaderboard });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-award-fill"
          viewBox="0 0 16 16"
        >
          <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
        </svg>
        Leaderboard
      </Button>
    </Header>
    <div>{state.message}</div>
    <Content>
      {state.leaderboard ? (
        <Widget
          src="bozon.near/widget/Sudoku.Leaderboard"
          props={{ leaderboard }}
        />
      ) : (
        <div>
          {state.player === null && (
            <div>
              <div>First transaction may cost {parseInt(STORAGE) / 1e24}</div>
              <Button onClick={startGame}>Play</Button>
            </div>
          )}

          {state.player.sudoku == null && (
            <div>
              <div>Sudoku successfully sloved</div>
              <div>
                Time:
                <Widget
                  src="bozon.near/widget/TimeAgo"
                  props={{
                    diffSec:
                      state.player.last_sloved_game.time_end -
                      state.player.last_sloved_game.time_start,
                  }}
                />
                Best time:
                <Widget
                  src="bozon.near/widget/TimeAgo"
                  props={{
                    diffSec: state.player.best_time,
                  }}
                />
              </div>
              <Button onClick={startGame}>Play</Button>
            </div>
          )}

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

              <div class="mt-3 d-flex flex-row justify-content-between align-items-center">
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
        </div>
      )}
    </Content>
  </Main>
);
