const rootKey = "efiz.near";

State.init({
  rootKey,
  rootPath: rootKey,
  history: [],
});

function traverseBack(history) {
  const prevNode = history.pop();
  State.update({
    rootKey: prevNode.key,
    rootPath: prevNode.path,
    history,
  });
}

function traverseInto(key, currKey, currPath, history) {
  console.log(
    `traversing into ${key} from current path ${currPath} and history: ${JSON.stringify(
      history
    )}`
  );
  history.push({
    key: currKey,
    path: currPath,
  });
  const parts = currPath.split("/");
  parts.push(key);

  State.update({
    rootKey: key,
    rootPath: parts.join("/"),
    history,
  });
}

console.log(
  `starting root at key: ${state.rootKey}, path: ${
    state.rootPath
  }, with history: ${JSON.stringify(state.history)}`
);

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{
      key: state.rootKey,
      path: state.rootPath,
      history: state.history,
      traverseInto: traverseInto,
      traverseBack: traverseBack,
    }}
  />
);
