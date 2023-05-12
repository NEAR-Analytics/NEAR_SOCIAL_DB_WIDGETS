const key = props.key;
const label = props.label;
const node = props.node;
const type = props.type;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;
const isRoot = props.isRoot;
const renderView = props.renderView;

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

return (
  <div>
    {history.length > 1 && isRoot && <Button onClick={handleBack}>back</Button>}
    {isRoot ? <p>{label}</p> : <Button onClick={handleInto}>{label}</Button>}
    <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    {state.expanded && <div>{renderView(path)}</div>}
  </div>
);
