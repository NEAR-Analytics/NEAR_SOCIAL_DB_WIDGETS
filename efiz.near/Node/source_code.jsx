const node = props.node;
const onTraverse = props.onTraverse;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleTraverse() {
  onTraverse(node);
}

return (
  <div>
    <div onClick={handleExpand}>
      {expanded ? "-" : "+"} {node.value}
    </div>
    {expanded && (
      <div>
        {typeof value === "object" ? (
          Object.entries(value).map(([key, val]) => (
            <Widget
              src="efiz.near/widget/Node"
              props={{ key, label: key, value: val }}
            />
          ))
        ) : (
          <div>{value}</div>
        )}
      </div>
    )}
    <button onClick={handleTraverse}>Traverse</button>
  </div>
);
