const SquareButton = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`;

const borderRow = {
  clear: "both",
  content: "",
  display: "table",
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

State.init({
  squares: Array(9).fill(null),
  xIsNext: true,
});

function handleClick(i) {
  const squares = state.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? "X" : "O";
  State.update({
    squares: squares,
    xIsNext: !state.xIsNext,
  });
}

function renderSquare(i) {
  return (
    <SquareButton onClick={() => handleClick(i)}>
      {state.squares[i]}
    </SquareButton>
  );
}

const winner = calculateWinner(state.squares);
let status;
if (winner) {
  status = "Winner: " + winner;
} else {
  status = "Next player: " + (state.xIsNext ? "X" : "O");
}

return (
  <div>
    <div
      style={{
        marginBottom: 10,
      }}
    >
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() =>
          State.update({
            squares: Array(9).fill(null),
            xIsNext: true,
          })
        }
      >
        Reset Game
      </button>
    </div>
    <div
      style={{
        marginBottom: 10,
      }}
    >
      {status}
    </div>
    <div style={borderRow}>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
    <div style={borderRow}>
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
    </div>
    <div style={borderRow}>
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  </div>
);
