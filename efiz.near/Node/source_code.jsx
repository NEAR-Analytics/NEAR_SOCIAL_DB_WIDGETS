const key = props.key;
const label = props.label;
const node = props.node;
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

const ChildNode = styled.div`
  margin-left: ${path.split("/").length * 4}px
`;

function renderView() {
  return <Widget src="efiz.near/widget/View" props={{ path, type }} />;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 160px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 4px;
`;

return (
  <Container>
    <div>
      {history.length > 1 && isRoot && (
        <Button onClick={handleBack}>back</Button>
      )}
      {isRoot ? (
        <Controller>{label}</Controller>
      ) : (
        <Button onClick={handleInto}>{label}</Button>
      )}
      <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    </div>
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
                  type: getType(),
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
  </Container>
);
