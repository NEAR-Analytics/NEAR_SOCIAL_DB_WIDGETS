const path = props.path || `${context.accountId}/**`;

const rootNode = Social.get(path, "final");

function traverse(data, callback) {
  for (const key in data) {
    const value = data[key];

    if (typeof value === "object") {
      traverse(value, callback);
    } else {
      callback(key, value);
    }
  }
}

function handleTraverse(node) {
  traverse(node, (node) => console.log(node.value));
  // could check the type, return the correct data.
}

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{ node: rootNode, onTraverse: handleTraverse }}
  />
);
