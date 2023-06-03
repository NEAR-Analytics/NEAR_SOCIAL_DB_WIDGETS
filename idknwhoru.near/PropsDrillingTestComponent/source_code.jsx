const { parentState } = props;

console.log({ props });
if (parentState) {
  const changeParentState = () => {
    parentState.loading = !parentState.loading;
  };
  return <button onClick={(_) => changeParentState()}></button>;
}

return <div>hello</div>;
