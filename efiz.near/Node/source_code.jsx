const node = props.node;
const onTraverse = props.onTraverse;

State.init({
  expanded: false,
});

function handleExpand() {
  setExpanded(!expanded);
}

function handleTraverse() {
  onTraverse(node);
}

return (
  <div>
    <div onClick={handleExpand}>
      {expanded ? "-" : "+"} {node.value}
    </div>
    {expanded && node.children && (
      <div>
        {node.children.map((child) => (
          <Widget
            src="efiz.near/widget/Node"
            props={{ key: child.id, onTraverse }}
          />
        ))}
      </div>
    )}
    <button onClick={handleTraverse}>Traverse</button>
  </div>
);
