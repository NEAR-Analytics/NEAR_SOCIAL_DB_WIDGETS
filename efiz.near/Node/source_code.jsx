const key = props.key;
const label = props.label;
const node = props.node;
const type = props.type;
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

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ChildNode = styled.div`
  margin-left: ${path.split("/").length * 4}px
`;

const renderView = () => {
  return <Widget src="efiz.near/widget/View" props={{ path, type }} />;
};

return (
  <div>
    {history.length > 1 && isRoot && <Button onClick={handleBack}>back</Button>}
    {isRoot ? <p>{label}</p> : <Button onClick={handleInto}>{label}</Button>}
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
                  type: key,
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
          <div>{renderView()}</div>
        )}
      </div>
    )}
  </div>
);
