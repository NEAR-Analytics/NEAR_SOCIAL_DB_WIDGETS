const path = props.path;
const node = props.node;
const onTraverse = props.onTraverse;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleTraverse() {
  traverse(path, node);
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
    <Button onClick={handleTraverse}>{path}</Button>
    <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    {state.expanded && (
      <div>
        {typeof node === "object" ? (
          Object.entries(node).map(([key, val]) => (
            <Widget
              src="efiz.near/widget/Node"
              props={{ path: buildPath(path, key), label: key, node: val }}
            />
          ))
        ) : (
          <div>{defaultRender()}</div>
        )}
      </div>
    )}
  </div>
);
