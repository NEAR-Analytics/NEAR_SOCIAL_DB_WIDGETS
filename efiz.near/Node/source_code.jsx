const node = props.node;
const path = props.path;
const onTraverse = props.onTraverse;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleTraverse() {
  traverse(node);
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
  return `${current}/${key}`;
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
