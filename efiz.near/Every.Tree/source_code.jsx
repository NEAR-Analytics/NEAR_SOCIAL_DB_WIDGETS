/**
 * Takes in a rootPath and rootType
 */
const rootPath = props.rootPath || context.accountId || "evrything.near";
const rootNode = props.rootNode || {};

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

return (
  <Widget
    src="efiz.near/widget/Every.Node"
    props={{
      label: state.path,
      path: state.path,
      setPath: setPath,
      history: state.history,
      setHistory: setHistory,
      isRoot: true,
      setRoot: setRoot,
    }}
  />
);
