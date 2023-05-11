const key = props.key;
const label = props.label;
const node = props.node;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;
const isRoot = props.isRoot;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleInto() {
  setPath(path);
  setHistory([...history, path]);
}

function handleBack() {
  const newPath = history[history.length - 2] || "";
  setPath(newPath);
  setHistory(history.slice(0, -1));
}

// const parts = path.split("/");
// if (parts.length === 1) {
//   // account
//   if (parts[0] !== "*") {
//     parts.push("**");
//   }
// } else if (parts.length === 2) {
//   parts.push("**");
// }

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ChildNode = styled.div`
  margin-left: ${path.split("/").length * 4}px
`;

const renderThing = () => {
  const parts = path.split("/");
  if (parts.length > 2) {
    const standard = parts[1];
    let value = {};
    let type = standard;
    if (standard === "graph") {
      parts.push("**");
      value = Social.get(parts.join("/"), "final");
    } else if (standard === "index") {
      return null;
    } else if (standard === "profile") {
      value = Social.get(parts.join("/"), "final");
    } else if (standard === "widget") {
      // This is a hack because a widget is saved under ""
      if (path.endsWith("/")) {
        path = path.slice(0, -1);
      }
      return <Widget src={path} />;
    } else if (standard === "post") {
      const index = {
        action: parts[1],
        key: parts[2],
        options: {
          limit: 10,
          order: "desc",
          accountId: parts[0],
        },
      };
      console.log(JSON.stringify(index));
      function renderItem(a) {
        if (a.value.type === "md") {
          return (
            <Widget
              src="near/widget/Posts.Post"
              props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
            />
          );
        } else {
          return <p>lol no</p>;
        }
      }
      return (
        <Widget
          src="efiz.near/widget/MergedIndexFeed"
          props={{ index, renderItem, disableCaching: true }}
        />
      );

      //   value = Social.get(path, "final");
      //   value = JSON.parse(value);
      //   return <Widget src="efiz.near/widget/Post.View" props={{ value }} />;
    } else {
      value = Social.get(parts.join("/"), "final");
      value = JSON.parse(value);
    }
  } else {
    console.log("uncaught path: ", path);
  }

  const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;
  return <Markdown text={text} />;
};

return (
  <div>
    {history.length > 1 && isRoot && <Button onClick={handleBack}>back</Button>}
    <Button onClick={handleInto}>{label}</Button>
    <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    {state.expanded && (
      <div>
        {node && typeof node === "object" ? (
          Object.entries(node).map(([key, val]) => (
            <ChildNode>
              <Widget
                src="efiz.near/widget/Node"
                props={{
                  key,
                  label: key,
                  node: val,
                  path: `${path}/${key}`,
                  setPath: setPath,
                  history,
                  setHistory: setHistory,
                  isRoot: false,
                }}
              />
            </ChildNode>
          ))
        ) : (
          <div>{renderThing()}</div>
        )}
      </div>
    )}
  </div>
);
