if (!props.pathToWidget || !props.currentBlockHeight)
  return "send pathToWidget and currentBlockHeight in props";

const currentCode = Social.get(`${state.widgetPath}`, props.currentBlockHeight);

const prevCode = props.prevBlockHeight
  ? Social.get(`${state.widgetPath}`, props.prevBlockHeight)
  : "";

if (currentCode === null || prevCode === null) return "Loading";

return <div>{currentCode}</div>;
