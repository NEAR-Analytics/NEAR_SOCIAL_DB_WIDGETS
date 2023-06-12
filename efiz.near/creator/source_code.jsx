function Content() {
  switch (state.show) {
    case "THING":
      return <Widget src="efiz.near/widget/every.thing.create" props={{}} />;

    case "TYPE":
      return <Widget src="efiz.near/widget/every.type.create" props={{}} />;
  }
}

return (
  <>
    <button onClick={() => State.update({ show: "THING" })}>thing</button>
    <button onClick={() => State.update({ show: "TYPE" })}>type</button>
    <Content />
  </>
);
