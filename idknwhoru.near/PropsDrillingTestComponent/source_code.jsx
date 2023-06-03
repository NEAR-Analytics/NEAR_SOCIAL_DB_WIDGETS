const { parentState } = props;

console.log({ props });
if (parentState) {
  const changeParentState = () => {
    parentState.update({
      isOpen: true,
    });
  };
  return <button onClick={(_) => changeParentState()}></button>;
}

return <div>hello</div>;
