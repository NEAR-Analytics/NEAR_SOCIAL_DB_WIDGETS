const contract = "pixelparty.near";
const start = 0;
const end = 599;
const frames = [];

for (let index = start; index <= end; index++) {
  const base64Data = Near.view(contract, "load_frame_data", {
    start: index,
    end: index,
  })[0];

  if (base64Data) {
    const buffer = new Buffer(base64Data, "base64");
    const byteData = [];

    // Convert buffer to array of bytes, including 0 values
    for (let i = 0; i < buffer.length; i++) {
      const byte = buffer[i];
      byteData.push(byte);
      if (byte === 0) {
        // check for 0 value and add it to array
        byteData.push(0);
        byteData.push(0);
      }
    }

    // Set undefined values to 255
    for (let i = 0; i < byteData.length; i++) {
      if (byteData[i] === undefined) {
        byteData[i] = 255;
      }
    }

    // Convert byte array to array of color objects
    const colors = [];
    for (let i = 0; i < byteData.length; i += 3) {
      const r = byteData[i];
      const g = byteData[i + 1];
      const b = byteData[i + 2];
      colors.push({ r, g, b });
    }

    frames.push(colors);
  } else {
    // handle empty or null data
    const colors = Array(400).fill({ r: 255, g: 255, b: 255 });
    frames.push(colors);
  }
}

const grid = frames.map((frame, frameIndex) => {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    const row = [];
    for (let j = 0; j < 20; j++) {
      const index = i * 20 + j;
      const color = frame[index];
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
