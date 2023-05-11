const path = props.path;
const node = props.node;
const key = props.key;
const prevKey = props.prevKey;
const prevPath = props.prevPath;
const prevNode = props.prevNode;
const onTraverse = props.onTraverse;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function setSubject(path) {
  console.log("set to " + path);
}

const Button = styled.button`
  text-transform: lowercase !important;
`;

const defaultRender = (value) => {
  const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;

  return <Markdown text={text} />;
};

function handleInto() {
  onTraverse(key, path, node);
}

function handleBack() {
  onTraverse(prevKey, prevPath, prevNode);
}

function buildPath(current, key) {
  const parts = current.split("/");
  const suffix = parts[parts.length - 1];
  if (suffix === "*" || suffix === "**") {
    parts.pop();
  }
  parts.push(key);

  if (parts.length < 3) {
    parts.push("**");
  }
  return parts.join("/");
}

return (
  <div>
    {prevPath !== path && <Button onClick={handleBack}>back</Button>}
    <Button onClick={handleInto}>{key}</Button>
    <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    {state.expanded && (
      <div>
        {typeof node === "object" ? (
          Object.entries(node).map(([key, val]) => (
            <Widget
              src="efiz.near/widget/Node"
              props={{ key, path: buildPath(path, key), node: val, onTraverse }}
            />
          ))
        ) : (
          <div>{defaultRender()}</div>
        )}
      </div>
    )}
  </div>
);
