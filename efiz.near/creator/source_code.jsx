const Button = styled.button`
`;

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
    <Button onClick={() => State.update({ show: "THING" })}>thing</Button>
    <Button onClick={() => State.update({ show: "TYPE" })}>type</Button>
    <Content />
  </>
);
