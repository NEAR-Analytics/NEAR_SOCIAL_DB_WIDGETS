const rootPath = props.rootPath || context.accountId || "evrything.near";
const type = props.type || "account";

State.init({
  path: rootPath,
  type,
  history: [rootPath],
});

function setPath(path) {
  State.update({ path });
}

function setHistory(history) {
  State.update({ history });
}

function getNode(path) {
  const parts = path.split("/");
  let value = {};

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
  } else if (parts.length > 2) {
    // EVERYTHING ELSE //
    const standard = parts[1];
    if (standard === "graph") {
      if (parts.length > 3) {
        // BACK TO ACCOUNT
        if (parts[2] === "follow") {
          setPath(parts[3]);
          setHistory([...history, parts[3]]);
        }
      } else {
        parts.push("**");
        value = Social.get(parts.join("/"), "final");
      }
    } else if (standard === "profile") {
      console.log(parts.join("/"));
      value = Social.get(parts.join("/"), "final");
    } else if (standard === "post") {
      value = path;
    } else {
      value = Social.get(parts.join("/"), "final");
      value = JSON.parse(value);
    }
    return value;
  }
}

const node = getNode(state.path);

function renderView(nodePath) {
  const ChildNode = styled.div`
  margin-left: ${nodePath.split("/").length * 4}px
`;
  return (
    <>
      {node && typeof node === "object" ? (
        Object.entries(node).map(([key, val]) => (
          <ChildNode>
            <Widget
              src="efiz.near/widget/Node"
              props={{
                key,
                label: key,
                node: val,
                type: key,
                path: `${nodePath}/${key}`,
                setPath: setPath,
                history,
                setHistory: setHistory,
                isRoot: false,
              }}
            />
          </ChildNode>
        ))
      ) : (
        <div>{renderView()}</div>
      )}
    </>
  );
}

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
      isRoot: true,
      renderView: renderView,
    }}
  />
);
