// hackathon project building a small interactive game

const MAP_TILES = 12;
const VIEW_OFFSET_X = 0;
const VIEW_OFFSET_Y = 0;
const MAP_SIZE = "360px";
const TILE_SIZE = "30px";
const TILE_INNER_SIZE = "30px";
const MAX_SECONDS = 600;

const Tile = {
  Empty: "◻",
  Full: "◼",
  Ghost: "👻",
};

const myTurn = props.session.activePlayer === context.accountId;
const msLeft = (props.session.start - Date.now()) / 1000 + MAX_SECONDS;
const secondsLeft = msLeft - (msLeft % 1);
const gameover = props.session.activePlayer === "gameover";

// Select a view of the map, store it as 2D array of tiles and insert pixels.
const mapView = (start_x, start_y, width, height) => {
  const map = Array.from(Array(width), () =>
    new Array(height).fill(Tile.Empty)
  );

  console.log("props", props);
  props.session.pixels.forEach((pixel) => {
    // apply view offset
    const x = pixel.x - start_x;
    const y = pixel.y - start_y;
    if (map[x] && map[x][y]) {
      map[x][y] = Tile.Full;
    }
  });

  const updates = state.updates ?? [];
  console.log("drawing with updates", updates);
  updates.forEach((pixel) => {
    // apply view offset
    const x = pixel.x - start_x;
    const y = pixel.y - start_y;
    if (map[x]) {
      if (map[x][y] === Tile.Full) {
        map[x][y] = Tile.Empty;
      } else {
        map[x][y] = Tile.Full;
      }
    }
  });

  return map;
};

const stateObject = (updates) => {
  return {
    playerPos: state.playerPos ?? { x: 0, y: 0 },
    updates,
    currentView: mapView(
      pos.x - VIEW_OFFSET_X,
      pos.y - VIEW_OFFSET_Y,
      MAP_TILES,
      MAP_TILES
    ),
  };
};

// convert 2D array of tiles (stored in state.currentView) into HTML
const renderMap = (playerPos) => {
  // make a deep copy of map so we can modify it
  const map = JSON.parse(JSON.stringify(state.currentView));
  if (myTurn) {
    map[playerPos.x][playerPos.y] = Tile.Ghost;
  }
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
          {tile}
        </div>
      ))
    )
    .flat();
  return html;
};

// instantly moves the player to the given coordinate unless the path is blocked
const movePlayer = (x, y) => {
  // collision check and/or boundary check
  if (
    tileInCurrentView(x, y) === Tile.Empty ||
    tileInCurrentView(x, y) === Tile.Full
  ) {
    setPlayerPos(x, y);
  }
};

// update player position without checks
const setPlayerPos = (x, y) => {
  state.playerPos.x = x;
  state.playerPos.y = y;
  state.currentView = mapView(
    //x - VIEW_OFFSET_X,
    //y - VIEW_OFFSET_Y,
    -VIEW_OFFSET_X,
    -VIEW_OFFSET_Y,
    MAP_TILES,
    MAP_TILES,
    props.session.pixels
  );
  // trigger a re-render with the new state
  State.update();
};

const tileInCurrentView = (x, y) => {
  // move view and keep  player in center
  //const projected_x = x - state.playerPos.x + VIEW_OFFSET_X;
  // const projected_y = y - state.playerPos.y + VIEW_OFFSET_Y;
  // return state.currentView[projected_x][projected_y];
  // move player biut keep view static
  return state.currentView[x][y];
};

const drawPixel = (x, y) => {
  if (!myTurn) {
    return;
  }
  if (
    // deleting is not allowed for now
    tileInCurrentView(x, y) === Tile.Empty &&
    state.updates.length == 0
  ) {
    state.updates.push({ x, y });
  } else if (
    // undo is allowed
    tileInCurrentView(x, y) === Tile.Full &&
    state.updates.length == 1 &&
    state.updates[0].x == x &&
    state.updates[0].y == y
  ) {
    state.updates = [];
  }
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
  } else if (e.key == "Enter") {
    // reset to origin
    setPlayerPos(0, 0);
  } else if (e.key == " ") {
    drawPixel(state.playerPos.x, state.playerPos.y);
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
  } else if (button == "a") {
    drawPixel(state.playerPos.x, state.playerPos.y);
  } else {
    console.log(e);
  }
};

const onlineState = props.session;

if (onlineState === null || onlineState === undefined) {
  return "Loading";
}

if (state && onlineState.activePlayer !== context.accountId) {
  if (state.updates.length > 0) {
    state.updates = [];
    State.update();
  }
}
const updates = state.updates ?? [];
const newState = stateObject(updates);
State.init(newState);
if (JSON.stringify(state) != JSON.stringify(newState)) {
  State.update(newState);
}

const commitMessage = {
  canvasParty: {
    session: {
      pixels: onlineState.pixels.concat(state.updates),
      otherPlayer: onlineState.otherPlayer,
      activePlayer: secondsLeft > 0 ? onlineState.otherPlayer : "gameover",
      start: onlineState.start,
      word: onlineState.word,
    },
  },
};

const timeLeftHtml = gameover ? (
  ""
) : (
  <p style={{ fontWeight: "bold" }}>{secondsLeft}s left until art is frozen</p>
);

return (
  <div>
    <h1>Draw: {props.session.word}</h1>
    <h2>{myTurn ? "Your Turn" : gameover ? "Art Complete" : "Their Turn"}</h2>
    {timeLeftHtml}
    {gameover || (
      <Widget
        src="jakmeier.near/widget/KeyInput"
        props={{ keyDownHandler, width: MAP_SIZE, margin: "20px 0" }}
      />
    )}
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: `repeat(${MAP_TILES},${TILE_SIZE})`,
        width: MAP_SIZE,
        height: MAP_SIZE,
      }}
    >
      {renderMap(state.playerPos)}
    </div>
    {gameover || (
      <Widget
        src="jakmeier.near/widget/GameBoyInput"
        props={{
          buttonDownHandler,
          width: MAP_SIZE,
          margin: "20px 0",
          dPadWidth: "100px",
          roundButtonSize: "50px",
          squareButtonSize: "60px",
        }}
      />
    )}

    {gameover || (
      <div style={{ margin: "20px 0" }}>
        <CommitButton style={{ width: MAP_SIZE }} data={commitMessage}>
          Submit
        </CommitButton>
      </div>
    )}

    {gameover && (
      <div style={{ margin: "20px 0" }}>
        Save the image, it will be gone after you exit!
      </div>
    )}
  </div>
);
