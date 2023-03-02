const updateState = JSON.parse(props.fx);
console.log("updateState: ", updateState);
console.log("updateState: ", updateState());

return <div style={{ color: red }}>{updateState}</div>;
