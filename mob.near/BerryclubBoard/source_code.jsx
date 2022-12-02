const blockHeight = props.blockHeight
  ? parseInt(props.blockHeight)
  : "optimistic";

const BoardHeight = 50;
const BoardWidth = 50;
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
  "berryclub.ek.near",
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
    className="mh-100 mw-100 d-flex align-items-stretch flex-column align-content-stretch"
    style={{ aspectRatio: "1 / 1" }}
  >
    {encodedLines.map((line) => (
      <Line>{decodeLine(line)}</Line>
    ))}
  </div>
);
