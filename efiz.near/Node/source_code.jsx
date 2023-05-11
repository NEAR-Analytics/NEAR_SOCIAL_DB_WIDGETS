const key = props.key;
const path = props.path;
const history = props.history;
const traverseInto = props.traverseInto;
const traverseBack = props.traverseBack;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleInto() {
  traverseInto(key, path, history);
}

function handleBack() {
  console.log(`going back, out of ${key} and current path ${path}`);
  traverseBack(history);
}

const parts = path.split("/");
if (parts.length === 1) {
  // account
  if (parts[0] !== "*") {
    parts.push("**");
  }
} else if (parts.length === 2) {
  parts.push("**");
}

const value = Social.get(parts.join("/"), "final");

const Button = styled.button`
  text-transform: lowercase !important;
`;

const renderThing = (value) => {
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
    {history.length > 0 && <Button onClick={handleBack}>back</Button>}
    <Button onClick={handleInto}>{key}</Button>
    <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    {state.expanded && (
      <div>
        {typeof value === "object" ? (
          Object.entries(value).map(([key, val]) => (
            <Widget
              src="efiz.near/widget/Node"
              props={{
                key,
                path,
                history,
                traverseInto,
                traverseBack,
              }}
            />
          ))
        ) : (
          <div>{renderThing()}</div>
        )}
      </div>
    )}
  </div>
);
