//props.current_board
//props.init_board
//props.update(x, y, value)

if (!props.current_board || !props.init_board || !props.update) return "";

const Board = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(9, auto);
`;

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

return (
  <Board>
    {props.current_board.map((row, x) => {
      return row.map((el, y) => {
        return (
          <Cell
            style={{
              marginRight: (y + 1) % 3 == 0 && y < 8 ? "10px" : "0px",
              marginBottom: (x + 1) % 3 == 0 && y < 8 ? "10px" : "0px",
            }}
            disabled={props.init_board[x][y] != 0}
            onKeyDown={(event) => {
              if (props.init_board[x][y] != 0) return;

              if (event.key.match(/^$|^[1-9]$/)) {
                return props.update(x, y, parseInt(event.key));
              }

              if (event.key == "Backspace") {
                return props.update(x, y, 0);
              }
            }}
            value={
              props.current_board[x][y] == 0 ? "" : props.current_board[x][y]
            }
          />
        );
      });
    })}
  </Board>
);
