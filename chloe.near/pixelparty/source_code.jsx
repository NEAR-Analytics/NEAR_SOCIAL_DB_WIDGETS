const contract = "pixelparty.near";
const start = 0;
const end = 599;
const frames = [];

for (let index = start; index <= end; index++) {
  const base64Data = Near.view(contract, "load_frame_data", {
    start: index,
    end: index,
  })[0];
  const buffer = new Buffer(base64Data, "base64");
  const byteData = Array.from(buffer);

  // Convert byte array to array of color objects
  const colors = [];
  for (let i = 0; i < byteData.length; i += 3) {
    const r = byteData[i];
    const g = byteData[i + 1];
    const b = byteData[i + 2];
    colors.push({ r, g, b });
  }

  frames.push(colors);
}

const grid = frames.map((frame, frameIndex) => {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    const row = [];
    for (let j = 0; j < 20; j++) {
      const index = i * 20 + j;
      const color = frame[index] ?? { r: 255, g: 255, b: 255 }; // set default to white
      row.push(
        <div
          key={index}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          }}
        />
      );
    }
    rows.push(<div style={{ display: "flex" }}>{row}</div>);
  }
  return (
    <div key={frameIndex}>
      <p>Frame {frameIndex + 1}:</p>
      {rows}
    </div>
  );
});

return <div>{grid}</div>;
