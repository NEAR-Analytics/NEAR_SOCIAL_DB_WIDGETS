const { parentState } = props;

if (parentState) {
  const changeParentState = () => {
    parentState.update({
      isOpen: true,
    });
  };
  return <button onClick={changeParentState}></button>;
}

return <div>hello</div>;
