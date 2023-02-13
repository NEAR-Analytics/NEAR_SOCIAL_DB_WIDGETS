const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Nav = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const LeftPanel = styled.div`
  width: 60%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 400px;
  padding-right: 2rem;
`;

const RightPanel = styled.div`
  padding-left: 1rem;
`;

return (
  <Container>
    <Nav>Burrow</Nav>
    <Main>
      <LeftPanel>
        <Widget src="ciocan.near/widget/burrow-list" />
      </LeftPanel>
      <RightPanel>
        <Widget src="ciocan.near/widget/burrow-deposit" />
      </RightPanel>
    </Main>
  </Container>
);
