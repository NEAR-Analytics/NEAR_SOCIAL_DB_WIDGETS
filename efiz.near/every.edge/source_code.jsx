const path = props.path;
const blockHeight = props.blockHeight;

const edges = Social.index("edges", path);

if (!edges) {
  return <></>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

return (
  <Grid>
    {edges?.map((it) => {
      return (
        <Widget
          src="efiz.near/widget/every.edge.view"
          props={{ path: it.value.path, blockHeight }}
        />
      );
    })}
  </Grid>
);
