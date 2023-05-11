const rootPath = "efiz.near";

State.init({
  rootPath,
  history: [],
});

function traverseBack(history) {
  const prevPath = history.pop();
  State.update({
    rootPath: prevPath,
    history,
  });
}

function traverseInto(key, path, history) {
  history.push(path);
  const parts = path.split("/");
  parts.push(key);

  State.update({
    rootPath: parts.join("/"),
    history,
  });
}

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{
      path: state.rootPath,
      history: state.history,
      onTraverse: handleTraverse,
    }}
  />
);
