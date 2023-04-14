// hackathon project building a small interactive game

const MAP_TILES = 12;
const VIEW_OFFSET_X = 0;
const VIEW_OFFSET_Y = 0;
const MAP_SIZE = "360px";
const TILE_SIZE = "30px";
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

const stateObject = (updates) => {
  return {
    playerPos: state.playerPos ?? { x: 0, y: 0 },
    updates,
  };
};

const displayedObjects = () => {
  const out = [];
  props.session.pixels.forEach((pixel) => {
    out.push({ tile: Tile.Full, ...pixel });
  });

  const updates = state.updates ?? [];
  updates.forEach((pixel) => {
    out.push({ tile: Tile.Full, ...pixel });
  });

  if (myTurn) {
    out.push({ tile: Tile.Ghost, ...state.playerPos });
  }

  return out;
};

const renderTile = (tile) => {
  return (
    <div
      style={{
        fontSize: TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
    >
      {tile}
    </div>
  );
};

// map boundary check
const isInMap = (x, y) => {
  return x >= 0 && x < MAP_TILES && y >= 0 && y < MAP_TILES;
};

// instantly moves the player to the given coordinate unless it is outside the map
const movePlayer = (x, y) => {
  if (isInMap(x, y)) {
    setPlayerPos(x, y);
  }
};

// update player position without checks
const setPlayerPos = (x, y) => {
  state.playerPos.x = x;
  state.playerPos.y = y;
  // trigger a re-render with the new state
  State.update();
};

const drawPixel = (x, y) => {
  if (!myTurn) {
    return;
  }

  if (
    state.updates.length === 0 &&
    !props.session.pixels.some((pixel) => pixel.x == x && pixel.y == y)
  ) {
    state.updates.push({ x, y });
  } else if (
    // undo is allowed
    state.updates.length === 1 &&
    state.updates[0].x === x &&
    state.updates[0].y === y
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
    <Widget
      src="jakmeier.near/widget/MapView"
      props={{
        objects: displayedObjects(),
        empty: Tile.Empty,
        renderTile,
        size: MAP_SIZE,
        tileSize: TILE_SIZE,
        width: MAP_TILES,
        height: MAP_TILES,
      }}
    />
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
