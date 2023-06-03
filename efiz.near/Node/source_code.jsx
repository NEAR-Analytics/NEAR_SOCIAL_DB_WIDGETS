const label = props.label;
const value = props.value;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleInto() {
  const newPath = `${path}/${label}`;
  setPath(newPath);
  setHistory([...history, newPath]);
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

const renderThing = (value) => {
  const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;

  return <Markdown text={text} />;
};

return (
  <div>
    {history.length > 1 && <Button onClick={handleBack}>back</Button>}
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
