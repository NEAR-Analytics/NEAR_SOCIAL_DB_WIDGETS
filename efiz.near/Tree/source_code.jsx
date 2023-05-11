const path = props.path || `${context.accountId}/**`;

const rootNode = Social.get(path, "final");

function traverse(newPath, data, callback) {
  const parts = newPath.split("/");

  if (parts.length === 1) {
    parts.push("**");

    value = Social.get(parts.join("/"), "final");
    edges = Object.keys(value);
    value = JSON.stringify(value, undefined, 2);
  } else if (parts.length === 2) {
    parts.push("**");

    value = Social.get(parts.join("/"), "final");
    edges = Object.keys(value);
    value = JSON.stringify(value, undefined, 2);
  } else if (parts.length > 2) {
    value = Social.get(parts.join("/"), "final");
    const standard = parts[1];
    switch (standard) {
      case "index":
        value = JSON.parse(value);
        edges = ["hi"];
        value = JSON.stringify(value, undefined, 2);
        // if you go to an index, then it shows all the data
        break;
      case "post":
        //   value = Social.get(parts.slice(0, 3).join("/"), "final");
        const value = Social.index("post", parts[2], {
          limit: 10,
          order: "desc",
          accountId: parts[0],
        });
        value = JSON.stringify(value, undefined, 2);
        console.log(value);
        // we want a special view for this
        break;
    }
  }

  console.log(data);
  //   for (const key in data) {
  //     const value = data[key];

  //     if (typeof value === "object") {
  //       traverse(value, callback);
  //     } else {
  //       callback(key, value);
  //     }
  //   }
}

function handleTraverse(node) {
  traverse(node, (node) => console.log(node.value));
  // could check the type, return the correct data.
}

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{ path, node: rootNode, onTraverse: handleTraverse }}
  />
);
