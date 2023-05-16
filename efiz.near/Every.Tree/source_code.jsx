/**
 * Takes in a rootPath and rootType
 */
const rootPath = props.rootPath || context.accountId || "evrything.near";
const rootType = props.rootType || "account";
const rootNode = props.rootNode || {};

State.init({
  path: rootPath,
  type: rootType,
  history: [rootPath],
});

function setPath(path) {
  State.update({ path });
}

function setHistory(history) {
  State.update({ history });
}

function setType(type) {
  State.update({ type });
}

function setRoot(newPath, newType) {
  State.update({
    path: newPath,
    type: newType,
  });
}

return (
  <Widget
    src="efiz.near/widget/Every.Node"
    props={{
      label: state.path,
      type: state.type,
      path: state.path,
      setPath: setPath,
      history: state.history,
      setHistory: setHistory,
      setType: setType,
      isRoot: true,
    }}
  />
);
