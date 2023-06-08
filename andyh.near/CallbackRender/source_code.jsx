State.init({ j: 0 });
const renderComponent = (msg) => (
  <h2>{msg}</h2>
);

return (
  <div>
    {renderComponent('oh hei')}
    // <Widget
    //   src="andyh.near/widget/RenderTestGrandchild"
    //   props={{
    //     i: props.i,
    //     j: state.j,
    //     incrementparent: () => {
    //       const j = state.j + 1;
    //       State.update({ j });
    //       return j;
    //     },
    //     setchildincrement: (cb0, number, cb1) => {
    //       cb0(number, () => /xyz/gi);
    //       incrementChild = cb0;
    //     },
    //   }}
    // />
  </div>
);
