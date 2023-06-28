const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const IconLabelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;

const Title = styled.h2`
    margin: 8px;
`;

const path = props.path;
const blockHeight = props.blockHeight;

const edges = Social.index("edges", path);

if (!edges) {
  return <></>;
}

State.init({
  view: "VIEW",
});

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function Content() {
  switch (state.view) {
    case "VIEW": {
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
    }
    case "BUILD": {
      return (
        <Widget
          src="efiz.near/widget/every.thing.build"
          props={{ path, blockHeight }}
        />
      );
    }
    case "CONNECT": {
      return (
        <Widget
          src="efiz.near/widget/every.edge.create"
          props={{ path, blockHeight }}
        />
      );
    }
  }
}

return (
  <>
    <Header>
      <Title>edges</Title>
      <ButtonRow>
        <IconLabelButton onClick={() => State.update({ view: "CONNECT" })}>
          <i class="bi bi-link"></i>
          <span>connect</span>
        </IconLabelButton>
        <IconLabelButton onClick={() => State.update({ view: "BUILD" })}>
          <i class="bi bi-hammer"></i>
          <span>build</span>
        </IconLabelButton>
      </ButtonRow>
    </Header>
    <Content />
  </>
);
