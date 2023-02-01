let blockHeight = parseInt(props.blockHeight);

const block = Near.block(blockHeight);

if (block === null) {
  return "Loading";
}

if (!block) {
  return "unknown";
}

const timeMs = parseFloat(block.header.timestamp_nanosec) / 1e6;
const date = new Date(timeMs);

return (
  <>
    <i class="bi bi-clock-history px-2"></i>
    {date.toDateString()}
  </>
);
