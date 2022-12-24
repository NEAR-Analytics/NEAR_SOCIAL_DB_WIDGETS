/*
 * TileGrid
 *
 * Display an X by Y grid of tiles, such as often used in 2D games.
 * 
 * Props for testing:
 
 { 
    "tiles": [
    [
      1,
      2,
      3,
      4
    ],
    [
      5,
      6,
      7,
      8
    ],
    [
      9,
      "a",
      "b",
      "c"
    ]
  ],
  "size": "100px",
  "renderTile": "id"
}

*/

// Props to be defined by parent widget.

// A 2D array of tiles. Tile definition can be anything.
const TILES = props.tiles;
// A function that returns renderable HTML/JSX based on a tile value the parent defines.
const RENDER_TILE =
  props.renderTile === "id" ? (x) => <div>{x}</div> : props.renderTile;
// CSS definition for map size.
const MAP_SIZE = props.size ?? "300px";
// CSS definition for tile size.
const TILE_SIZE = props.tileSize ?? "30px";

// Help user debug when they forget to set props.
if (!Array.isArray(TILES)) {
  return "tiles props not set to an array";
}
if (TILES.length == 0 || !Array.isArray(TILES[0])) {
  return "tiles props not set to an array of arrays";
}
if (typeof RENDER_TILE !== "function") {
  return "renderTile props not set to function";
}

// Values set indirectly by props.
const ROWS = TILES.length;
const COLS = TILES[0].length;

// convert 2D array of tiles (stored in state.currentView) into HTML
const renderMap = () => {
  // Change to column-first to make CSS grid rendering work.
  const out = [];
  for (const x = 0; x < ROWS; x++) {
    for (const y = 0; y < COLS; y++) {
      out.push(RENDER_TILE(TILES[x][y]));
    }
  }
  return out;
};

return (
  <div
    style={{
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateRows: `repeat(${COLS},${TILE_SIZE})`,
      width: MAP_SIZE,
      height: MAP_SIZE,
    }}
  >
    {renderMap()}
  </div>
);
