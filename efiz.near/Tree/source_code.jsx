const rootPath = "efiz.near";

State.init({
  path: rootPath,
  history: [rootPath],
});

function setPath(path) {
  State.update({ path });
}

function setHistory(history) {
  State.update({ history });
}

function getNodeValue(path) {
  const parts = path.split("/");
  if (parts.length === 1) {
    parts.push("**");

    const value = Social.get(parts.join("/"), "final");
    return JSON.stringify(value, undefined, 2);
  }
}

const node = getNodeValue(state.path);

console.log(
  `starting root at path: ${state.path}, with history: ${JSON.stringify(
    state.history
  )}`
);

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{
      label: node && Object.keys(node)[0],
      value: node && Object.values(node)[0],
      path: state.path,
      setPath: setPath,
      history: state.history,
      setHistory: setHistory,
    }}
  />
);
