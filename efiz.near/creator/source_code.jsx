const Button = styled.button`
`;

function Content() {
  switch (state.show) {
    case "THING":
      return <Widget src="efiz.near/widget/every.thing.create" props={{}} />;

    case "TYPE":
      return <Widget src="efiz.near/widget/every.type.create" props={{}} />;

    case "POST":
      return <Widget src="every.near/widget/every.post.create" props={{}} />;
  }
}

return (
  <>
    <Button onClick={() => State.update({ show: "THING" })}>thing</Button>
    <Button onClick={() => State.update({ show: "TYPE" })}>type</Button>
    <Button onClick={() => State.update({ show: "POST" })}>post</Button>
    <Content />
  </>
);
