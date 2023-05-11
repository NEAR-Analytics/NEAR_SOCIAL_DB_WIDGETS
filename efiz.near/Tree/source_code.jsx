const key = props.key || context.accountId;
const path = `${context.accountId}/**`;
const rootNode = Social.get(path, "final");

State.init({
  node: rootNode,
  prevPath: path,
  path,
  key,
});

// newPath, data, callback
function traverse(key, path, node) {
  console.log(JSON.stringify(node));
  State.update({
    path,
    node,
    key,
    prevPath: state.path,
    prevKey: state.key,
    prevNode: state.node,
  });
  //   const parts = newPath.split("/");

  //   State.update({ path: newPath, node: data });
  //   callback(newPath, data);

  //   if (parts.length === 1) {
  //     parts.push("**");

  //     value = Social.get(parts.join("/"), "final");
  //     edges = Object.keys(value);
  //     value = JSON.stringify(value, undefined, 2);
  //   } else if (parts.length === 2) {
  //     parts.push("**");

  //     value = Social.get(parts.join("/"), "final");
  //     edges = Object.keys(value);
  //     value = JSON.stringify(value, undefined, 2);
  //   } else if (parts.length > 2) {
  //     value = Social.get(parts.join("/"), "final");
  //     const standard = parts[1];
  //     switch (standard) {
  //       case "index":
  //         value = JSON.parse(value);
  //         edges = ["hi"];
  //         value = JSON.stringify(value, undefined, 2);
  //         // if you go to an index, then it shows all the data
  //         break;
  //       case "post":
  //         //   value = Social.get(parts.slice(0, 3).join("/"), "final");
  //         const value = Social.index("post", parts[2], {
  //           limit: 10,
  //           order: "desc",
  //           accountId: parts[0],
  //         });
  //         value = JSON.stringify(value, undefined, 2);
  //         console.log(value);
  //         // we want a special view for this
  //         break;
  //     }
  //   }

  //   console.log(data);
  //   for (const key in data) {
  //     const value = data[key];

  //     if (typeof value === "object") {
  //       traverse(value, callback);
  //     } else {
  //       callback(key, value);
  //     }
  //   }
}

function handleTraverse(key, path, node) {
  traverse(key, path, node, (node) => console.log(node.value));
  // could check the type, return the correct data.
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
