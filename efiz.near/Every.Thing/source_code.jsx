const dataSource = props.dataSource;
const dataSourceArgs = props.dataSourceArgs;
const type = props.type;
const renderEdges = props.renderEdges;

State.init({
  expanded: false,
});

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function getData(dataSource, dataSourceArgs, type) {
  let value = {};
  if (type === "account") {
    if (dataSource === "SOCIALDB") {
      const path = dataSourceArgs.arg1;
      const parts = path.split("/");
      if (parts[0] !== "*") {
        parts.push("**");
      }
      // value = Social.get(parts.join("/"), "final");
      value = props.value;
      return value;
    }
  }
}

const data = getData(dataSource, dataSourceArgs, type);

function getTypeDetails(type) {
  if (type === "account") {
    return {
      properties: [],
      widgets: {
        view: "efiz.near/widget/Every.Account",
      },
    };
  }
}

const typeDetails = getTypeDetails(type);
console.log(typeDetails);

const widgetSrc = typeDetails?.widgets?.view;
console.log(widgetSrc);

return (
  <>
    <div>
      <div>
        <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
      </div>
      {state.expanded && (
        <>
          {renderEdges && renderEdges([{ label: "efiz", path: "efiz.near" }])}
        </>
      )}
    </div>
  </>
);
if (widgetSrc) {
  // return custom display
  return <Widget src={widgetSrc} props={{ data }} />;
} else {
  // or basic node
  // return (
  //   <Widget
  //     src="efiz.testnet/widget/Every.Node"
  //     props={{
  //       label: path,
  //       type: type,
  //       path: path,
  //       setPath: setPath,
  //       history: history,
  //       setHistory: setHistory,
  //       setRoot: setRoot,
  //       setType: setType,
  //       isRoot: true,
  //       styles: {
  //         subject: {
  //           fontFamily: "Times New Roman",
  //           fontSize: "4em",
  //           lineHeight: "1.25",
  //           fontWeight: 400,
  //           cursor: "pointer",
  //         },
  //       },
  //     }}
  //   />
  // );
}
