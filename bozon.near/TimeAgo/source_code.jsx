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

return <div>{timeAgo(props.diffSec)}</div>;
