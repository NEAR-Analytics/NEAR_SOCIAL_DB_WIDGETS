const key = props.key || context.accountId;
const path = `${context.accountId}/**`;
const rootNode = Social.get(path, "final");

State.init({
  node: rootNode,
  prevPath: path,
  path,
  key,
});

function traverse(key, path, node) {
  State.update({
    path,
    node,
    key,
    prevPath: state.path,
    prevKey: state.key,
    prevNode: state.node,
  });
}

function handleTraverse(key, path, node) {
  traverse(key, path, node);
}

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{
      key: state.key,
      path: state.path,
      node: state.node ?? rootNode,
      prevPath: state.prevPath,
      prevKey: state.prevKey,
      prevNode: state.prevNode,
      onTraverse: handleTraverse,
    }}
  />
);
