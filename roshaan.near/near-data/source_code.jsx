const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: darkblue;
`;

const Title = styled.h1`
  text-align: center;
`;

const GraphContainer = styled.div`
  height: 500px;
  border: 1px solid lightblue;
`;

const Dropdown = styled.select`
  height: 30px;
  margin-top: 20px;
  border: 1px solid lightblue;
`;

return (
  <Container>
    <Title>Near Explorer Data</Title>
    <GraphContainer>
      <iframe
        src="https://near-data-social.vercel.app/"
        frameborder="0"
        width="800"
        height="600"
        allowtransparency
      ></iframe>
    </GraphContainer>
  </Container>
);
