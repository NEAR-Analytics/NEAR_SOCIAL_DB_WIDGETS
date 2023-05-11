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

const renderThing = (node) => {
  console.log("this is the node: " + JSON.stringify(node));
  if (node.type === "widget") {
    return <Widget src={node.value} />;
  } else {
    const text = `
\`\`\`json
${JSON.stringify(node.value, undefined, 2)}
\`\`\`
`;
    return <Markdown text={text} />;
  }
};

return (
  <div>
    {history.length > 1 && isRoot && <Button onClick={handleBack}>back</Button>}
    <Button onClick={handleInto}>{label}</Button>
    <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    {state.expanded && (
      <div>
        {node && typeof node.value === "object" ? (
          Object.entries(node.value).map(([key, val]) => (
            <ChildNode>
              <Widget
                src="efiz.near/widget/Node"
                props={{
                  key,
                  label: key,
                  node: { value: val, type: null },
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
          <div>{renderThing(node)}</div>
        )}
      </div>
    )}
  </div>
);
