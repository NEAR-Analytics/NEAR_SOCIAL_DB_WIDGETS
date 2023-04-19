const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const contractAbi = fetch(
  "https://gist.githubusercontent.com/birchmd/3db801d6115ceaaafb3d7e8fd94e0dc2/raw/5aa660a746d8f137df2c77142bfba36057dab6ef/TicTacToe.abi.json"
);
if (!contractAbi.ok) {
  return (
    <>
      <p>Failed to load Tic Tac Toe contract ABI.</p>
      <div>{JSON.stringify(contractAbi)}</div>
    </>
  );
}

const contract_address = "0xFe1241A79C614841AfC00B50183c30610348896F";
const iface = new ethers.utils.Interface(contractAbi.body);

const contract = new ethers.Contract(
  contract_address,
  contractAbi.body,
  Ethers.provider().getSigner()
);

initState({
  board: {
    isGameOver: false,
    board: [".", ".", ".", ".", ".", ".", ".", ".", "."],
  },
  pendingPlayer: "X",
  player: "X",
  playerNumber: 1,
  expectNewState: true,
  firstQuery: true,
  startingNewGame: false,
});

const newGame = () => {
  // Don't allow sending new transactions while waiting
  // for the state to update.
  if (state.expectNewState) {
    return;
  }

  let player_prefernece;

  if (state.pendingPlayer == "X") {
    State.update({ player: "X", playerNumber: 1 });
    player_prefernece = 1;
  } else {
    State.update({ player: "O", playerNumber: 17 });
    player_prefernece = 0;
  }

  contract.newGame(player_prefernece).then((tx) => {
    State.update({ expectNewState: true, startingNewGame: true });
    tx.wait().then((rx) => {
      console.log(rx);
      getGameState();
    });
  });
};

const hex2BN = (hex) => {
  let input;
  if (hex.startsWith("0x")) {
    input = hex.substring(2);
  } else {
    input = hex;
  }
  return new BN(input, 16);
};

const parseBoardHex = (boardHex) => {
  const boardArray = hex2BN(boardHex).toArray("big", 11);
  const isGameOver = boardArray[0] != 0;
  const board = [".", ".", ".", ".", ".", ".", ".", ".", "."];
  var x;
  for (let i = 0; i < 9; i++) {
    x = boardArray[i + 2];
    if (x == 1) {
      board[i] = "X";
    } else if (x == 17) {
      board[i] = "O";
    }
  }
  return { isGameOver, board };
};

const getGameState = () => {
  // shot curcuit to avoid constantly hitting the RPC
  if (!state.expectNewState) {
    return;
  }

  const encodedData = iface.encodeFunctionData("getGameState", [sender]);

  Ethers.provider()
    .call({
      to: contract_address,
      data: encodedData,
    })
    .then((boardHex) => {
      const result = parseBoardHex(boardHex);
      const expectNewState =
        state.expectNewState &&
        !state.firstQuery &&
        result.isGameOver == state.board.isGameOver &&
        JSON.stringify(result.board) === JSON.stringify(state.board.board);

      var winner = null;
      if (result.isGameOver) {
        // figure out who won
        const setsOf3 = [
          [0, 1, 2], // rows
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], // columns
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], // diagonals
          [2, 4, 6],
        ];
        for (let i = 0; i < setsOf3.length; i++) {
          const idxs = setsOf3[i];
          const is3InARow = idxs.every((j) => {
            return result.board[j] == result.board[idxs[0]];
          });
          if (is3InARow) {
            winner = "Winner: " + result.board[idxs[0]];
            break;
          }
        }
        if (!winner) {
          winner = "Draw";
        }
      }

      var total = 0;
      for (let i = 0; i < 9; i++) {
        if (result.board[i] == "X") {
          total += 1;
        } else if (result.board[i] == "O") {
          total -= 1;
        }
      }
      let player;
      let playerNumber;
      if (total == 0) {
        player = "X";
        playerNumber = 1;
      } else {
        player = "O";
        playerNumber = 17;
      }

      if (!state.firstQuery && player !== state.player) {
        player = state.player;
        playerNumber = state.playerNumber;
        expectNewState = true;
      }
      if (result.isGameOver && !state.startingNewGame) {
        expectNewState = false;
      }

      State.update({
        board: result,
        player,
        playerNumber,
        winner,
        expectNewState,
        firstQuery: false,
      });
    });
};

const playerMove = (index) => {
  if (
    !state.expectNewState &&
    !state.board.isGameOver &&
    state.board.board[index] == "."
  ) {
    const move =
      "0x" +
      (
        new BN(state.playerNumber) * new BN(256).pow(new BN(8 - index))
      ).toString(16);
    contract.takePlayerTurn(move).then((tx) => {
      State.update({ expectNewState: true, startingNewGame: false });
      tx.wait().then((rx) => {
        console.log(rx);
        getGameState();
      });
    });
  }
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
    {getGameState()}
    <table>
      <tr>
        <TopLeftCell onClick={() => playerMove(0)}>
          {state.board.board[0]}
        </TopLeftCell>
        <TopCenterCell onClick={() => playerMove(1)}>
          {state.board.board[1]}
        </TopCenterCell>
        <TopRightCell onClick={() => playerMove(2)}>
          {state.board.board[2]}
        </TopRightCell>
      </tr>
      <tr>
        <MiddleLeftCell onClick={() => playerMove(3)}>
          {state.board.board[3]}
        </MiddleLeftCell>
        <MiddleCenterCell onClick={() => playerMove(4)}>
          {state.board.board[4]}
        </MiddleCenterCell>
        <MiddleRightCell onClick={() => playerMove(5)}>
          {state.board.board[5]}
        </MiddleRightCell>
      </tr>
      <tr>
        <BottomLeftCell onClick={() => playerMove(6)}>
          {state.board.board[6]}
        </BottomLeftCell>
        <BottomCenterCell onClick={() => playerMove(7)}>
          {state.board.board[7]}
        </BottomCenterCell>
        <BottomRightCell onClick={() => playerMove(8)}>
          {state.board.board[8]}
        </BottomRightCell>
      </tr>
    </table>
    <br></br>
    {state.board.isGameOver && <div>{state.winner}</div>}
    {state.expectNewState ? (
      <div>
        <p>Waiting for new data from RPC...</p>
      </div>
    ) : (
      <div />
    )}
    <br></br>
    <label for="selectPlayer">Play as:</label>
    <select
      id="selectPlayer"
      onChange={(e) => State.update({ pendingPlayer: e.target.value })}
    >
      <option value="X">X</option>
      <option value="O">O</option>
    </select>
    <div class="mb-3">
      <button onClick={newGame}>New Game</button>
    </div>
  </>
);
