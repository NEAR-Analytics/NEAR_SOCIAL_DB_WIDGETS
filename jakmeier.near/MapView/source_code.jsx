// Array of objects defined as [{x,y,tile}]
const OBJECTS = props.objects;
// Set this to all tiles that have no object.
const EMPTY_TILE = props.empty ?? " ";

// Coordinates to select view from global map.
const X = props.x;
const Y = props.y;
const W = props.width;
const H = props.height;

// Offset, useful to use x,y as center instead of top-left.
const OFFSET_X = props.offset.x ?? 0;
const OFFSET_Y = props.offset.y ?? 0;

// Props checks.
if (!Array.isArray(OBJECTS)) {
  return "props.objects not set to an array";
}
if (typeof X !== "number") {
  return "props.x not set";
}
if (typeof Y !== "number") {
  return "props.y not set";
}
if (typeof W !== "number") {
  return "props.width not set";
}
if (typeof H !== "number") {
  return "props.height not set";
}

// Select a view of the map, store it as 2D array of tiles and insert pixels.
const mapView = () => {
  const map = Array.from(Array(W), () => new Array(H).fill(EMPTY_TILE));
  const left = X - OFFSET_X;
  const top = Y - OFFSET_Y;

  OBJECTS.forEach((obj) => {
    const x = obj.x - left;
    const y = obj.y - top;
    if (map[x] && map[x][y]) {
      map[x][y] = obj.tile;
    }
  });

  return map;
};

return (
  <Widget
    src="jakmeier.near/widget/TileGrid"
    props={{
      tiles: mapView(),
      ...props,
    }}
  />
);
