const blockHeight = props.blockHeight
  ? parseInt(props.blockHeight)
  : "optimistic";

const Cell = styled.div`
  width: 8px;
  height: 8px;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  display: inline-block;
`;

const Line = styled.div`
  height: 8px;
  padding: 0px;
  margin: 0px;
  display: block;
`;

const BoardHeight = 50;
const BoardWidth = 50;
const ExpectedLineLength = 4 + 8 * BoardWidth;

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
  <div>
    {encodedLines.map((line) => (
      <Line>{decodeLine(line)}</Line>
    ))}
  </div>
);
