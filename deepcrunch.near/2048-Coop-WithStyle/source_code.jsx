if (context.loading) {
  return "Loading";
}

const userAccountId = context.accountId;
const gameAccountId = "test-2048-coop.deepcrunch.near";

function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function proposeMove(dir) {
  let direction = capitalize(dir);
  Near.call(gameAccountId, "propose_action", {
    action: direction,
  });
}

const arrow = (direction, scale) => {
  const s = scale || 0.5;
  return (
    <svg
      onClick={() => proposeMove(direction)}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class={`button triangle ${direction}`}
      width={100 * s}
      height={100 * s}
    >
      <path
        stroke-width={10 * s}
        stroke-linejoin="round"
        fill="#f3b27a"
        stroke="#8f7a66"
        d={`M ${50 * s},${10 * s} ${90 * s},${90 * s} ${10 * s},${90 * s} z`}
      />
    </svg>
  );
};

let Style = styled.div`
.button {
  cursor: pointer;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #BBADA0;
  width: fit-content;
  row-gap: 10px;
  padding: 10px;
  border-radius: 6px;
}

.row {
  width: 285px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.box {
  width: 58px;
  height: 58px;
  border-radius: 3px;
  border: 0;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  font-weight: 700;

  background: #eee4da59;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #776e65;
  padding: 0;
}

/* One digit */
.box.num-2,
.box.num-4,
.box.num-8 {
  font-size: 35px;
}

/* Two digits */
.box.num-16,
.box.num-32,
.box.num-64 {
  font-size: 30px;
}

/* Three digits */
.box.num-128,
.box.num-256,
.box.num-512 {
  font-size: 25px;
}

/* Four digits */
.box.num-1024,
.box.num-2048,
.box.num-4096,
.box.num-8192 {
  font-size: 20px;
}

/* Five digits */
.box.num-16384,
.box.num-32768,
.box.num-65536 {
  font-size: 15px;
}

/* Big numbers (bigger than 2048) */
.box.num-4096,
.box.num-8192,
.box.num-16384,
.box.num-32768,
.box.num-65536 {
  background-color: #3c3a33;
  color: #f9f6f2;
}

.box.num-2 {
  color: #776e65;
  background-color: #eee4da;
}

.box.num-4 {
  color: #776e65;
  background-color: #eee1c9;
}

.box.num-8 {
  color: #f9f6f2;
  background-color: #f3b27a;
}

.box.num-16 {
  background-color: #f69664;
  color: #f9f6f2;
}

.box.num-32 {
  background-color: #f77c5f;
  color: #f9f6f2;
}

.box.num-64 {
  background-color: #f75f3b;
  color: #f9f6f2;
}

.box.num-128 {
  background-color: #edd073;
  color: #f9f6f2;
}

.box.num-256 {
  background-color: #eddc62;
  color: #f9f6f2;
}

.box.num-512 {
  background-color: #edc950;
  color: #f9f6f2;
}

.box.num-1024 {
  background-color: #edc53f;
  color: #f9f6f2;
}

.box.num-2048 {
  background-color: #edc22e;
  color: #f9f6f2;
}

.v-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.h-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

// .triangle path {
//   stroke-width: 1;
//   stroke: black;
//   stroke-linejoin: round;
// }

.triangle.right {
  transform: rotate(90deg);
}

.triangle.down {
  transform: rotate(180deg);
}

.triangle.left {
  transform: rotate(-90deg);
}
`;

function boardUI(board) {
  return (
    <div class="container">
      {board.map((row, rowId) => (
        <div class="row" key={rowId}>
          {row.map((tile, tileId) => {
            if (tile === 0) {
              return <div class="box" key={tileId}></div>;
            } else {
              let className = `box num-${tile}`;
              return (
                <div class={className} key={tileId}>
                  {tile}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}

let board = [
  [2, 2, 0, 0],
  [4, 8, 16, 32],
  [64, 128, 256, 512],
  [1024, 2048, 4096, 65536],
];

board = Near.view(gameAccountId, "get_board");

return (
  <>
    <Style>
      <div class="v-container">
        <div class="top-container">{arrow("up")}</div>
        <div class="h-container">
          <div class="left-container">{arrow("left")}</div>
          {boardUI(board)}
          <div class="right-container">{arrow("right")}</div>
        </div>
        <div class="bottom-container">{arrow("down")}</div>
      </div>
    </Style>
  </>
);
