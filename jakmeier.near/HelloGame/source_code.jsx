// very hacky PoC for an interactive widget

State.init({ playerPos: { x: 0, y: 0 } });

const Tile = {
  Empty: "◻",
  Ghost: "👻",
  Tree: "🌲",
};

const staticDemoMap = [
  { x: 1, y: 1, obj: Tile.Tree },
  { x: 3, y: 5, obj: Tile.Tree },
  { x: -27, y: 4, obj: Tile.Tree },
  { x: 20, y: 17, obj: Tile.Tree },
  { x: 11, y: 21, obj: Tile.Tree },
  { x: -26, y: 22, obj: Tile.Tree },
  { x: 26, y: 18, obj: Tile.Tree },
  { x: -15, y: -30, obj: Tile.Tree },
  { x: -16, y: 15, obj: Tile.Tree },
  { x: 2, y: -19, obj: Tile.Tree },
  { x: -10, y: -25, obj: Tile.Tree },
  { x: 12, y: 28, obj: Tile.Tree },
  { x: 9, y: -3, obj: Tile.Tree },
  { x: -36, y: -27, obj: Tile.Tree },
  { x: -29, y: 1, obj: Tile.Tree },
  { x: 25, y: 7, obj: Tile.Tree },
  { x: -38, y: -10, obj: Tile.Tree },
  { x: -43, y: -41, obj: Tile.Tree },
  { x: 18, y: 40, obj: Tile.Tree },
  { x: -37, y: 37, obj: Tile.Tree },
  { x: 43, y: -45, obj: Tile.Tree },
  { x: -22, y: 28, obj: Tile.Tree },
  { x: 17, y: -2, obj: Tile.Tree },
  { x: -15, y: 11, obj: Tile.Tree },
  { x: -7, y: -3, obj: Tile.Tree },
  { x: 18, y: 6, obj: Tile.Tree },
  { x: 17, y: -11, obj: Tile.Tree },
  { x: 11, y: -5, obj: Tile.Tree },
  { x: -18, y: -19, obj: Tile.Tree },
  { x: -3, y: -10, obj: Tile.Tree },
  { x: -15, y: 20, obj: Tile.Tree },
  { x: 20, y: 3, obj: Tile.Tree },
  { x: 5, y: 19, obj: Tile.Tree },
  { x: 12, y: 5, obj: Tile.Tree },
  { x: -7, y: -19, obj: Tile.Tree },
  { x: -6, y: 20, obj: Tile.Tree },
  { x: -9, y: 18, obj: Tile.Tree },
  { x: 4, y: 19, obj: Tile.Tree },
  { x: -3, y: -17, obj: Tile.Tree },
  { x: 4, y: 1, obj: Tile.Tree },
  { x: 6, y: 12, obj: Tile.Tree },
  { x: 15, y: 4, obj: Tile.Tree },
  { x: -5, y: -2, obj: Tile.Tree },
  { x: -19, y: 4, obj: Tile.Tree },
  { x: 16, y: 9, obj: Tile.Tree },
  { x: 3, y: -19, obj: Tile.Tree },
  { x: -17, y: -2, obj: Tile.Tree },
  { x: 4, y: -4, obj: Tile.Tree },
  { x: 6, y: -9, obj: Tile.Tree },
  { x: -11, y: -11, obj: Tile.Tree },
  { x: 15, y: 8, obj: Tile.Tree },
  { x: 9, y: -6, obj: Tile.Tree },
];

const renderMap = (playerPos) => {
  const map = Array.from(Array(11), () => new Array(11).fill(Tile.Empty));
  // apply view offset
  const dx = playerPos.x - 5;
  const dy = playerPos.y - 5;
  staticDemoMap.forEach((def) => {
    const x = def.x - dx;
    const y = def.y - dy;
    if (map[x] && map[x][y]) {
      map[x][y] = def.obj;
    }
  });
  // player at the center
  map[5][5] = Tile.Ghost;
  const html = map
    .map((row) => row.map((tile) => <div style={{ size: "20px" }}>{tile}</div>))
    .flat();
  return html;
};

function keyDownHandler(e) {
  // apparently switch is not supported, using if-else instead
  if (e.key == "ArrowLeft") {
    state.playerPos.x -= 1;
  } else if (e.key == "ArrowRight") {
    state.playerPos.x += 1;
  } else if (e.key == "ArrowUp") {
    state.playerPos.y -= 1;
  } else if (e.key == "ArrowDown") {
    state.playerPos.y += 1;
  } else if (e.key == " ") {
    state.playerPos.x = 0;
    state.playerPos.y = 0;
  } else {
    console.log(e);
  }
  State.update();
}

// Component that forwards key inputs to provided callback.
//
// Right now, I don't know of a better way than abusing an input field,
// because global even listeners seem not to be supported :(
const KeyInput = (props) => {
  return (
    <div style={{ width: props.width, margin: "20px 0" }}>
      Click inside the text input and use arrow keys to move!
      <input type="text" onKeyDown={props.keyDownHandler} />
    </div>
  );
};

return (
  <div>
    {KeyInput({ width: "240px", keyDownHandler })}
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(11,20px)",
        width: "240px",
      }}
    >
      {renderMap(state.playerPos)}
    </div>
  </div>
);
