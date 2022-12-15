// hackathon project building a small interactive game

const MAP_SIZE = "480px";
const TILE_SIZE = "40px";
const TILE_INNER_SIZE = "40px";

const Tile = {
  Empty: "◻",
  Ghost: "👻",
  Tree: "🌲",
  Pagoda: "🏯",
  Shinto: "⛩",
  Camp: "🏕",
};

const staticDemoMap = [
  // Pagdoa castle
  { x: 0, y: -4, obj: Tile.Pagoda },
  { x: 1, y: -4, obj: Tile.Shinto },
  { x: -1, y: -4, obj: Tile.Shinto },

  // hidden camp
  { x: -42, y: 42, obj: Tile.Tree },
  { x: -43, y: 42, obj: Tile.Tree },
  { x: -43, y: 41, obj: Tile.Camp },
  { x: -43, y: 40, obj: Tile.Tree },
  { x: -43, y: 39, obj: Tile.Tree },
  { x: -44, y: 41, obj: Tile.Tree },
  { x: -44, y: 42, obj: Tile.Tree },
  { x: -44, y: 40, obj: Tile.Tree },
  { x: -41, y: 43, obj: Tile.Tree },
  { x: -42, y: 43, obj: Tile.Tree },
  { x: -43, y: 43, obj: Tile.Tree },

  // some random trees
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

// Select a view of the map and store it as 2D array of tiles.
const mapView = (start_x, start_y, width, height) => {
  const map = Array.from(Array(width), () =>
    new Array(height).fill(Tile.Empty)
  );
  staticDemoMap.forEach((tile) => {
    // apply view offset
    const x = tile.x - start_x;
    const y = tile.y - start_y;
    if (map[x] && map[x][y]) {
      map[x][y] = tile.obj;
    }
  });
  return map;
};

// convert 2D array of tiles (stored in state.currentView) into HTML
const renderMap = () => {
  // make a deep copy of map so we can modify it
  const map = JSON.parse(JSON.stringify(state.currentView));
  // render player at the center
  map[5][5] = Tile.Ghost;
  const html = map
    .map((row) =>
      row.map((tile) => (
        <div
          style={{
            fontSize: TILE_INNER_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
          }}
        >
          {tile}{" "}
        </div>
      ))
    )
    .flat();
  return html;
};

// instantly moves the player to the given coordinate unless the path is blocked
const movePlayer = (x, y) => {
  if (tileInCurrentView(x, y) === Tile.Empty) {
    setPlayerPos(x, y);
  }
};

// update player position without checks
const setPlayerPos = (x, y) => {
  state.playerPos.x = x;
  state.playerPos.y = y;
  state.currentView = mapView(x - 5, y - 5, 11, 11);
  // trigger a re-render with the new state
  State.update();
};

const tileInCurrentView = (x, y) => {
  const projected_x = x - state.playerPos.x + 5;
  const projected_y = y - state.playerPos.y + 5;
  return state.currentView[projected_x][projected_y];
};

const keyDownHandler = (e) => {
  // apparently switch is not supported, using if-else instead
  if (e.key == "ArrowLeft") {
    movePlayer(state.playerPos.x - 1, state.playerPos.y);
  } else if (e.key == "ArrowRight") {
    movePlayer(state.playerPos.x + 1, state.playerPos.y);
  } else if (e.key == "ArrowUp") {
    movePlayer(state.playerPos.x, state.playerPos.y - 1);
  } else if (e.key == "ArrowDown") {
    movePlayer(state.playerPos.x, state.playerPos.y + 1);
  } else if (e.key == " ") {
    // reset to origin on space key
    setPlayerPos(0, 0);
  } else {
    console.log(e);
  }
};

// handler for gameboy input
const buttonDownHandler = (button) => {
  // apparently switch is not supported, using if-else instead
  if (button == "left") {
    movePlayer(state.playerPos.x - 1, state.playerPos.y);
  } else if (button == "right") {
    movePlayer(state.playerPos.x + 1, state.playerPos.y);
  } else if (button == "up") {
    movePlayer(state.playerPos.x, state.playerPos.y - 1);
  } else if (button == "down") {
    movePlayer(state.playerPos.x, state.playerPos.y + 1);
  } else if (button == "b") {
    setPlayerPos(0, 0);
  } else {
    console.log(e);
  }
};

const receiver = "gmilescu.near";
const commitMessage = {
  index: {
    graph: JSON.stringify({
      key: "poke",
      value: {
        accountId: receiver,
      },
    }),
    notify: JSON.stringify({
      key: receiver,
      value: {
        type: "state-transition",
        stateData: [],
      },
    }),
  },
};

// Init stare (does nothing if state already exists)
State.init({ playerPos: { x: 0, y: 0 }, currentView: mapView(-5, -5, 11, 11) });

return (
  <div>
    <Widget
      src="jakmeier.near/widget/KeyInput"
      props={{ keyDownHandler, width: MAP_SIZE, margin: "20px 0" }}
    />
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: `repeat(11,${TILE_SIZE})`,
        width: MAP_SIZE,
        height: MAP_SIZE,
      }}
    >
      {renderMap(state)}
    </div>
    <CommitButton data={{ commitMessage }}>Save note</CommitButton>
    <Widget
      src="jakmeier.near/widget/GameBoyInput"
      props={{
        buttonDownHandler,
        width: MAP_SIZE,
        margin: "20px 0",
        dPadWidth: "150px",
        roundButtonSize: "60px",
        squareButtonSize: "70px",
      }}
    />
  </div>
);
