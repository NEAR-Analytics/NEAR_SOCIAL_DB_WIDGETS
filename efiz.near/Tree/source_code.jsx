const rootPath = props.rootPath || context.accountId || "evrything.near";
const rootType = props.rootType || "account";

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

// WHEN A NEW ROOT IS SET //
// HOW TO GET DATA AT THIS ROOT //
function getNode(path) {
  // SPLIT THE PATH
  const parts = path.split("/");
  let value = {};

  if (parts.length > 2) {
    // EVERYTHING ELSE //
    const standard = parts[1];
    // GRAPH //
    if (standard === "graph") {
      if (parts.length > 3) {
        // FOLLOW
        if (parts[2] === "follow") {
          // BACK TO ACCOUNT
          setRoot(parts[3], "account");
        }
      } else {
        parts.push("**");
        value = Social.get(parts.join("/"), "final");
      }
      // PROFILE //
    } else if (standard === "profile") {
      console.log(parts.join("/"));
      value = Social.get(parts.join("/"), "final");
      // POST //
    } else if (standard === "post") {
      value = path;
      // NAMETAG //
    } else if (standard === "nametag") {
      if (parts.length > 2) {
        if (parts.length === 3) {
          // BACK TO ACCOUNT
          setRoot(parts[3], "account");
        } else if (parts.length === 4) {
          // ALL TAGS BY ACCOUNT
          value = Social.keys(`${parts[0]}/profile/tags/*`, "final");
        } else {
          // THIS TAG
          value = parts[5];
        }
      }
    } else {
      value = Social.get(parts.join("/"), "final");
      value = JSON.parse(value);
    }
    return value;
  } else {
    if (state.type === "account") {
      // ACCOUNT LEVEL //
      if (parts[0] !== "*") {
        parts.push("**");
      }
      value = Social.get(parts.join("/"), "final");
      return value;
    } else if (parts.length === 2) {
      // STANDARD LEVEL //
      parts.push("**");
      value = Social.get(parts.join("/"), "final");
      return value;
    }
  }
}

const node = getNode(state.path);

return (
  <Widget
    src="efiz.near/widget/Node"
    props={{
      label: state.path,
      node,
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
