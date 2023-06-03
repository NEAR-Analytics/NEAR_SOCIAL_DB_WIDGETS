const { parentState } = props;

State.init({
  flag: true,
});

console.log({ props, state });
if (parentState) {
  const changeParentState = () => {
    console.log(parentState.loading);
    parentState.loading = !parentState.loading;
    State.update({
      flag: !state.flag,
    });
  };
  return <button onClick={(_) => changeParentState()}>click me</button>;
}

return <div>hello</div>;
