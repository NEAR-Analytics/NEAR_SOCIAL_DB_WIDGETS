State.init({
  startTime: props.startTime || Date.now() - 10000000,
  curTime: Date.now(),
});

const code = `
<script>
window.addEventListener("message", (event) => {
    setInterval(() => event.source.postMessage("ping", "*"), event.data.timeout);
});
</script>
`;

const timeAgo = (diffSec) => {
  if (diffSec < 60 * 1000) return `${(diffSec / 1000) | 0}s`;
  if (diffSec < 60 * 60 * 1000) {
    const sec = (diffSec % (60 * 1000)) / 1000;
    const min = (diffSec - sec) / (60 * 1000);

    return `${min | 0}m ${sec | 0}s`;
  }
  if (diffSec < 60 * 60 * 1000) {
    const sec = (diffSec % (60 * 1000)) / 1000;
    const min = (diffSec - sec) / (60 * 1000);

    return `${min | 0}m ${sec | 0}s`;
  }

  const sec = (diffSec % (60 * 1000)) / 1000;
  const min = (diffSec % (60 * 60 * 1000)) / (60 * 1000);
  const hour = (diffSec - min - sec) / (60 * 60 * 1000);

  return `${hour | 0}h ${min | 0}m ${sec | 0}s`;
};

function onPing() {
  State.update({ curTime: Date.now() });
}

return (
  <div>
    <iframe
      style={{ display: "none" }}
      srcDoc={code}
      onMessage={onPing}
      message={{ timeout: 1000 }}
    />
    {timeAgo(state.curTime - state.startTime)}
  </div>
);
