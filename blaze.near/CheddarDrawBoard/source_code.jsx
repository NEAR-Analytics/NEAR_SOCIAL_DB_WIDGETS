const blockHeight = props.blockHeight
  ? parseInt(props.blockHeight)
  : "optimistic";

const BoardHeight = 80;
const BoardWidth = 80;
const ExpectedLineLength = 4 + 8 * BoardWidth;

const cellSize = `${100 / BoardHeight}%`;

const Cell = styled.div`
  padding: 0px;
  margin: 0px;
  flex-grow: 1;
`;

const Line = styled.div`
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  flex-grow: 1;
  width: 100%;
  padding: 0px;
  margin: 0px;
  display: flex;
`;

const lines = [];
for (let i = 0; i < BoardHeight; ++i) {
  lines.push(i);
}

const args = { lines };
const encodedLines = Near.view(
  "farm-draw.cheddar.near",
  "get_lines",
  args,
  blockHeight
);

if (encodedLines === null) {
  return "Loading";
}

if (!encodedLines) {
  return "Block not found";
}

const intToColor = (c) => `#${c.toString(16).padStart(6, "0")}`;

const decodeLine = (line) => {
  let buf = Buffer.from(line, "base64");
  let pixels = [];
  for (let i = 4; i < buf.length; i += 8) {
    let color = buf.readUInt32LE(i);
    pixels.push(<Cell style={{ backgroundColor: intToColor(color) }} />);
  }
  return pixels;
};

return (
  <div
    className="mw-100 d-flex align-items-stretch flex-column align-content-stretch"
    style={{ maxHeight: "min(100%, 80vh)", aspectRatio: "1 / 1" }}
  >
    <h1>Cheddar Draw</h1>
    <a href="https://draw.cheddar.farm/">
      <span>Buy Milk🥛, Draw🎨, Farm Cheddar🧀</span>,
    </a>
    {encodedLines.map((line) => (
      <Line>{decodeLine(line)}</Line>
    ))}
    <p>
      Cheddar Draw is a fun game that lets you paint pixels with milk and farm
      Cheddar.
    </p>
    <p>Be careful it's WAR🛡️⚔️. Other players can overwrite your pixels.</p>
  </div>
);
