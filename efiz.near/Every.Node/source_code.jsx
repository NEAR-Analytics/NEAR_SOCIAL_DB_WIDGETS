const key = props.key;
const label = props.label;
const node = props.value;
const type = props.type;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;
const setType = props.setType;
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
  setType(type);
}

function handleBack() {
  const newPath = history[history.length - 2] || "";
  setPath(newPath);
  setHistory(history.slice(0, -1));
}

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 4px;
`;

function renderView() {
  // Root vs Leaf?
  return <Widget src="efiz.near/widget/Every.Thing" props={{ path, type }} />;
}

function getType() {
  const parts = path.split("/");
  if (parts.length === 1) {
    return "account";
  } else if (parts.length === 2) {
    return parts[1];
  } else {
    const standard = parts[1];
    if (standard === "thing") {
      // We're gonna grab the type from the thing itself
    }
    return standard;
  }
}

return (
  <div>
    <div>
      {isRoot ? (
        <>
          {/** render root view */}
          <div
            style={{
              fontFamily: "Times New Roman",
              fontSize: "4em",
              lineHeight: "1.25",
              fontWeight: 400,
              cursor: "pointer",
            }}
          >
            {label}
          </div>
        </>
      ) : (
        <Button onClick={handleInto}>{label}</Button>
      )}
      <ButtonRow>
        {/** CONTROLLER */}
        {history.length > 1 && isRoot && (
          <Button onClick={handleBack}>back</Button>
        )}
        {node && typeof node === "object"
          ? Object.entries(node).map(([key, val]) => (
              <Widget
                src="efiz.near/widget/Every.Node"
                props={{
                  key,
                  label: key,
                  node: val,
                  type: getType(),
                  path: `${path}/${key}`,
                  setPath: setPath,
                  history,
                  setHistory: setHistory,
                  isRoot: false,
                }}
              />
            ))
          : null}
      </ButtonRow>
    </div>
  </div>
);
