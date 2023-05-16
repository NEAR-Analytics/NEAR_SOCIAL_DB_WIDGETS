const key = props.key;
const label = props.label;
const type = props.type;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;
const setType = props.setType;
const isRoot = props.isRoot;
const setRoot = props.setRoot;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleInto() {
  setRoot(path, type);
  setHistory([...history, path]);
  //   setType(type);
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

function getType(path) {
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

// WHEN A NEW ROOT IS SET //
// GET DATA AT THIS PATH //
function getNode(path, type) {
  const parts = path.split("/");
  let value = {};

  // ACCOUNT //
  if (type === "account") {
    if (parts.length > 1) {
      // GRAPH // FOLLOW // BACK TO ACCOUNT : WORKING
      //   setRoot(parts[3], "account");
    } else {
      if (parts[0] !== "*") {
        parts.push("**");
      }
      value = Social.get(parts.join("/"), "final");
      return value;
    }
    // THING //
  } else if (type === "thing") {
    // path: "everything"
    // type: "thing"
    return rootNode; // Or should "everything" be "*"?
    // PROFILE //
  } else if (type === "profile") {
    value = Social.get(parts.join("/"), "final");
    // POST : WIP //
  } else if (type === "post") {
    value = path;
    // NAMETAG : WIP //
  } else if (type === "nametag") {
    if (parts.length > 2) {
      if (parts.length === 3) {
        // BACK TO ACCOUNT
        // setRoot(parts[3], "account");
      } else if (parts.length === 4) {
        // ALL TAGS BY ACCOUNT
        value = Social.keys(`${parts[0]}/profile/tags/*`, "final");
      } else {
        // THIS TAG
        value = parts[5];
      }
    }
  } else {
    parts.push("**");
    value = Social.get(parts.join("/"), "final");
    return value;
  }
}
let node = {};
if (isRoot) {
  console.log(`getting node for ${path} and ${type}`);
  node = getNode(path, type);
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
                  type: getType(`${path}/${key}`),
                  path: `${path}/${key}`,
                  setPath: setPath,
                  history,
                  setHistory: setHistory,
                  isRoot: false,
                  setRoot: setRoot,
                }}
              />
            ))
          : null}
      </ButtonRow>
    </div>
  </div>
);
