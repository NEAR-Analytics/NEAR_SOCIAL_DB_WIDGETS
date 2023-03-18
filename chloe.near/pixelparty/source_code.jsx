const contract = "pixelparty.near";
const start = 0;
const end = 599;
const frameData = [];

for (let index = start; index <= end; index++) {
  frameData.push(
    Near.view(contract, "load_frame_data", { start: index, end: index })[0]
  );
}

return (
  <div>
    {frameData.map((data, index) => (
      <div key={index}>
        <p>Frame {index + 1}:</p>
        <p>{data !== undefined ? data : "Data not available."}</p>
      </div>
    ))}
  </div>
);
