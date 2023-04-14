if (props.now) {
  return "now";
}

const keyPath = props.keyPath;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;

if (blockHeight === undefined && keyPath) {
  blockHeight = Social.keys(keyPath, undefined, {
    return_type: "BlockHeight",
  });
  if (blockHeight === null) {
    return "Loading";
  }
  keyPath.split("/").forEach((key) => {
    blockHeight = blockHeight[key];
  });
}

if (!blockHeight) {
  return "unknown";
}

const block = Near.block(blockHeight);

if (block === null) {
  return "Loading";
}

if (!block) {
  return "unknown";
}

const timeMs = parseFloat(block.header.timestamp_nanosec) / 1e6;
const date = new Date(timeMs);
const title = `${date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})} ${date.toLocaleDateString([], {
  day: "numeric",
  month: "short",
  year: "numeric",
})}`;

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0}s`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0}m`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0}h`
    : `${(diffSec / 86400000) | 0}d`;

return (
  <span style={props.style} title={title}>
    {timeAgo(Date.now() - timeMs)}
  </span>
);
